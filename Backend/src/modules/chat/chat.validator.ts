import type { Request, Response, NextFunction } from "express";
import { BadRequestException } from "@/utils/appError.js";
import { createChatSchema } from "./chat.schema.js";
import { ChatModel } from "./chat.model.js";

export const validateCreateChatSchema = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = createChatSchema.safeParse(req.body);

  if (!result) {
    throw new BadRequestException("Invalid user data");
  }

  req.body = result.data;

  next();
};

export const validateChatParticipant = async (chatId: string, userId: string) => {
  const chat = await ChatModel.findOne({
    _id: chatId,
    participants: {
      $in: [userId],
    },
  });
  if (!chat) throw new BadRequestException("User not a participant in chat");
  return chat;
};
