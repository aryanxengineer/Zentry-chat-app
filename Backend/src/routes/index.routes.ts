import { Router } from "express";

import authRouter from "@/modules/auth/auth.routes.js";
import chatRouter from "@/modules/chat/chat.routes.js";
import userRouter from "@/modules/user/user.routes.js";
import messageRouter from "@/modules/message/message.routes.js";

const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/chats", chatRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/messages", messageRouter);

export default indexRouter;
