import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Animal SOS Adoptions',
  description:
    'Adopt a rescued Sri Lankan street dog or cat. Browse available animals and submit your adoption application.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-text-body antialiased">
        <Navbar />
        <main className="flex flex-col flex-1 pt-[73px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
