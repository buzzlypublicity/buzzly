import { transporter } from './transporter';
import { userThankYouTemplate } from './templates';

interface InquiryData {
  fullName: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}

export async function sendUserThankYouEmail(data: InquiryData) {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: data.email,
      subject: `Thanks for reaching out, ${data.fullName.split(' ')[0]}!`,
      html: userThankYouTemplate(data),
    });

    console.log('✅ User thank-you email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send user email:', error);
    throw error;
  }
}