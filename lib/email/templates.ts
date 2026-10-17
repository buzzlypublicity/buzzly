interface InquiryData {
  fullName: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}

/* ============================================================
   USER THANK-YOU EMAIL
   ============================================================ */
export function userThankYouTemplate(data: InquiryData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;background-color:#FDFAF4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FDFAF4;padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#E97A00 0%,#B04E00 100%);padding:32px 40px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:900;letter-spacing:-0.02em;">
                      BUZZLY<span style="opacity:0.7;">.</span>
                    </h1>
                    <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;">
                      Publicity & Advertising
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px;">
                    <h2 style="margin:0 0 16px;color:#16181F;font-size:22px;font-weight:900;letter-spacing:-0.02em;">
                      Hi ${escapeHtml(data.fullName)}, 👋
                    </h2>

                    <p style="margin:0 0 16px;color:#5A6274;font-size:15px;line-height:1.7;">
                      Thank you for reaching out to <strong style="color:#E97A00;">BUZZLY Publicity</strong>!
                    </p>

                    <p style="margin:0 0 16px;color:#5A6274;font-size:15px;line-height:1.7;">
                      We've received your inquiry and appreciate your interest in working with us. Our team will review your message and get back to you as soon as possible.
                    </p>

                    <p style="margin:0 0 24px;color:#5A6274;font-size:15px;line-height:1.7;">
                      In the meantime, feel free to explore our services and learn more about how we can help your brand grow.
                    </p>

                    <!-- CTA -->
                    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                      <tr>
                        <td style="background:linear-gradient(135deg,#F9B04A 0%,#E97A00 50%,#B04E00 100%);border-radius:100px;">
                          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/services" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;">
                            Explore Our Services →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0;color:#5A6274;font-size:15px;line-height:1.7;">
                      We look forward to connecting with you!
                    </p>

                    <p style="margin:24px 0 0;color:#16181F;font-size:15px;font-weight:700;">
                      Best regards,<br>
                      <span style="color:#E97A00;">BUZZLY Publicity</span><br>
                      <span style="font-weight:400;color:#767E8E;font-size:13px;">Let's make your brand stand out.</span>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:24px 40px;background-color:#FAF5EA;text-align:center;border-top:1px solid #DDDFE6;">
                    <p style="margin:0;color:#767E8E;font-size:11px;line-height:1.6;">
                      BUZZLY PUBLICITY & ADVERTISING W.L.L<br>
                      Muharraq, Kingdom of Bahrain<br>
                      <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="color:#E97A00;text-decoration:none;">
                        buzzly.agency
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

/* ============================================================
   ADMIN NOTIFICATION EMAIL
   ============================================================ */
export function adminNotifyTemplate(data: InquiryData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="margin:0;padding:0;background-color:#FDFAF4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FDFAF4;padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
                <!-- Header -->
                <tr>
                  <td style="background:#16181F;padding:24px 40px;">
                    <p style="margin:0;color:#E97A00;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;">
                      🔔 New Inquiry
                    </p>
                    <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:900;">
                      Buzzly Contact Form
                    </h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:32px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #EEEFF3;">
                          <p style="margin:0;color:#767E8E;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;">
                            Full Name
                          </p>
                          <p style="margin:4px 0 0;color:#16181F;font-size:15px;font-weight:600;">
                            ${escapeHtml(data.fullName)}
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #EEEFF3;">
                          <p style="margin:0;color:#767E8E;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;">
                            Email
                          </p>
                          <p style="margin:4px 0 0;color:#16181F;font-size:15px;font-weight:600;">
                            <a href="mailto:${escapeHtml(data.email)}" style="color:#E97A00;text-decoration:none;">
                              ${escapeHtml(data.email)}
                            </a>
                          </p>
                        </td>
                      </tr>

                      ${data.company ? `
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #EEEFF3;">
                          <p style="margin:0;color:#767E8E;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;">
                            Company / Brand
                          </p>
                          <p style="margin:4px 0 0;color:#16181F;font-size:15px;font-weight:600;">
                            ${escapeHtml(data.company)}
                          </p>
                        </td>
                      </tr>
                      ` : ''}

                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #EEEFF3;">
                          <p style="margin:0;color:#767E8E;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;">
                            Service Required
                          </p>
                          <p style="margin:4px 0 0;color:#16181F;font-size:15px;font-weight:600;">
                            ${escapeHtml(data.service)}
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:16px 0 0;">
                          <p style="margin:0;color:#767E8E;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;">
                            Project Details
                          </p>
                          <div style="margin:8px 0 0;padding:16px;background:#FDFAF4;border-radius:12px;border-left:3px solid #E97A00;">
                            <p style="margin:0;color:#16181F;font-size:14px;line-height:1.7;white-space:pre-wrap;">
                              ${escapeHtml(data.message)}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Reply CTA -->
                    <table cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
                      <tr>
                        <td style="background:#E97A00;border-radius:100px;">
                          <a href="mailto:${escapeHtml(data.email)}?subject=Re: Your Inquiry to BUZZLY" style="display:inline-block;padding:12px 28px;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;">
                            Reply to ${escapeHtml(data.fullName)} →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:16px 40px;background:#FAF5EA;text-align:center;border-top:1px solid #DDDFE6;">
                    <p style="margin:0;color:#767E8E;font-size:11px;">
                      Received ${new Date().toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

/* Helper to prevent XSS */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}