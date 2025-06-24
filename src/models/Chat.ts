import mongoose, { Document, Schema } from "mongoose";

export interface IChat extends Document {
  chatId: string;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  message: string;
  delivered: boolean;
  seen: boolean;
  createdAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    chatId: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    delivered: { type: Boolean, default: false },
    seen: { type: Boolean, default: false },
  },

  { timestamps: true }
);

export default mongoose.models.Chat ||
  mongoose.model<IChat>("Chat", ChatSchema);
