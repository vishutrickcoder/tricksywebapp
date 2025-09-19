import {Router} from 'express';
import  * as ctrl from '../controllers/auth.controller.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/register', authLimiter, ctrl.register);
router.post('/verify-otp', authLimiter, ctrl.verifyOtp);
router.post('/login', authLimiter, ctrl.login);
// router.post('/2fa-verify', authLimiter, ctrl.twoFaVerify);
// router.post('/oauth', authLimiter, ctrl.oauthHandler);
router.post('/logout', ctrl.logout);
router.get('/profile', ctrl.profile); // protect with auth middleware in app
router.put('/password-reset', authLimiter, ctrl.passwordResetInitiate);
router.post('/password-change', authLimiter, ctrl.passwordChange);
router.post('/refresh-token', ctrl.refreshToken);


export default router;