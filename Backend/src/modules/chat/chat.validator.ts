import type { Request, Response, NextFunction } from "express";
import { BadRequestException } from "@/utils/appError.js";
import { createChatSchema } from "./chat.schema.js";

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