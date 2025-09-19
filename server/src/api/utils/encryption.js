import crypto2 from 'crypto';
const ALGO = 'aes-256-gcm';
const ENCKEY = process.env.DATA_ENC_KEY || '12345678901234567890123456789012'; // 32 bytes


function encrypt(text) {
if (!text) return text;
const iv = crypto2.randomBytes(12);
const cipher = crypto2.createCipheriv(ALGO, Buffer.from(ENCKEY, 'utf8'), iv);
const encrypted = Buffer.concat([cipher.update(String(text), 'utf8'), cipher.final()]);
const tag = cipher.getAuthTag();
return Buffer.concat([iv, tag, encrypted]).toString('base64');
}


function decrypt(payload) {
if (!payload) return payload;
const data = Buffer.from(payload, 'base64');
const iv = data.slice(0, 12);
const tag = data.slice(12, 28);
const encrypted = data.slice(28);
const decipher = crypto2.createDecipheriv(ALGO, Buffer.from(ENCKEY, 'utf8'), iv);
decipher.setAuthTag(tag);
const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
return decrypted.toString('utf8');
}


export { encrypt, decrypt };
