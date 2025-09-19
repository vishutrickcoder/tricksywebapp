import mongoose from 'mongoose';
import crypto from 'crypto';
import { encrypt, decrypt } from '../utils/encryption.js';


const userSchema = new mongoose.Schema({
    email: { type: String, lowercase: true, trim: true, index: true },
    emailVerified: { type: Boolean, default: false },


    phone: { type: String, index: true }, // encrypted at rest
    phoneVerified: { type: Boolean, default: false },


    passwordHash: { type: String, required: true },


    roles: { type: [String], default: ['user'] },


    twoFA: {
        enabled: { type: Boolean, default: false },
        // store TOTP secret encrypted
        totpSecret: { type: String, default: null }
    },


    oauth: {
        googleId: String,
        facebookId: String
    },


    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },


    // token invalidation tracking
    passwordChangedAt: { type: Date },
}, { timestamps: true });


// Virtual to encrypt phone before save
userSchema.pre('save', function (next) {
    if (this.isModified('phone') && this.phone) {
        this.phone = encrypt(this.phone);
    }
    next();
});


userSchema.methods.getDecryptedPhone = function () {
    if (!this.phone) return null;
    return decrypt(this.phone);
};


export default mongoose.model('User', userSchema);