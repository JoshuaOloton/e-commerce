"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../lib/store';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import { usePathname } from 'next/navigation';

const LayoutWrapper = ({ children } : { children : React.ReactNode } ) => {

  const pathname = usePathname();
  const hideNavbar = pathname === '/login' || pathname === '/signup';

  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster richColors />
          {!hideNavbar && <Navbar /> }
          {children}
          <Footer />
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}

export default LayoutWrapper