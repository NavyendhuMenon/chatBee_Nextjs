"use client";

import React, { JSX, useState } from "react";
import { GiBee } from "react-icons/gi";
import { signIn } from "next-auth/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignIn(): JSX.Element {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
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

        <form action="" className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
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
              value={userData.password}
              onChange={handleChange}
              placeholder="Enter your password..."
              className="bg-gray-100 px-3 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10 text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full text-lg font-semibold text-white bg-[var(--color-primary)] py-2 rounded-md hover:bg-opacity-90 transition-all"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
