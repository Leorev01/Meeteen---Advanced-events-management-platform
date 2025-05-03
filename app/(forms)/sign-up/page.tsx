"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();

  // Use useState instead of useRef for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload
    setIsLoading(true)
    setError(""); // Reset error before submitting

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register");
      }

      // Registration successful, redirect to home page
      toast.success(`Registration successful!P\nlease check your email to verify your account.`);
      router.push("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Registration failed. Please try again.");
      setError(error.message);
    }
    setIsLoading(false)
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} /> {/* Toast notifications */}
      {/* Desktop View */}
      <div className="hidden sm:flex flex-row h-screen">
        <div className="self-center w-1/2 px-10">
          <h1 className="text-4xl font-bold">Sign Up</h1>
          <p className="text-gray-500">Sign up to start creating and joining events!</p>
          
          {error && <p className="text-red-500">{error}</p>} {/* Show error message */}

          <form className="flex flex-col gap-4 mx-auto flex-1" onSubmit={submitHandler}>
            <input
              className="bg-gray-200 p-2 rounded"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <button disabled={isLoading} className="bg-[#EF233C] text-white p-2 rounded hover:bg-red-600" type="submit">
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-10">
            Already have an account?{" "}
            <Link href="/log-in" className="text-[#EF233C]">
              Log In
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="w-1/2 h-screen relative">
          <Image src="/images/group-selfie.jpg" alt="happy friends" layout="fill" objectFit="cover" />
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden relative h-screen flex flex-col items-center justify-center">
        <Image
          src="/images/group-selfie.jpg"
          alt="happy friends"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />

        <div className="relative z-10 bg-white/70 backdrop-blur-md p-6 rounded-lg w-11/12 max-w-md shadow-md">
          <h2 className="text-4xl font-bold text-center">Sign Up</h2>

          {error && <p className="text-red-500 text-center">{error}</p>} {/* Show error message */}

          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <input
              className="bg-gray-200 p-2 rounded"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <button disabled={isLoading} className="bg-[#EF233C] text-white p-2 rounded hover:bg-red-600" type="submit">
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/log-in" className="text-[#EF233C]">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
