import { NextApiRequest } from "next";
import { Server } from "socket.io";
import {
  PrivateMessagePayload,
  GroupMessagePayload,
  TypingPayload,
  DeliveryPayload,
  SeenPayload,
} from "@/types/socket-events";

import Message from "@/models/Chat";
import { connectDB } from "@/lib/mongodb";

const onlineUsers = new Map<string, string>();

const ioHandler = async (req: NextApiRequest, res: any) => {
  await connectDB(); 

  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket/io",
      addTrailingSlash: false,
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("✅ User connected", socket.id);

      socket.on("register", (userId: string) => {
        onlineUsers.set(userId, socket.id);
        console.log(`🟢 User ${userId} registered with socket ID ${socket.id}`);
      });

      socket.on("private-message", async (data: PrivateMessagePayload) => {
        const { to, from, message, chatId } = data;
        const newMessage = await Message.create({
          chatId,
          from,
          to,
          message,
          delivered: false,
          seen: false,
        });

        const toSocketId = onlineUsers.get(to);
        if (toSocketId) {
          io.to(toSocketId).emit("private-message", newMessage);
          await Message.findByIdAndUpdate(newMessage._id, { delivered: true });
        }
      });

      socket.on("group-message", async (data: GroupMessagePayload) => {
        const { roomId, from, message } = data;
        const groupMessage = await Message.create({
          chatId: roomId,
          from,
          to: "group",
          message,
          delivered: true,
          seen: false,
        });

        io.to(roomId).emit("group-message", groupMessage);
      });

      socket.on("typing", (data: TypingPayload) => {
        const { to, isGroup, roomId } = data;
        if (isGroup && roomId) {
          socket.to(roomId).emit("typing", { from: socket.id });
        } else {
          const toSocketId = onlineUsers.get(to);
          if (toSocketId) {
            io.to(toSocketId).emit("typing", { from: socket.id });
          }
        }
      });

      socket.on("delivered", async (data: DeliveryPayload) => {
        const { to, messageId } = data;
        await Message.findByIdAndUpdate(messageId, { delivered: true });

        const toSocketId = onlineUsers.get(to);
        if (toSocketId) {
          io.to(toSocketId).emit("delivered", { messageId });
        }
      });

      socket.on("seen", async (data: SeenPayload) => {
        const { to, messageId } = data;
        await Message.findByIdAndUpdate(messageId, { seen: true });

        const toSocketId = onlineUsers.get(to);
        if (toSocketId) {
          io.to(toSocketId).emit("seen", { messageId });
        }
      });

      socket.on("disconnect", () => {
        for (const [userId, socketId] of onlineUsers.entries()) {
          if (socketId === socket.id) {
            onlineUsers.delete(userId);
            console.log(`🔴 User ${userId} disconnected`);
            break;
          }
        }
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
