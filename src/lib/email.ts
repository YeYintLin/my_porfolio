import nodemailer from "nodemailer";

interface EmailParams {
  name: string;
  email: string;
  message: string;
}

export interface SendEmailResult {
  sent: boolean;
  message?: string;
  error?: string;
}

export async function sendNotificationEmail({
  name,
  email,
  message,
}: EmailParams): Promise<SendEmailResult> {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || "altairsetsuna146@gmail.com";

  // 1. Check for Resend API Key
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Portfolio Contact <onboarding@resend.dev>",
          to: recipientEmail,
          reply_to: email,
          subject: `💼 New Portfolio Message from ${name}`,
          html: generateEmailHtml(name, email, message),
        }),
      });

      if (response.ok) {
        return { sent: true, message: "Email sent via Resend" };
      }
    } catch (err) {
      console.error("[email] Resend delivery error:", err);
    }
  }

  // 2. Check for SMTP / Gmail credentials
  const emailUser = (
    process.env.EMAIL_USER ||
    process.env.GMAIL_USER ||
    process.env.NOTIFICATION_EMAIL ||
    "altairsetsuna146@gmail.com"
  ).trim();

  const rawPass =
    process.env.EMAIL_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.CLIENT_KEY_ ||
    process.env.CLIENT_KEY;

  const emailPass = rawPass ? rawPass.replace(/\s+/g, "") : "";

  if (emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: (process.env.SMTP_PORT || "465") === "465",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${emailUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `💼 New Portfolio Message from ${name}`,
        html: generateEmailHtml(name, email, message),
      });

      return { sent: true, message: "Email sent via SMTP" };
    } catch (err: unknown) {
      console.error("[email] SMTP delivery error:", err);
      const errorMessage = err instanceof Error ? err.message : "SMTP delivery failed";
      return { sent: false, error: errorMessage };
    }
  }

  // 3. Fallback when credentials are not configured yet
  console.log(
    `[email] Inbound inquiry saved to database. To receive direct Gmail notifications, configure EMAIL_USER and EMAIL_PASS (Gmail App Password) in your Vercel Project Environment Variables.`
  );

  return {
    sent: false,
    message: "Inquiry saved to admin database (SMTP credentials not yet configured).",
  };
}

function generateEmailHtml(name: string, email: string, message: string): string {
  const dateStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Yangon" });
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #070B14; color: #F1F5F9; border-radius: 16px; overflow: hidden; border: 1px solid #1E293B;">
      <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 28px 24px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">New Message from Portfolio</h1>
        <p style="margin: 6px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Received at ${dateStr} (MMT)</p>
      </div>

      <div style="padding: 28px 24px;">
        <div style="background-color: #0E1626; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.06);">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #94A3B8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; width: 100px;">Sender:</td>
              <td style="padding: 6px 0; color: #F1F5F9; font-size: 15px; font-weight: 600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94A3B8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #38BDF8; text-decoration: none; font-weight: 500;">${escapeHtml(email)}</a></td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #10B981;">Message:</h3>
          <div style="background-color: #0E1626; border-left: 4px solid #10B981; border-radius: 4px 12px 12px 4px; padding: 18px; color: #E2E8F0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${escapeHtml(message)}
          </div>
        </div>

        <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08);">
          <a href="mailto:${escapeHtml(email)}?subject=Re:%20Portfolio%20Inquiry" style="display: inline-block; background-color: #10B981; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 50px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);">
            Reply to ${escapeHtml(name)} &rarr;
          </a>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
