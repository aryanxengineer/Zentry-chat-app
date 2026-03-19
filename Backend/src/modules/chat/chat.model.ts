import { Schema, model } from "mongoose";
import type { IChat } from "./chat.types.js";

const chatSchema: Schema<IChat> = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const ChatModel = model<IChat>("Chat", chatSchema);