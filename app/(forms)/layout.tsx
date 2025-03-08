'use client'
import { useRouter } from "next/navigation";
import  {useSession} from "next-auth/react";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  const {data:session} = useSession();

  if(session){
    router.push("/"); // Redirect if authenticated
  }

  return <>{children}</>;
}
