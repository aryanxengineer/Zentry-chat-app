import type { Request, Response } from "express";
import type { UserService } from "./user.service.js";
import { asyncHandler } from "@/middleware/asyncHandler.middleware.js";
import { HTTP_STATUS_CODES } from "@/config/httpCodes.js";

export class UserController {
  constructor(private userService: UserService) {}

  getUsers = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const users = await this.userService.getUsers(userId);

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  });
}
