'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSession } from '@/store/sessionSlice';
import { store } from '@/store';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import './globals.css';
import { getSessionFromLocalStorage } from '@/utils/session';

// This component initializes session state only on the client side.
const SessionInitializer = () => {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true);  // This ensures that the session logic is run only on the client
  }, []);

  useEffect(() => {
    if (isClient) {
      const sessionData = getSessionFromLocalStorage();
      if (sessionData) {
        dispatch(setSession({ user: sessionData.user, session: sessionData.session }));
      }
    }
  }, [isClient, dispatch]);

  return null;  // No need to render anything
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <SessionInitializer /> {/* Delay session initialization until after the initial render */}
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
