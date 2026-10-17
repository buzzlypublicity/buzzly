import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify on startup (optional)
transporter.verify().then(
  () => console.log('✅ SMTP connection ready'),
  (error) => console.error('❌ SMTP connection failed:', error)
);