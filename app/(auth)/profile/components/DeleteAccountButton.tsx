import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { clearSession } from "@/store/sessionSlice";

const DeleteAccountButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const deleteAccount = async () => {
    setIsLoading(true);
    setErrorMessage(null);
  
    try {
      // Get the user's session and access token
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;
  
      if (!accessToken) {
        setErrorMessage("You must be logged in to delete your account.");
        setIsLoading(false);
        return;
      }
  
      // Send a request to the API to delete the user
      const response = await fetch("/api/auth/delete-user", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Log out the user after the account is deleted
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Error logging out:", error);
        }
        clearSession(); // Clear session in Redux store

  
        // Redirect to a confirmation page or the homepage
        router.push("/goodbye"); // Example of redirect after deletion
      } else {
        setErrorMessage(data.error || "An error occurred while deleting your account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="bg-red-500 text-white p-2 rounded mt-2"
        onClick={deleteAccount}
        disabled={isLoading}
      >
        {isLoading ? "Deleting..." : "Delete Account"}
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default DeleteAccountButton;
