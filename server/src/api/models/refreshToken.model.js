import mongoose3 from 'mongoose';


const refreshTokenSchema = new mongoose3.Schema({
user: { type: mongoose3.Schema.Types.ObjectId, ref: 'User', required: true },
tokenHash: { type: String, required: true },
userAgent: String,
ip: String,
revoked: { type: Boolean, default: false },
expiresAt: { type: Date, required: true }
}, { timestamps: true });


export default mongoose3.model('RefreshToken', refreshTokenSchema);