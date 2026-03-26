import type { MessageRepository } from "./message.repository.js";
import type { SendMessageType } from "./message.schema.js";

export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  sendMessage = async (userId: string, data: SendMessageType) => {
    const sendMessage = await this.messageRepository.sendMessage(userId, data);

    return sendMessage;
  };
}
