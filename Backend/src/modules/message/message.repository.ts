import { BadRequestException, NotFoundException } from "@/utils/appError.js";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

import { ChatModel } from "../chat/chat.model.js";
import { MessageModel } from "./message.model.js";

import type { SendMessageType } from "./message.schema.js";
import type mongoose from "mongoose";
import { emitLastMessageToParticipants, emitNewMessageToChatRoom } from "@/lib/socket.js";

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
        try {
          const uploadRes: UploadApiResponse =
            await cloudinary.uploader.upload(image);

          imageUrl = uploadRes.secure_url;
        } catch (error: any) {
          console.log(error.message);
        }
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

      
      chat.lastMessage = newMessage._id as mongoose.Types.ObjectId;
      await chat.save();

      //websocket emit the new Message to the chat room
      emitNewMessageToChatRoom(userId, chatId, newMessage);

      //websocket emit the lastmessage to members (personnal room user)
      const allParticipantIds = chat.participants.map((id) => id.toString());
      emitLastMessageToParticipants(allParticipantIds, chatId, newMessage);

      return { message: newMessage, chat };
    }
  };
}
