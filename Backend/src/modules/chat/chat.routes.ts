import { Router } from "express";
import { ChatRepository } from "./chat.repository.js";
import { ChatService } from "./chat.service.js";
import { ChatController } from "./chat.controller.js";
import { passportAuthenticateJwt } from "@/config/passport.js";

const chatRouter = Router();

const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);

chatRouter.use(passportAuthenticateJwt);

chatRouter.post("/new-chat", chatController.createChat);
chatRouter.get("/", chatController.getUserChats);
chatRouter.get("/:chatId", chatController.getSingleChat);

export default chatRouter;
