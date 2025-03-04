'use client';

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const user = useAuth();
  const router = useRouter();

  if(user){
    router.push('/');
  }

  return (
    <>
        {children}
    </>
  );
}
