// app/auth/callback/page.tsx or similar

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleSignIn() {
      const { error } = await supabase.auth.getSession(); // or use `setSession` if using older methods
      if (error) {
        console.error('Auth callback error:', error);
      } else {
        router.push('/log-in');
      }
    }

    handleSignIn();
  }, []);

  return <p>Confirming your email...</p>;
}
