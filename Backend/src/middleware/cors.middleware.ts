import { type Express } from "express";

import cors from "cors";

const corsMiddleware = (app: Express) => {
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );
};

export default corsMiddleware;
