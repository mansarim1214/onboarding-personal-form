import { Resend } from "resend";

/**
 * Netlify function: netlify/functions/sendEmail.js
 *
 * ✅ Supports:
 * - Normal form submissions → sent to info@doneotc.com
 * - SignificantIndividualKYC → sent to user + info@doneotc.com
 * - Attachments up to MAX_FILE_BYTES
 */

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

function formatNestedField(label, data, indent = 2) {
  const spacing = " ".repeat(indent);
  let formatted = `${label}:\n`;

  if (Array.isArray(data)) {
    data.forEach((item, i) => {
      formatted += `${spacing}- Item ${i + 1}:\n`;
      if (typeof item === "object" && item !== null) {
        for (const key in item) {
          formatted += `${spacing.repeat(2)}${key}: ${String(item[key])}\n`;
        }
      } else {
        formatted += `${spacing.repeat(2)}${String(item)}\n`;
      }
    });
  } else if (typeof data === "object" && data !== null) {
    for (const key in data) {
      formatted += `${spacing}${key}: ${String(data[key])}\n`;
    }
  } else {
    formatted += `${spacing}${String(data)}\n`;
  }

  return formatted;
}

export const handler = async (event) => {
  const jsonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    // 1️⃣ API key
    const resendApiKey = process.env.RESEND_API_KEY || "re_315USWYB_JQLHZuT6t1nXQBuY6AodMo4y";
    const resend = new Resend(resendApiKey);

    // 2️⃣ Parse incoming data
    const payload = event.body ? JSON.parse(event.body) : {};
    const { formData } = payload;

    if (!formData || typeof formData !== "object") {
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: JSON.stringify({ error: "No formData received" }),
      };
    }

    // 3️⃣ Collect attachments and readable text
    const attachments = [];
    const textFields = [];

    for (const key in formData) {
      const value = formData[key];

      if (value && value.name && value.base64) {
        const base64Len = typeof value.base64 === "string" ? value.base64.length : 0;
        const approxBytes = Math.floor((base64Len * 3) / 4);

        if (approxBytes > MAX_FILE_BYTES) {
          return {
            statusCode: 413,
            headers: jsonHeaders,
            body: JSON.stringify({
              error: `File "${value.name}" is too large (${Math.round(
                approxBytes / 1024
              )} KB). Max ${(MAX_FILE_BYTES / 1024).toFixed(0)} KB.`,
            }),
          };
        }

        attachments.push({
          filename: value.name,
          content: value.base64,
        });
      } else if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
        textFields.push(formatNestedField(key, value));
      } else {
        textFields.push(`${key}: ${String(value)}`);
      }
    }

    const textBody = `📝 New Form Submission\n\n${textFields.join("\n")}`;

    // 4️⃣ Decide recipients & content
    const isKYC = formData.type === "SignificantIndividualKYC";
    const userEmail = formData.to;
    const recipients = isKYC && userEmail ? [userEmail, "info@doneotc.com"] : ["info@doneotc.com"];

    const subject = isKYC
      ? `Please Complete Your KYC Verification`
      : `New Form Submission`;

    const htmlBody = isKYC
      ? `
        <p>Hi ${formData.name || "there"},</p>
        <p>You’ve been added as a Significant Individual for DoneOTC.</p>
        <p>Please complete your identity verification by clicking below:</p>
        <p style="margin-top:16px;">
          <a href="${formData.kycLink}" 
             style="background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;">
             Verify Identity
          </a>
        </p>
        <p style="margin-top:12px;">If the button doesn’t work, copy this link:<br>${formData.kycLink}</p>
        <hr style="margin:20px 0;border:0;border-top:1px solid #ccc;">
        <p><em>This email was also sent to DoneOTC Admin for recordkeeping.</em></p>
      `
      : `<pre>${textBody}</pre>`;

    // 5️⃣ Send email
    await resend.emails.send({
      from: "info@doneotc.com",
      to: recipients,
      subject,
      html: htmlBody,
      attachments: attachments.length ? attachments : undefined,
    });

    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (err) {
    console.error("sendEmail function error:", err);
    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: JSON.stringify({ error: err?.message || "Internal server error" }),
    };
  }
};
