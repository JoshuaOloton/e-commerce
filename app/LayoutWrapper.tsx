"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import { usePathname } from 'next/navigation';

const LayoutWrapper = ({ children } : { children : React.ReactNode } ) => {

  const pathname = usePathname();
  const hideNavbar = pathname === '/login' || pathname === '/signup';

  return (
    <SessionProvider>
      <Toaster richColors />
      {!hideNavbar && <Navbar /> }
      {children}
      <Footer />
    </SessionProvider>
  )
}

export default LayoutWrapper