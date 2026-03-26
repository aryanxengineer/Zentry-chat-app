import cors from "cors";
import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import passport from "passport";

import "@config/passport.js";

// security
import globalRateLimit from "@middleware/rateLimit.middleware.js";
import corsMiddleware from "@middleware/cors.middleware.js";

// routes
import indexRouter from "@routes/index.routes.js";

// app server
const app: Express = express();

// parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());
app.use(passport.initialize());

// security middlewares
corsMiddleware(app);
globalRateLimit(app);

// routes group
app.use("/api/v1", indexRouter);

export default app;
