import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Volunteer — Animal SOS Adoptions',
  description: 'Join the Animal SOS volunteer team. Foster animals, help with transport, fundraise, or support us on social media — from anywhere in the world.',
}

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
