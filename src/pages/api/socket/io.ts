import type { NextApiRequest, NextApiResponse } from "next";
import { Server as HTTPServer } from "http";
import { Socket as NetSocket } from "net";
import { Server as IOServer } from "socket.io";
import { createSocketServer } from "@/server/socket";
import { connectDB } from "@/lib/mongodb";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: NetSocket & { server: HTTPServer & { io?: IOServer } };
};

const ioHandler = async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log("🔌 Initializing Socket.IO server...");
    await connectDB();
    const io = createSocketServer(res.socket.server);
    res.socket.server.io = io;
  } else {
    console.log("✅ Socket.IO already running");
  }

  res.end();
};

export default ioHandler;
