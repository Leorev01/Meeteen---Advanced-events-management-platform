// app/components/SessionCheck.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const SessionCheck = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    // Optionally, listen for session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (session) {
    return <div>Welcome, {session.user?.email}</div>;
  } else {
    return <div>You are not logged in.</div>;
  }
};

export default SessionCheck;
