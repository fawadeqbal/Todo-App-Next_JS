import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import { ClerkProvider } from '@clerk/nextjs'
import Head from './head'


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
        <Head/>
        <body >
          <header>
          <Navbar />
          </header>
            {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
