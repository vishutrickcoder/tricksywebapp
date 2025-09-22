import expressAsyncHandler from 'express-async-handler';
import crypto4 from 'crypto';
import { registerSchema, loginSchema } from '../utils/validators.js';
import User from '../models/user.model.js';
import AuthSvc from '../services/auth.service.js';
import { sendEmailOtp, sendSmsOtp } from '../services/notification.service.js';
import RefreshToken from "../models/refreshToken.model.js";
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { encrypt } from '../utils/encryption.js';

export const register = expressAsyncHandler(async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const { email, phone, password, role } = value;

    if (!email && !phone) return res.status(400).json({ error: 'email or phone required' });


    if (email) {
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ error: 'Email already registered' });
    }
    // if (phone) {
    //     const existingP = await User.findOne({ phone: phone });
    //     if (existingP) return res.status(409).json({ error: 'Phone already registered' });
    // }


    const passwordHash = await AuthSvc.hashPassword(password);
    const user = await User.create({ email, phone, passwordHash, roles: [role] });


    // create OTP and send
    const otpPlain = (Math.floor(100000 + Math.random() * 900000)).toString();
    await AuthSvc.createOtp(email || phone, otpPlain, 'signup');
    if (email) await sendEmailOtp(email, otpPlain);
    // if (phone) await sendSmsOtp(phone, otpPlain);


    return res.status(201).json({ message: 'Registered. Verify OTP to activate account.' });
});

// POST /auth/verify-otp
export const verifyOtp = expressAsyncHandler(async (req, res) => {
  const { identifier, code } = req.body;
  if (!identifier || !code) return res.status(400).json({ error: 'Missing fields' });

  // Find user by email OR decrypted phone
  const users = await User.find({});
  const user = users.find(u => u.email === identifier || u.getDecryptedPhone() === identifier);

  if (!user) return res.status(404).json({ error: 'User not found' });

  // OTP target should always be the plain value
  const target = user.email === identifier ? user.email : identifier;

  // Verify OTP
  const ok = await AuthSvc.verifyOtp(target, code, 'signup');
  if (!ok) return res.status(401).json({ error: 'Invalid OTP' });

  // Mark verified
  if (user.email === identifier) user.emailVerified = true;
//   if (user.getDecryptedPhone() === identifier) user.phoneVerified = true;

  await user.save();

  // Return JWT
  const accessToken = AuthSvc.generateAccessToken(user);
  return res.json({ message: 'OTP verified successfully', accessToken });
});

// POST /auth/login
export const login = expressAsyncHandler(async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const { identifier, password } = value;


    const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });


    // Check lockout
    if (user.lockUntil && user.lockUntil > new Date()) return res.status(403).json({ error: 'Account temporarily locked due to failed attempts' });


    const ok = await AuthSvc.verifyPassword(user.passwordHash, password);
    if (!ok) {
        user.loginAttempts = (user.loginAttempts || 0) + 1;
        if (user.loginAttempts >= 5) user.lockUntil = new Date(Date.now() + 30 * 60 * 1000);
        await user.save();
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // reset attempts
    user.loginAttempts = 0; user.lockUntil = null; await user.save();


    // trigger 2FA flow if enabled or admin
    // if (user.twoFA.enabled || user.roles.includes('admin')) {
    //     // create a short-lived OTP for second factor
    //     const otpPlain = (Math.floor(100000 + Math.random() * 900000)).toString();
    //     await AuthSvc.createOtp(user.email || user.getDecryptedPhone(), otpPlain, 'login');
    //     if (user.email) await sendEmailOtp(user.email, otpPlain);
    //     // if (user.getDecryptedPhone()) await sendSmsOtp(user.getDecryptedPhone(), otpPlain);
    //     return res.json({ twoFARequired: true, message: '2FA code sent' });
    // }


    // issue tokens
    const accessToken = AuthSvc.generateAccessToken(user);
    const refreshToken = await AuthSvc.createAndStoreRefreshToken(user, req.ip, req.get('User-Agent'));
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 30 * 24 * 3600 * 1000 });

      const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    roles: user.roles,
    twoFA: user.twoFA,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

    return res.json({user: safeUser , accessToken });
});


// POST /auth/logout
export const logout = expressAsyncHandler(async (req, res) => {
    const rt = req.cookies && req.cookies.refreshToken;
    if (rt) await AuthSvc.revokeRefreshToken(rt);
    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out' });
});


// // GET /auth/profile
// export const profile = expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.user.sub).select('-passwordHash -twoFA.totpSecret');
//     return res.json({ user });
// });

// GET /auth/profile
export const profile = expressAsyncHandler(async (req, res) => {
  try {
    // Make sure req.user exists and has the correct structure
    if (!req.user || !req.user.sub) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const user = await User.findById(req.user.sub).select('-passwordHash -twoFA.totpSecret');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    return res.json(user); // Return user directly, not wrapped in object
  } catch (error) {
    console.error('Profile error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// PUT /auth/password-reset (initiate via email/phone)
export const passwordResetInitiate = expressAsyncHandler(async (req, res) => {
    const { target } = req.body; // email or phone
    if (!target) return res.status(400).json({ error: 'target required' });
    const otpPlain = (Math.floor(100000 + Math.random() * 900000)).toString();
    await AuthSvc.createOtp(target, otpPlain, 'reset');
    if (target.includes('@')) await sendEmailOtp(target, otpPlain); else await sendSmsOtp(target, otpPlain);
    return res.json({ message: 'Reset OTP sent' });
});

// POST /auth/password-change
export const passwordChange = expressAsyncHandler(async (req, res) => {
    const { target, code, newPassword } = req.body;
    if (!target || !code || !newPassword) return res.status(400).json({ error: 'missing fields' });
    const ok = await AuthSvc.verifyOtp(target, code, 'reset');
    if (!ok) return res.status(400).json({ error: 'Invalid OTP' });
    const user = await User.findOne({ $or: [{ email: target }, { phone: target }] });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.passwordHash = await AuthSvc.hashPassword(newPassword);
    user.passwordChangedAt = new Date();
    await user.save();
    // Revoke all refresh tokens
    await RefreshToken.updateMany({ user: user._id }, { revoked: true });
    return res.json({ message: 'Password changed' });
});


// // POST /auth/refresh-token
// export const refreshToken = expressAsyncHandler(async (req, res) => {
//     const rt = req.cookies && req.cookies.refreshToken;
//     if (!rt) return res.status(401).json({ error: 'Refresh token missing' });
//     const entry = await AuthSvc.verifyRefreshToken(rt);
//     const user = entry.user;
//     // check passwordChangedAt
//     if (user.passwordChangedAt && entry.createdAt < user.passwordChangedAt) {
//         return res.status(401).json({ error: 'Token invalidated due to password change' });
//     }
//     const accessToken = AuthSvc.generateAccessToken(user);
//     return res.json({ accessToken });
// });

// POST /auth/refresh-token
// POST /auth/refresh-token
export const refreshToken = expressAsyncHandler(async (req, res) => {
  const rt = req.cookies && req.cookies.refreshToken;
  
  if (!rt) {
    return res.status(401).json({ error: 'Refresh token missing' });
  }
  
  try {
    const entry = await AuthSvc.verifyRefreshToken(rt);
    const user = entry.user;
    
    // Check if password was changed after token was issued
    if (user.passwordChangedAt && entry.createdAt < user.passwordChangedAt) {
      return res.status(401).json({ error: 'Token invalidated due to password change' });
    }
    
    const accessToken = AuthSvc.generateAccessToken(user);
    
    return res.json({ accessToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});