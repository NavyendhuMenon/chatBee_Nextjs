// app/auth/layout.tsx
import React, { ReactNode } from "react";
import { GiBee } from "react-icons/gi";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="flex bg-white justify-between items-center px-6 py-3 shadow-sm border-b border-gray-200">
        <h1 className="text-[var(--color-primary)] text-2xl font-extrabold flex items-center gap-2">
          <GiBee className="text-4xl" />
          ChatBee
        </h1>
      </header>
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
