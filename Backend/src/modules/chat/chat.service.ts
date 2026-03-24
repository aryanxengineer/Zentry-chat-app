import type { ChatRepository } from "./chat.repository.js";
import type { CreateChatSchemaType } from "./chat.schema.js";

export class ChatService {
  constructor(private chatRepository: ChatRepository) {}

  public createChat = async (userId : string, chatData : CreateChatSchemaType) => {
    const chat = await this.chatRepository.createChat(userId, chatData);
    return chat;
  };

  public getUserChats = async(userId: string) => {
   return await this.chatRepository.getUserChats(userId); 
  }

  public getSingleChat = async(id: string, userId: string) => {
   return await this.chatRepository.getSingleChat(id, userId); 
  }

}
