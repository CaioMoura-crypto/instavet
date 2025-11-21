import "@/app/globals.css";
import { Inter, Lora, Roboto_Condensed, Oswald, Dancing_Script } from 'next/font/google'
import { SanityLive } from '@/sanity/lib/live'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  variable: '--font-roboto-condensed',
  weight: ['300', '400', '700'],
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['300', '400', '700'],
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  weight: ['400', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} ${robotoCondensed.variable} ${oswald.variable} ${dancingScript.variable}`}>
        {children}
        <SanityLive />
      </body>
    </html>
  )
}