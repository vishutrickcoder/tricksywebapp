import argon2 from 'argon2';
import crypto3 from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Otp from '../models/otp.model.js';
import RefreshToken from '../models/refreshToken.model.js';

import { sendEmailOtp, sendSmsOtp } from './notification.service.js';


const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_change_me';
const JWT_EXP = process.env.JWT_EXP || '15m';
const RT_EXP_DAYS = parseInt(process.env.REFRESH_TOKEN_DAYS || '30', 10);



async function hashPassword(password) {
return argon2.hash(password, { type: argon2.argon2id });
}


async function verifyPassword(hash, password) {
return argon2.verify(hash, password);
}



function generateAccessToken(user) {
const payload = { sub: user._id.toString(), roles: user.roles, pwdChangedAt: user.passwordChangedAt };
return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXP });
}


function generateRefreshToken() {
return crypto3.randomBytes(64).toString('hex');
}



async function createAndStoreRefreshToken(user, ip, ua) {
const token = generateRefreshToken();
const hash = crypto3.createHash('sha256').update(token).digest('hex');
const expiresAt = new Date(Date.now() + RT_EXP_DAYS * 24 * 3600 * 1000);
await RefreshToken.create({ user: user._id, tokenHash: hash, userAgent: ua, ip, expiresAt });
return token;
}

async function revokeRefreshToken(token) {
const hash = crypto3.createHash('sha256').update(token).digest('hex');
await RefreshToken.updateOne({ tokenHash: hash }, { revoked: true });
}

async function verifyRefreshToken(token) {
const hash = crypto3.createHash('sha256').update(token).digest('hex');
const entry = await RefreshToken.findOne({ tokenHash: hash }).populate('user');
if (!entry || entry.revoked) throw new Error('Invalid refresh token');
if (entry.expiresAt < new Date()) throw new Error('Expired');
return entry;
}


// OTP helpers (store hashed code)
async function createOtp(target, codePlain, purpose, ttlSeconds = 300) {
const codeHash = crypto3.createHash('sha256').update(codePlain).digest('hex');
const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
await Otp.create({ target, codeHash, purpose, expiresAt });
}

async function verifyOtp(target, codePlain, purpose) {
const codeHash = crypto3.createHash('sha256').update(codePlain).digest('hex');
const record = await Otp.findOne({ target, purpose }).sort({ createdAt: -1 });
if (!record) return false;
if (record.expiresAt < new Date()) return false;
if (record.codeHash !== codeHash) return false;
await Otp.deleteMany({ target, purpose });
return true;
}


export default {
hashPassword, verifyPassword, generateAccessToken, createAndStoreRefreshToken,
revokeRefreshToken, verifyRefreshToken, createOtp, verifyOtp
};
