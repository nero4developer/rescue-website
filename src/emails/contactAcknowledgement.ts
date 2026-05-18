export function contactAcknowledgementHtml(name: string, topic: string): string {
  const topicLabel: Record<string, string> = {
    adoption: 'adoption',
    volunteer: 'volunteering',
    donate: 'donation & sponsorship',
    other: 'your enquiry',
  }
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>We got your message</title></head>
<body style="margin:0;padding:0;background:#F7F3EC;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFDF9;border-radius:20px;border:1px solid #E8E2D8;">
        <tr><td style="background:#1C1510;padding:28px 36px;border-radius:20px 20px 0 0;">
          <p style="margin:0;font-size:18px;font-weight:700;color:#F2C27A;">Animal SOS Adoptions</p>
        </td></tr>
        <tr><td style="padding:36px;">
          <h1 style="margin:0 0 20px;font-size:24px;font-weight:900;color:#1C1510;">Message received ✉️</h1>
          <p style="margin:0 0 16px;font-size:15px;color:#3A2E26;line-height:1.75;">Hi ${name},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#3A2E26;line-height:1.75;">
            Thank you for getting in touch about <strong>${topicLabel[topic] ?? 'your enquiry'}</strong>. We&apos;ve received your message and will reply within 2 business days.
          </p>
          <p style="margin:0 0 32px;font-size:15px;color:#7A6A5A;line-height:1.75;">
            If you have urgent news about an animal in need, please note it clearly in a follow-up reply and we&apos;ll prioritise it.
          </p>
        </td></tr>
        <tr><td style="background:#F7F3EC;padding:20px 36px;border-top:1px solid #E8E2D8;border-radius:0 0 20px 20px;">
          <p style="margin:0;font-size:12px;color:#7A6A5A;">Animal SOS Adoptions · <a href="https://animalsosadoptions.com" style="color:#D4832A;text-decoration:none;">animalsosadoptions.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function contactAcknowledgementText(name: string): string {
  return `Hi ${name},

Thank you for getting in touch. We've received your message and will reply within 2 business days.

Animal SOS Adoptions
animalsosadoptions.com`
}
