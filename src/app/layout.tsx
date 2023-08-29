import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
const inter = Inter({ subsets: ['latin'] })
import { ClerkProvider } from '@clerk/nextjs'


export const metadata: Metadata = {
  title: 'Todo-App',
  description: 'This app contains simple crud operations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body >
          <main>
            <Navbar />
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
