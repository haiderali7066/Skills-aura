import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Header  from '@/components/header'
import Footer  from '@/components/footer'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Skills Aura - Premium Professional Learning Platform',
  description: 'Master in-demand skills with expert-led courses, personalized consultations, and industry mentorship. Join the elite community of professionals.',
  generator: 'v0.app',
  keywords: 'professional development, online courses, skill development, expert mentoring, business training',
  openGraph: {
    title: 'Skills Aura - Premium Professional Learning',
    description: 'Master in-demand skills with expert-led courses and personalized consultations',
    type: 'website',
    url: 'https://skillsaura.com',
  },
 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="theme-color" content="#0A0E27" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
