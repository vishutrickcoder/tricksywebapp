import mongoose2 from 'mongoose';


const otpSchema = new mongoose2.Schema({
target: { type: String, required: true, index: true }, // email or phone
codeHash: { type: String, required: true },
purpose: { type: String, enum: ['signup','login','reset','verify'], required: true },
expiresAt: { type: Date, required: true },
attempts: { type: Number, default: 0 }
}, { timestamps: true });


export default mongoose2.model('Otp', otpSchema);