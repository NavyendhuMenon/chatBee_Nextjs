import { useEffect } from "react";
import socket from "@/utils/socket";

export const useSocket = (userId: string | null | undefined) => {
  useEffect(() => {
    if (userId) {
      socket.connect();
      socket.emit("register", userId);
      return () => {
        socket.disconnect();
      };
    }
  }, [userId]);
};
