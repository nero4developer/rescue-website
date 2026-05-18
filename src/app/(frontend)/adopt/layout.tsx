import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adopt a Dog or Cat — Animal SOS Adoptions',
  description: 'Browse rescued dogs and cats from Sri Lanka available for adoption. Filter by type, sex, and temperament. Every animal is vaccinated, neutered, and ready for a forever home.',
}

export default function AdoptLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
