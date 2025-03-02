"use client";

//import { useRouter } from "next/navigation";
//import { useSession } from "next-auth/react";

export default function CreateEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if user is not authenticated
  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/log-in");
    return null; // Prevents rendering content before redirection
  }
 if(!localStorage.getItem("user")){
    router.push("/log-in");
    return null;
  }
  else{*/
    return <>{children}</>;
 // }
}
