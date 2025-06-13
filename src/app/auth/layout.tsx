// app/auth/layout.tsx
import React, { ReactNode } from 'react';
import { GiBee } from "react-icons/gi";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex bg-white justify-center py-4 shadow-md">
        <h1 className="text-[var(--color-primary)] text-4xl font-extrabold flex items-center gap-3">
          ChatBee <GiBee className="text-5xl" />
        </h1>
      </header>

      <main>{children}</main>
    </div>
  );
}
