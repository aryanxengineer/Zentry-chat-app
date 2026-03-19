import { JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } from "@/config/env.js";
import type { Response } from "express";
import jwt from "jsonwebtoken";

type Time = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;
type Cookie = {
  res: Response;
  userId: string;
};

export const setAuthCookie = ({ res, userId }: Cookie) => {
  const payload = userId;
  const expiresIn = JWT_EXPIRES_IN as Time;

  const token = jwt.sign(payload, JWT_SECRET as string, {
    audience: ["user"],
    expiresIn: expiresIn || "7d",
  });

  return res.cookie("accessToken", token, {
    maxAge: 7 * 24 * 60 * 1000,
    httpOnly: true,
    secure: NODE_ENV === "production" ? true : false,
    sameSite: NODE_ENV === "production" ? "strict" : "lax",
  });
};

export const clearJwtAuthCookie = (res: Response) =>
  res.clearCookie("accessToken", { path: "/" });
