import { Router } from "express";
import { MessageRepository } from "./message.repository.js";
import { MessageService } from "./message.service.js";
import { MessageController } from "./message.controller.js";
import { passportAuthenticateJwt } from "@/config/passport.js";

const messageRouter = Router();

const messageRepository = new MessageRepository();
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(messageService);

messageRouter.use(passportAuthenticateJwt);

console.log('yaha tak request aayi hai ')
messageRouter.post("/send", messageController.sendMessage);

export default messageRouter;
