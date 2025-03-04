"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface User {
  email: string;
}

const Dashboard = () => {
  const user = useAuth() as User | null;
  const router = useRouter();

  if (user === null) {
    return <p>Loading...</p>; // Show loading state while checking auth
  }

  if (!user) {
    router.push("/login"); // Redirect to login page if not authenticated
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <button
        onClick={async () => {
          await fetch("/api/logout", { method: "POST" });
          router.push("/login");
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
