import { JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } from "@/config/env.js";
import type { Response } from "express";
import jwt from "jsonwebtoken";

type Time = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;

const COOKIE_NAME = "accessToken";

const convertToMs = (time: Time): number => {
  const value = Number(time.slice(0, -1));
  const unit = time.slice(-1);

  const map = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    y: 365 * 24 * 60 * 60 * 1000,
  };

  return value * map[unit as keyof typeof map];
};

export const setAuthCookie = (res: Response, userId: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  const expiresIn = (JWT_EXPIRES_IN as Time) || "15d";

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn,
  });

  res.cookie(COOKIE_NAME, token, {
    maxAge: convertToMs(expiresIn),
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
};

export const clearJwtAuthCookie = (res: Response) => {
  res.clearCookie(COOKIE_NAME);
};
