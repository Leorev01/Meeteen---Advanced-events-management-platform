'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setSession } from '@/store/sessionSlice';
import { supabase } from '@/lib/supabase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // Handle login
  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
  
    if (!email || !password) {
      setErrorMessage("Please enter email and password.");
      setIsLoading(false);
      return;
    }
  
    try {
      // Call the API route
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setErrorMessage(data.error || "Login failed, please try again.");
        setIsLoading(false);
        return;
      }
  
      // Step 1: Set the session on the client side
      const { error: sessionError } = await supabase.auth.setSession(data.session);
      if (sessionError) {
        console.error("Error setting session:", sessionError);
        setErrorMessage("Failed to set session. Please try again.");
        setIsLoading(false);
        return;
      }
  
      // Step 2: Dispatch session to Redux
      dispatch(setSession({
        user: data.user,
        session: data.session,
      }));
  
      // Step 3: Redirect to profile page
      router.push("/profile");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  
    setIsLoading(false);
  };

  return (
    <>
      <div className="hidden sm:flex flex-row h-screen">
        {/* Image Section */}
        <div className="w-1/2 h-screen relative">
          <Image src="/images/group-selfie.jpg" alt="happy friends" layout="fill" objectFit="cover" />
        </div>

        {/* Login Form Section */}
        <div className="self-center w-1/2 px-10">
          <h1 className="text-4xl font-bold">Log In</h1>
          <p className="text-gray-500">Log in to your account to start creating and joining events!</p>

          <form className="flex flex-col gap-4 mx-auto flex-1" onSubmit={loginHandler}>
            <input
              className="bg-gray-200 p-2 rounded"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="bg-gray-200 p-2 rounded"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button disabled={isLoading} className="bg-[#EF233C] text-white p-2 rounded hover:bg-red-600" type="submit">
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="mt-10">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-[#EF233C]">Sign Up</Link>
          </p>
        </div>
      </div>

      <div className="sm:hidden relative h-screen flex flex-col items-center justify-center">
        <Image src="/images/group-selfie.jpg" alt="happy friends" layout="fill" objectFit="cover" className="absolute inset-0 z-0" />

        <div className="relative z-10 bg-white/70 backdrop-blur-md p-6 rounded-lg w-11/12 max-w-md shadow-md">
          <h2 className="text-4xl font-bold text-center">Log In</h2>

          <form className="flex flex-col gap-4" onSubmit={loginHandler}>
            <input
              className="bg-gray-200 p-2 rounded"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="bg-gray-200 p-2 rounded"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button disabled={isLoading} className="bg-[#EF233C] text-white p-2 rounded hover:bg-red-600" type="submit">
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="mt-4 text-center">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-[#EF233C]">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
