"use client";

import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const { data: session } = useSession();

  const [name, setName] = useState(session?.user?.name ?? "");
  const [email] = useState(session?.user?.email ?? "");
  const [profilePic, setProfilePic] = useState(session?.user?.image ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(session?.user?.name ?? "");
    setProfilePic(session?.user?.image ?? "");
  }, [session]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
      // TODO: Upload to backend and update profile in DB
    }
  };

  const handleSaveChanges = async () => {
    try {
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, profilePic }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully!");
      onClose();
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black"
          aria-label="Close Profile Modal"
        >
          &times;
        </button>

        <div className="text-center space-y-4">
          {/* Profile Image with camera icon */}
          <div className="relative w-28 h-28 mx-auto">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-[var(--color-primary)] shadow"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-3xl border-4 border-[var(--color-primary)] shadow">
                {name ? name[0].toUpperCase() : "U"}
              </div>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
              aria-label="Change Profile Picture"
            >
              <FaCamera className="text-[var(--color-primary)]" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-left text-sm font-medium mb-1" htmlFor="nameInput">
              Name
            </label>
            <input
              id="nameInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-left text-sm font-medium mb-1" htmlFor="emailInput">
              Email
            </label>
            <input
              id="emailInput"
              type="email"
              value={email}
              readOnly
              className="w-full p-2 bg-gray-100 border rounded-md text-gray-500"
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-4 justify-center">
            <button
              onClick={handleSaveChanges}
              className="flex-1 bg-[var(--color-primary)] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
            >
              Save Changes
            </button>

            <button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="flex-1 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
