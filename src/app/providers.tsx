"use client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
    </SessionProvider>
  );
}
