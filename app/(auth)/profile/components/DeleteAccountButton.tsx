import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { clearSession } from "@/store/sessionSlice";
import { useDispatch } from "react-redux";

const DeleteAccountButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const deleteAccount = async () => {
    const userConfirmed = confirm(`Are you sure you want to delete your account?\nThis action cannot be undone!`);
    if (!userConfirmed) return; // If the user cancels, do nothing
    setIsLoading(true);
    setErrorMessage(null);
  
    try {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;
  
      if (!accessToken) {
        setErrorMessage("You must be logged in to delete your account.");
        setIsLoading(false);
        return;
      }
  
      const response = await fetch("/api/auth/delete-user", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Log out the user after the account is deleted
        await supabase.auth.signOut(); // Logs out the user
        dispatch(clearSession()); // Clears the session in Redux store
        router.push("/goodbye"); // Redirects to a confirmation page
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
