import type { Request, Response } from "express";
import type { MessageService } from "./message.service.js";

import { asyncHandler } from "@/middleware/asyncHandler.middleware.js";
import { HTTP_STATUS_CODES } from "@/config/httpCodes.js";
import { sendMessageSchema } from "./message.schema.js";

export class MessageController {
  constructor(private messageService: MessageService) {}

  sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const body = sendMessageSchema.parse(req.body);

    const result = await this.messageService.sendMessage(userId, body);

    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: "Message sent successfully",
      data: result,
    });
  });
}
