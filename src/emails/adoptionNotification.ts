type AdoptionDetails = {
  applicantName: string
  applicantEmail: string
  applicantPhone?: string
  address: string
  animalName: string
  homeType: string
  hasGarden: boolean
  hasChildren: boolean
  hasOtherPets: boolean
  lifestyleAnswers: string
  applicationId: string
}

export function adoptionNotificationHtml(d: AdoptionDetails): string {
  const bool = (v: boolean) => v ? '✓ Yes' : '✗ No'
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New adoption application</title></head>
<body style="margin:0;padding:0;background:#F7F3EC;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFDF9;border-radius:20px;border:1px solid #E8E2D8;">
        <tr><td style="background:#1C1510;padding:24px 32px;border-radius:20px 20px 0 0;">
          <p style="margin:0;font-size:18px;font-weight:700;color:#F2C27A;">New adoption application</p>
          <p style="margin:4px 0 0;font-size:13px;color:rgba(255,253,249,0.5);">Application ID: ${d.applicationId}</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding-bottom:20px;border-bottom:1px solid #E8E2D8;">
              <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7A6A5A;">Animal</p>
              <p style="margin:0;font-size:16px;font-weight:600;color:#1C1510;">${d.animalName}</p>
            </td></tr>
            <tr><td style="padding:20px 0;border-bottom:1px solid #E8E2D8;">
              <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7A6A5A;">Applicant</p>
              <p style="margin:0 0 4px;font-size:14px;color:#3A2E26;">${d.applicantName}</p>
              <p style="margin:0 0 4px;font-size:14px;color:#3A2E26;">${d.applicantEmail}</p>
              ${d.applicantPhone ? `<p style="margin:0;font-size:14px;color:#3A2E26;">${d.applicantPhone}</p>` : ''}
              <p style="margin:8px 0 0;font-size:14px;color:#3A2E26;">${d.address.replace(/\n/g, ', ')}</p>
            </td></tr>
            <tr><td style="padding:20px 0;border-bottom:1px solid #E8E2D8;">
              <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7A6A5A;">Home</p>
              <p style="margin:0 0 4px;font-size:14px;color:#3A2E26;">Type: ${d.homeType}</p>
              <p style="margin:0 0 4px;font-size:14px;color:#3A2E26;">Garden: ${bool(d.hasGarden)}</p>
              <p style="margin:0 0 4px;font-size:14px;color:#3A2E26;">Children: ${bool(d.hasChildren)}</p>
              <p style="margin:0;font-size:14px;color:#3A2E26;">Other pets: ${bool(d.hasOtherPets)}</p>
            </td></tr>
            <tr><td style="padding:20px 0;">
              <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7A6A5A;">Lifestyle answers</p>
              <p style="margin:0;font-size:14px;color:#3A2E26;line-height:1.7;">${d.lifestyleAnswers.replace(/\n/g, '<br>')}</p>
            </td></tr>
          </table>
          <table cellpadding="0" cellspacing="0" style="margin-top:24px;">
            <tr><td style="background:#D4832A;border-radius:100px;">
              <a href="https://animalsosadoptions.com/admin/collections/adoptions" style="display:block;padding:12px 24px;font-size:13px;font-weight:600;color:#1C1510;text-decoration:none;">View in admin panel →</a>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
