export function adoptionConfirmationHtml(applicantName: string, animalName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Application received</title></head>
<body style="margin:0;padding:0;background:#F7F3EC;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#FFFDF9;border-radius:20px;overflow:hidden;border:1px solid #E8E2D8;">
        <!-- Header -->
        <tr><td style="background:#1C1510;padding:32px 40px;">
          <p style="margin:0;font-size:20px;font-weight:700;color:#F2C27A;letter-spacing:-0.5px;">Animal SOS Adoptions</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <h1 style="margin:0 0 8px;font-size:28px;font-weight:900;color:#1C1510;letter-spacing:-1px;">Application received 🐾</h1>
          <p style="margin:0 0 24px;font-size:15px;color:#7A6A5A;">Hi ${applicantName},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#3A2E26;line-height:1.75;">
            Thank you for applying to adopt <strong>${animalName}</strong>. We&apos;ve received your application and our team will review it carefully.
          </p>
          <p style="margin:0 0 32px;font-size:15px;color:#3A2E26;line-height:1.75;">
            We aim to respond within <strong>2–3 business days</strong>. If you have any questions in the meantime, reply to this email or visit our contact page.
          </p>
          <table cellpadding="0" cellspacing="0">
            <tr><td style="background:#D4832A;border-radius:100px;">
              <a href="https://animalsosadoptions.com/adopt" style="display:block;padding:14px 28px;font-size:14px;font-weight:600;color:#1C1510;text-decoration:none;">Browse more animals →</a>
            </td></tr>
          </table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#F7F3EC;padding:24px 40px;border-top:1px solid #E8E2D8;">
          <p style="margin:0;font-size:12px;color:#7A6A5A;line-height:1.6;">
            Animal SOS Adoptions · Colombo, Sri Lanka<br>
            Registered charity · <a href="https://animalsosadoptions.com" style="color:#D4832A;text-decoration:none;">animalsosadoptions.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function adoptionConfirmationText(applicantName: string, animalName: string): string {
  return `Hi ${applicantName},

Thank you for applying to adopt ${animalName}. We've received your application and our team will review it carefully.

We aim to respond within 2–3 business days. If you have any questions, reply to this email or visit animalsosadoptions.com/contact.

Animal SOS Adoptions
animalsosadoptions.com`
}
