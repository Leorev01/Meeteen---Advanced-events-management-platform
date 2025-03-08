import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  // Fetch session on the server
  const session = await getServerSession(authOptions);

  // If user is not authenticated, redirect to login page
  if (!session) {
    redirect("/log-in");
  }

  return <>{children}</>;
}
