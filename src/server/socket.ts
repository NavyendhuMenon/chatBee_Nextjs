import { Server as IOServer } from "socket.io";
import mongoose from "mongoose";
import Message from "@/models/Chat";
import {
  PrivateMessagePayload,
  GroupMessagePayload,
  TypingPayload,
  DeliveryPayload,
  SeenPayload,
} from "@/types/socket-events";

const onlineUsers = new Map<string, string>();

export const createSocketServer = (server: any) => {
  const io = new IOServer(server, {
    path: "/api/socket/io",
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🔗 New connection", socket.id);

    socket.on("register", (userId: string) => {
      onlineUsers.set(userId, socket.id);
      socket.data.userId = userId;
    });

    socket.on("private-message", async (data: PrivateMessagePayload) => {
      try {
        const msg = await Message.create({
          chatId: data.chatId,
          sender: new mongoose.Types.ObjectId(data.sender),
          receiver: new mongoose.Types.ObjectId(data.receiver),
          message: data.message,
          delivered: false,
          seen: false,
        });

        const receiverSocket = onlineUsers.get(data.receiver);
        if (receiverSocket) {
          io.to(receiverSocket).emit("private-message", msg);
          await Message.findByIdAndUpdate(msg._id, { delivered: true });
        }
      } catch (err) {
        console.error("Message error:", err);
      }
    });

    socket.on("disconnect", () => {
      const uid = socket.data.userId;
      if (uid) onlineUsers.delete(uid);
    });
  });

  return io;
};
