import nodemailer from 'nodemailer';
import twilio from 'twilio';
import axios from 'axios';


async function sendEmailOtp(email, code) {
  // sample transporter; use production-grade service in env
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  await transporter.sendMail({ from: process.env.EMAIL_FROM, to: email, subject: 'Your OTP', text: `Code: ${code}` });
}


// async function sendSmsOtp(phone, code) {
// if (!process.env.TWILIO_ACCOUNT_SID) return;
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// await client.messages.create({ body: `Your OTP: ${code}`, from: process.env.TWILIO_FROM, to: phone });
// }

// SMS OTP using TextBee
async function sendSmsOtp(phone, code) {
  if (!process.env.TEXTBEE_API_KEY || !process.env.TEXTBEE_DEVICE_ID) return;

  try {
    const response = await axios.post(
      `https://api.textbee.dev/api/v1/gateway/devices/${process.env.TEXTBEE_DEVICE_ID}/send-sms`,
      {
        recipients: [phone],
        message: `Your OTP: ${code}`
      },
      {
        headers: { 'x-api-key': process.env.TEXTBEE_API_KEY }
      }
    );
    console.log('SMS sent:', response.data);
  } catch (err) {
    console.error('SMS sending error:', err.response?.data || err.message);
  }
}


export { sendEmailOtp, sendSmsOtp };
