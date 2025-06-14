"use client";

import { useState } from "react";

interface UserListProps {
  setSelectedUser: (user: string) => void;
}

const users = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank"];

export default function UserList({ setSelectedUser }: UserListProps) {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full bg-[var(--color-white)] text-black flex flex-col rounded-lg overflow-hidden shadow-md">
    <div className="p-4 text-xl font-bold shadow-md bg-white">
        Chats
      </div>

      <div className="p-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full p-2 rounded-md text-black focus:outline-none"
        />
      </div>

      <div className="overflow-y-auto flex-1">
        {filteredUsers.map((user, idx) => (
          <div
            key={idx}
            className="p-4 border-b border-yellow-200 cursor-pointer hover:bg-yellow-500 transition-all"
            onClick={() => setSelectedUser(user)}
          >
            {user}
          </div>
        ))}
      </div>
    </div>
  );
}
