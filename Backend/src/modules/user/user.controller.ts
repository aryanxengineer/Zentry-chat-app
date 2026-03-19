import type { Request, Response } from "express";
import type { UserService } from "./user.service.js";

export class UserController {
  constructor(userService: UserService) {}

  getUserMe = (req: Request, res: Response) => {
    
  };
}
