import type { Request, Response, NextFunction } from "express";
import { registerSchema } from "./auth.schema.js";
import { BadRequestException } from "@/utils/appError.js";

export const validateRegisterData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = registerSchema.safeParse(req.body);

  if (!data) {
    throw new BadRequestException();
  }

  req.body = data;

  next();
};
