require("dotenv").config(); 
const nodemailer = require("nodemailer");

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send a password reset email
 * @param {string} toEmail   - student's email
 * @param {string} resetLink - full reset URL with token
 * @param {string} name      - student's name
 */
const sendPasswordResetEmail = async (toEmail, resetLink, name) => {
  const mailOptions = {
    from: `"EaseBuddy" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your EaseBuddy password",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;background:#F9FAFB;font-family:'Segoe UI',Arial,sans-serif">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0">
          <tr>
            <td align="center">
              <table width="560" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:16px;overflow:hidden;
                       border:1px solid #E5E7EB;max-width:560px;width:100%">

                <!-- Header -->
                <tr>
                  <td style="background:#4F46E5;padding:32px;text-align:center">
                    <p style="margin:0;font-size:28px">📚</p>
                    <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700">
                      EaseBuddy
                    </h1>
                    <p style="margin:4px 0 0;color:#C7D2FE;font-size:13px">
                      CBSE Study Hub
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:36px 32px">
                    <h2 style="margin:0 0 12px;color:#111827;font-size:20px;font-weight:600">
                      Hi ${name} 👋
                    </h2>
                    <p style="margin:0 0 20px;color:#6B7280;font-size:15px;line-height:1.6">
                      We received a request to reset the password for your EaseBuddy account.
                      Click the button below to set a new password.
                    </p>

                    <!-- Button -->
                    <table cellpadding="0" cellspacing="0" style="margin:24px 0">
                      <tr>
                        <td style="border-radius:10px;background:#4F46E5">
                          <a href="${resetLink}"
                             style="display:inline-block;padding:14px 32px;
                                    color:#ffffff;font-size:15px;font-weight:600;
                                    text-decoration:none;border-radius:10px">
                            Reset My Password
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0 0 8px;color:#9CA3AF;font-size:13px">
                      This link expires in <strong>1 hour</strong>.
                    </p>
                    <p style="margin:0 0 24px;color:#9CA3AF;font-size:13px">
                      If you didn't request a password reset, you can safely ignore this email.
                      Your password will not change.
                    </p>

                    <!-- Fallback link -->
                    <div style="background:#F3F4F6;border-radius:8px;padding:14px">
                      <p style="margin:0 0 6px;color:#6B7280;font-size:12px">
                        Button not working? Copy and paste this link:
                      </p>
                      <p style="margin:0;word-break:break-all;color:#4F46E5;font-size:12px">
                        ${resetLink}
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#F9FAFB;padding:20px 32px;
                             border-top:1px solid #E5E7EB;text-align:center">
                    <p style="margin:0;color:#9CA3AF;font-size:12px">
                      © 2024 EaseBuddy · CBSE Study Hub
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };