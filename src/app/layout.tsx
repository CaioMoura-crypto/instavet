import "@/app/globals.css";
import { Inter, Lora } from 'next/font/google'
import { SanityLive } from '@/sanity/lib/live'
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable}`}>
        <Navbar />
        {children}
        <SanityLive />
      </body>
    </html>
  )
}