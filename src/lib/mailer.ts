import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export type MailOptions = {
  to: string
  subject: string
  html: string
  text?: string
}

const FROM = `${process.env.FROM_NAME || 'Animal SOS Adoptions'} <${process.env.FROM_EMAIL || 'adoptions@animalsosadoptions.com'}>`

export async function sendMail(options: MailOptions): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[mailer] SMTP credentials not configured — skipping email send')
    return
  }
  await transporter.sendMail({
    from: FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  })
}
