export function volunteerConfirmationHtml(name: string, roles: string[]): string {
  const roleLabels: Record<string, string> = {
    foster: 'Foster carer',
    transport: 'Transport volunteer',
    fundraise: 'Fundraising',
    'social-media': 'Social media',
    events: 'Events helper',
  }
  const roleList = roles.map((r) => roleLabels[r] ?? r).join(', ')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Volunteer signup confirmed</title></head>
<body style="margin:0;padding:0;background:#F7F3EC;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFDF9;border-radius:20px;border:1px solid #E8E2D8;">
        <tr><td style="background:#1C1510;padding:28px 36px;border-radius:20px 20px 0 0;">
          <p style="margin:0;font-size:18px;font-weight:700;color:#F2C27A;">Animal SOS Adoptions</p>
        </td></tr>
        <tr><td style="padding:36px;">
          <h1 style="margin:0 0 20px;font-size:24px;font-weight:900;color:#1C1510;">Welcome to the team 🐾</h1>
          <p style="margin:0 0 16px;font-size:15px;color:#3A2E26;line-height:1.75;">Hi ${name},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#3A2E26;line-height:1.75;">
            You&apos;re officially signed up to volunteer with Animal SOS Adoptions. Thank you — it genuinely makes a difference.
          </p>
          <div style="background:#FDF3E3;border:1px solid rgba(212,131,42,0.2);border-radius:14px;padding:16px 20px;margin:0 0 24px;">
            <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#B85C3A;">You signed up for</p>
            <p style="margin:0;font-size:15px;font-weight:600;color:#1C1510;">${roleList}</p>
          </div>
          <p style="margin:0 0 32px;font-size:15px;color:#7A6A5A;line-height:1.75;">
            A member of the team will be in touch with next steps within the next week. If you have questions before then, just reply to this email.
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

export function volunteerConfirmationText(name: string, roles: string[]): string {
  return `Hi ${name},

You're officially signed up to volunteer with Animal SOS Adoptions. Thank you!

Roles: ${roles.join(', ')}

A member of the team will be in touch with next steps within the next week.

Animal SOS Adoptions
animalsosadoptions.com`
}
