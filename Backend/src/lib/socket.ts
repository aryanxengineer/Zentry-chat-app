import { JWT_SECRET } from "@/config/env.js";
import { Server as HTTPServer } from "http";
import { Server, type Socket } from "socket.io";

import jwt from "jsonwebtoken";

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

let io: Server | null = null;

const initializeSocket = (httpServer: HTTPServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const rawCookie = socket.handshake.headers.cookie;

      if (!rawCookie) {
        return next(new Error("Unauthorized"));
      }

      const token = rawCookie?.split("=")?.[1]?.trim();

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decodedToken = jwt.verify(token, JWT_SECRET as string) as {
        userId: string;
      };

      if (!decodedToken) {
        return next(new Error("Unauthorized"));
      }

      socket.userId = decodedToken.userId;

      next();

    } catch (error) {
        next(new Error("Internal Server Error"));
    }
  });
};

export default initializeSocket;
