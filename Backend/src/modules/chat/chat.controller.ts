import type { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.middleware.js";
import { HTTP_STATUS_CODES } from "@/config/httpCodes.js";
import type { ChatService } from "./chat.service.js";
import { chatIdSchema, createChatSchema } from "./chat.schema.js";

export class ChatController {
  constructor(private chatService: ChatService) {}

  createChat = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const userChat = createChatSchema.safeParse(req.body);

    if (!userChat.data) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "Send correct chat data",
      });
    }

    const chat = await this.chatService.createChat(userId, userChat.data);

    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: "Chat created successfully",
      data: chat,
    });
  });

  getUserChats = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const chats = await this.chatService.getUserChats(userId);

    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: "User chats created successfully",
      data: chats,
    });
  });

  getSingleChat = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { chatId } = chatIdSchema.parse(req.params);

    const { chat, messages } = await this.chatService.getSingleChat(
      chatId,
      userId,
    );

    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: "User chats created successfully",
      chat,
      messages,
    });
  });
}
