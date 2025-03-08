'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function FormLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();

  // Load session from localStorage on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSession = localStorage.getItem('session');
      if (!storedSession) {
        router.push('/log-in'); // Redirect to home page
      }
    }
  }, [dispatch]);

  return <>{children}</>;
}
