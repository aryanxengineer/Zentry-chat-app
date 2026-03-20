import { asyncHandler } from "@/middleware/asyncHandler.middleware.js";
import type { AuthService } from "./auth.service.js";
import type { Request, Response } from "express";
import { clearJwtAuthCookie, setAuthCookie } from "@/utils/cookie.js";
import { HTTP_STATUS_CODES } from "@/config/httpCodes.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  public register = asyncHandler(async (req: Request, res: Response) => {
    const { user } = await this.authService.register(req.body);

    const userId = user.id as string;

    return setAuthCookie({
      res,
      userId,
    })
      .status(HTTP_STATUS_CODES.CREATED)
      .json({
        success: true,
        message: "User created successfully",
        user,
      });
  });

  public login = asyncHandler(async (req: Request, res: Response) => {
    const { user } = await this.authService.login(req.body);

    const userId = user.id as string;

    return setAuthCookie({
      res,
      userId,
    })
      .status(HTTP_STATUS_CODES.OK)
      .json({
        success: true,
        message: "User login successfully",
        user,
      });
  });

  public logout = asyncHandler(async (req: Response, res: Response) => {
    return clearJwtAuthCookie(res).status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: "Logout successfully",
    })
  })
}
