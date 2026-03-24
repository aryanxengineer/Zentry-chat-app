import { BadRequestException, NotFoundException } from "@/utils/appError.js";
import { UserModel } from "../user/user.model.js";
import { ChatModel } from "./chat.model.js";
import type { CreateChatSchemaType } from "./chat.schema.js";
import { MessageModel } from "../message/message.model.js";

export class ChatRepository {
  constructor() {}

  public createChat = async (
    userId: string,
    chatData: CreateChatSchemaType,
  ) => {
    const { participantId, participants, isGroup, groupName } = chatData;

    let chat;
    let allParticipantIds: string[] = [];

    if (isGroup && participants?.length && groupName) {
      allParticipantIds = [userId, ...participants];

      chat = await ChatModel.create({
        participants: allParticipantIds,
        isGroup: true,
        groupName,
        createdBy: userId,
      });

      return chat;
    } else if (participantId) {
      const otherUser = await UserModel.findById(participantId);
      if (!otherUser) {
        throw new NotFoundException("Your partner not found");
      }

      if (typeof participantId === "string") {
        allParticipantIds = [userId, participantId];
      }

      const existingChat = await ChatModel.findOne({
        participants: {
          $all: allParticipantIds,
          $size: 2,
        },
      }).populate("participants", "name avatar");

      if (existingChat) return existingChat;

      chat = await ChatModel.create({
        participants: allParticipantIds,
        createdBy: userId,
      });
    }
    // Implement webSocket

    console.log("printing my chat data", chat);

    return chat;
  };

  public getUserChats = async (userId: string) => {
    const chats = await ChatModel.find({
      participants: {
        $in: [userId],
      },
    })
      .populate("participants", "name avatar")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "name avatar",
        },
      })
      .sort({ upadatedAt: -1 });

    return chats;
  };

  public getSingleChat = async (chatId: string, userId: string) => {
    const chat = ChatModel.findOne({
      _id: chatId,
      participants: {
        $in: [userId],
      },
    });

    if (!chat) {
      throw new BadRequestException(
        "Chat not found or you are not authorized to view this chat",
      );
    }

    const messages = await MessageModel.find({ chatId })
      .populate("sender", "name avatar")
      .populate({
        path: "replyTo",
        select: "content image sender",
        populate: {
          path: "sender",
          select: "name avatar",
        },
      })
      .sort({ createdAt: 1 });

    return { chat, messages };
  };
}
