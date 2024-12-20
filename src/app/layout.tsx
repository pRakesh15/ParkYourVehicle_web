'use client'

import { Inter } from 'next/font/google'
import { ApolloProvider } from '../../../libs/Network/src/config/apollo'
import './globals.css';
// import NavBar from '@/Components/NavBar';
import { SessionProvider } from '@/components/molecules/SessionProvider';
import NavBar from '@/components/NavBar';
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })
import 'react-toastify/dist/ReactToastify.css';

// export const metadata: Metadata = {
//   title: 'Autospace',
//   description: 'Generated by create next app',
// }

// const MENUITEMS: MenuItem[] = [
//   { label: 'Search', href: '/search' },
//   { label: 'Bookings', href: '/bookings' },
// ]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <ApolloProvider>

          <body className={`${inter.className} bg-gray-25 bg-black text-white`}>
          <NavBar />
            {children}
          
            <ToastContainer />
          </body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  )
}
