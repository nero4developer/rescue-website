import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us — Animal SOS Adoptions',
  description: 'Get in touch with the Animal SOS team about adoptions, volunteering, donations, or any other enquiry. We reply within 2 business days.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
