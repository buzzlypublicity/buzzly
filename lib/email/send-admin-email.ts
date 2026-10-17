import { transporter } from './transporter';
import { adminNotifyTemplate } from './templates';

interface InquiryData {
  fullName: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}

export async function sendAdminNotification(data: InquiryData) {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      replyTo: data.email,
      subject: `🔔 New Inquiry from ${data.fullName}`,
      html: adminNotifyTemplate(data),
    });

    console.log('✅ Admin notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send admin email:', error);
    throw error;
  }
}