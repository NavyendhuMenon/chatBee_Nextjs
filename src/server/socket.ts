import { Server as IOServer } from "socket.io";

import mongoose from "mongoose";
import {
  PrivateMessagePayload,
  GroupMessagePayload,
  TypingPayload,
  DeliveryPayload,
  SeenPayload,
} from "@/types/socket-events";

import Message from "@/models/Chat";

const onlineUsers = new Map<string, string>();

export const createSocketServer = (server: any) => {
  const io = new IOServer(server, {
    path: "/api/socket/io",
    addTrailingSlash: false,
    cors: { origin: "*" }, 
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected", socket.id);

    socket.on("register", (userId: string) => {
      onlineUsers.set(userId, socket.id);
      socket.data.userId = userId;
      console.log(`🟢 User ${userId} registered with socket ID ${socket.id}`);
    });

    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
      console.log(`${socket.data.userId || socket.id} joined room ${roomId}`);
    });

    socket.on("leave-room", (roomId: string) => {
      socket.leave(roomId);
      console.log(`${socket.data.userId || socket.id} left room ${roomId}`);
    });

  socket.on("private-message", async (data: PrivateMessagePayload) => {
  const { sender, receiver, message, chatId } = data;

  if (!sender || !receiver) {
    console.error("Missing sender or receiver in private message payload", data);
    return;
  }

  try {
    const newMessage = await Message.create({
      chatId,
      sender: new mongoose.Types.ObjectId(sender),
      receiver: new mongoose.Types.ObjectId(receiver),
      message,
      delivered: false,
      seen: false,
    });

    const toSocketId = onlineUsers.get(receiver);
    if (toSocketId) {
      io.to(toSocketId).emit("private-message", newMessage);
      await Message.findByIdAndUpdate(newMessage._id, { delivered: true });
    }
  } catch (error) {
    console.error("Error saving private message:", error);
  }
});



    socket.on("group-message", async (data: GroupMessagePayload) => {
      const { roomId, from, message } = data;
      try {
        const groupMessage = await Message.create({
          chatId: roomId,
          from,
          to: "group",
          message,
          delivered: true,
          seen: false,
        });

        io.to(roomId).emit("group-message", groupMessage);
      } catch (error) {
        console.error("Error saving group message:", error);
      }
    });

    socket.on("typing", (data: TypingPayload) => {
      const { to, isGroup, roomId } = data;
      if (isGroup && roomId) {
        socket
          .to(roomId)
          .emit("typing", { from: socket.data.userId || socket.id });
      } else if (to) {
        const toSocketId = onlineUsers.get(to);
        if (toSocketId) {
          io.to(toSocketId).emit("typing", {
            from: socket.data.userId || socket.id,
          });
        }
      }
    });

    socket.on("delivered", async (data: DeliveryPayload) => {
      const { to, messageId } = data;
      try {
        await Message.findByIdAndUpdate(messageId, { delivered: true });
        const toSocketId = onlineUsers.get(to);
        if (toSocketId) {
          io.to(toSocketId).emit("delivered", { messageId });
        }
      } catch (error) {
        console.error("Error updating delivered status:", error);
      }
    });

    socket.on("seen", async (data: SeenPayload) => {
      const { to, messageId } = data;
      try {
        await Message.findByIdAndUpdate(messageId, { seen: true });
        const toSocketId = onlineUsers.get(to);
        if (toSocketId) {
          io.to(toSocketId).emit("seen", { messageId });
        }
      } catch (error) {
        console.error("Error updating seen status:", error);
      }
    });

    socket.on("disconnect", () => {
      const userId = socket.data.userId;
      if (userId) {
        onlineUsers.delete(userId);
        console.log(`🔴 User ${userId} disconnected`);
      } else {
        console.log(`🔴 Unknown socket disconnected: ${socket.id}`);
      }
    });
  });

  return io;
};
