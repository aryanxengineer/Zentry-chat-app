import type { Request, Response, NextFunction } from "express";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { BadRequestException } from "@/utils/appError.js";

export const validateRegisterData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = registerSchema.safeParse(req.body);

  if (!result) {
    throw new BadRequestException("Invalid user data");
  }

  req.body = result.data;

  next();
};

export const validateLoginData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = loginSchema.safeParse(req.body);

  if (!result) {
    throw new BadRequestException("Invalid user data");
  }

  req.body = result.data;

  next();
};
