import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import { createSocketServer } from "@/server/socket";

const ioHandler = async (
  req: NextApiRequest,
  res: NextApiResponse & { socket: any }
) => {
  try {
    await connectDB();
  } catch (error) {
    console.error("DB connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
    return;
  }

  if (!res.socket.server.io) {
    const io = createSocketServer(res.socket.server);
    res.socket.server.io = io;
    console.log("Socket.IO server initialized");
  } else {
    console.log("Socket.IO server already running");
  }

  res.end();
};

export default ioHandler;
