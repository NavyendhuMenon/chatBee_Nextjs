"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface ProvidersProps {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};
