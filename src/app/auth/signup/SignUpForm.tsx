"use client";

import { GiBee } from "react-icons/gi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { JSX, useState, useEffect } from "react";
import { axiosForm } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUp(): JSX.Element {
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // For live availability
  const [nameAvailable, setNameAvailable] = useState<boolean | null>(null);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);

  // Debounced check for name availability
  useEffect(() => {
    if (userData.name.trim() === "") {
      setNameAvailable(null);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await axiosForm.get(`/api/signup/checkCredentials?name=${encodeURIComponent(userData.name)}`);
        setNameAvailable(!res.data.exists);
      } catch {
        setNameAvailable(null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [userData.name]);

  useEffect(() => {
    if (userData.email.trim() === "") {
      setEmailAvailable(null);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await axiosForm.get(`/api/signup/checkCredentials?email=${encodeURIComponent(userData.email)}`);
        setEmailAvailable(!res.data.exists);
      } catch {
        setEmailAvailable(null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [userData.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before submit
    if (nameAvailable === false) {
      setError("Username is already taken.");
      return;
    }
    if (emailAvailable === false) {
      setError("Email is already registered.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const data = new FormData();

      data.append("name", userData.name);
      data.append("email", userData.email);
      data.append("password", userData.password);
      if (profilePic) {
        data.append("profile_pic", profilePic);
      }

      const response = await axiosForm.post("/api/signup", data);

      if (response.status !== 201) {
        setError(response.data?.message || "Failed to sign up");
        return;
      }
      setSuccess(true);

      // Auto login after successful signup
      const res = await signIn("credentials", {
        redirect: false, // no auto redirect
        email: userData.email,
        password: userData.password,
      });

      if (res?.ok) {
        router.push("/"); 
      } else {
        setError("Signup successful, but auto-login failed.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-full max-w-sm mx-4 rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-4">
          <h1 className="text-[var(--color-primary)] text-3xl font-extrabold flex items-center gap-3">
            Sign Up <GiBee className="text-4xl" />
          </h1>
        </div>
        <h3 className="text-center text-[var(--color-secondary)]">
          Please sign up to ChatBee
        </h3>
        {success && (
          <p className="text-green-600 font-medium text-center mb-3">
            ✅ Signup successful!
          </p>
        )}

        {error && (
          <p className="text-red-600 font-medium text-center mb-3">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="font-medium text-[var(--color-secondary)]"
            >
              Username:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            {nameAvailable === false && (
              <p className="text-red-600 text-sm mt-1">Username is already taken</p>
            )}
            {nameAvailable === true && (
              <p className="text-green-600 text-sm mt-1">Username is available</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-medium text-[var(--color-secondary)] mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            {emailAvailable === false && (
              <p className="text-red-600 text-sm mt-1">Email is already registered</p>
            )}
            {emailAvailable === true && (
              <p className="text-green-600 text-sm mt-1">Email is available</p>
            )}
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="font-medium text-[var(--color-secondary)] mb-1"
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="bg-gray-100 px-3 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10 cursor-pointer text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div>
            <label
              htmlFor="profile_pic"
              className="font-medium text-[var(--color-secondary)]"
            >
              Profile Picture:
            </label>
            <div
              className="flex justify-center items-center h-16 bg-gray-100 border border-gray-300 hover:border-[var(--color-primary)] cursor-pointer rounded-lg transition duration-300 ease-in-out shadow-sm hover:shadow-md mt-1 mb-2"
              onClick={() => document.getElementById("profile_pic")?.click()}
            >
              <p className="text-sm text-[var(--color-secondary)] font-medium truncate px-2">
                {profilePic?.name}
              </p>
              <button
                type="button"
                className="text-[var(--color-primary)] text-sm font-semibold"
              >
                Upload Photo...
              </button>
            </div>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full text-lg font-semibold text-white bg-[var(--color-primary)] py-2 rounded-md hover:bg-opacity-90 transition-all"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
