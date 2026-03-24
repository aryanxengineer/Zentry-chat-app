import { BadRequestException, NotFoundException } from "@/utils/appError.js";
import { ChatModel } from "../chat/chat.model.js";
import type { SendMessageType } from "./message.schema.js";
import { MessageModel } from "./message.model.js";

export class MessageRepository {
  constructor() {}

  sendMessage = async (userId: string, data: SendMessageType) => {
    const { chatId, content, image, replyToId } = data;

    const chat = await ChatModel.findOne({
      _id: chatId,
      participants: {
        $in: [userId],
      },
    });

    if (!chat) {
      throw new BadRequestException("Chat not found or unauthorized");
    }

    if (replyToId) {
      const replyMessage = await MessageModel.findOne({
        _id: replyToId,
        chatId,
      });

      if (!replyMessage) {
        throw new NotFoundException("Reply message not found");
      }

      let imageUrl;

      if (image) {
        // upload to cloudinary
      }

      const newMessage = await MessageModel.create({
        chatId,
        sender: userId,
        ...(content ? { content } : {}),
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(replyToId ? { replyTo: replyToId } : {}),
      });

      await newMessage.populate([
        { path: "sender", select: "name avatar" },
        {
          path: "replyTo",
          select: "content image sender",
          populate: {
            path: "sender",
            select: "name avatar",
          },
        },
      ]);

      // websocket

      return { message: newMessage, chat };
    }
  };
}
