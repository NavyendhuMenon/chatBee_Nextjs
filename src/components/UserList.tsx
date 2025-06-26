"use client";

import { useGetUsersQuery } from "@/redux/api/userApi";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@/redux/slices/selectedUserSlices";
import { useState } from "react";

export default function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [search, setSearch] = useState("");

  return (
    <div className="h-full bg-[var(--color-white)] text-black flex flex-col rounded-lg overflow-hidden shadow-md">
      <div className="p-4 text-xl font-bold shadow-md bg-white">Chats</div>

      <div className="p-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] hover:bg-yellow-100 focus:bg-yellow-100 transition-colors"
        />
      </div>

      {isLoading && <p>Loading users...</p>}
      {isError && <p>Failed to load users</p>}

      <div
        className="overflow-y-auto flex-1 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {users
          .filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((user) => (
            <div
              key={user._id}
              className="p-4 border-b border-yellow-200 cursor-pointer hover:bg-yellow-500 hover:rounded-lg transition-all flex items-center gap-4"
              onClick={() => dispatch(setSelectedUser(user))}
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-[var(--color-primary)] shadow flex items-center justify-center text-gray-600 font-semibold text-lg uppercase">
                {user.profile_pic ? (
                  <img
                    src={user.profile_pic}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : user.name?.trim().length ? (
                  user.name.trim()[0].toUpperCase()
                ) : (
                  "U"
                )}
              </div>

              <span className="text-lg font-medium">{user.name}</span>
            </div>
          ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
