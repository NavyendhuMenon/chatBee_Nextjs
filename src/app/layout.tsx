import "./globals.css";
import type { Metadata } from "next";

// import Providers from "./providers";

import Providers from "./SessionProv";

import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "ChatBee",
  description: "chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-200">
        <Providers>{children}</Providers>{" "}
      </body>
    </html>
  );
}
