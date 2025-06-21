"use client";

import React, { JSX, useEffect, useState } from "react";
import { GiBee } from "react-icons/gi";
import { signIn, useSession } from "next-auth/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SignIn(): JSX.Element | null {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      router.replace("/chat");
    }
  }, [session, router]);

  // if (status === "loading") return null;
  // if (status === "authenticated") return null;

  // Local state for inputs & other UI state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      remember: rememberMe,
    });

    if (result?.ok) {
      router.push("/chat");
    } else {
      setError("Invalid email or password!!!");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-full max-w-sm mx-4 rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-4">
          <h1 className="text-[var(--color-primary)] text-3xl font-extrabold flex items-center gap-3">
            Sign In <GiBee className="text-4xl" />
          </h1>
        </div>

        <p className="text-center text-gray-600 mb-6">Welcome Back!!!</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="font-medium text-gray-700 mb-1"
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              className="bg-gray-100 px-3 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10 text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="text-gray-700 text-sm cursor-pointer"
            >
              Remember me
            </label>
          </div>

          {error && (
            <p className="text-red-600 text-center text-sm">{error}</p>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full text-lg font-semibold text-white bg-[var(--color-primary)] py-2 rounded-md hover:bg-opacity-90 transition-all"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
