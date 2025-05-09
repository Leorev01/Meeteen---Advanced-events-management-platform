'use client';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { setSession, clearSession } from '@/store/sessionSlice';
import { store } from '@/store';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { supabase } from '@/lib/supabase';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const SessionInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data?.session) {
        console.warn('No active session found:', error?.message || 'Session not found');
        dispatch(clearSession()); // Clear session in Redux if no session is found
        return;
      }

      // Set session in Redux
      dispatch(setSession({ user: data.session.user, session: data.session }));
    };

    fetchSession();
  }, [dispatch]);

  return null; // No need to render anything
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <SessionInitializer /> {/* Initialize session globally */}
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </Provider>
  );
}