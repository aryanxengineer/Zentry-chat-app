import type { AuthService } from "./auth.service.js";
import type { Request, Response } from "express";

import { clearJwtAuthCookie, setAuthCookie } from "@/utils/cookie.js";
import { HTTP_STATUS_CODES } from "@/config/httpCodes.js";
import { asyncHandler } from "@/middleware/asyncHandler.middleware.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  public register = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.authService.register(req.body);

    const userId = user.id as unknown as string;

    setAuthCookie(res, userId);

    return res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  });

  public login = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.authService.login(req.body);

    const userId = user.id as unknown as string;

    setAuthCookie(res, userId);
    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: "User login successfully",
      data: user,
    });
  });

  public logout = asyncHandler(async (req: Response, res: Response) => {
    clearJwtAuthCookie(res);

    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: "Logout successfully",
    });
  });

  // public authStatus = asyncHandler(async (req: Response, res: Response) => {
  //   const user = req.user;

  //   return res.status(HTTP_STATUS_CODES.OK).json({
  //     success: true,
  //     message: "Authenticated user",
  //     user,
  //   });
  // });
}
