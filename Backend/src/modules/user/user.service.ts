import type { UserRepository } from "./user.repository.js";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  public getUsers = async (userId: string) => {
    const users = await this.userRepository.getUsers(userId);

    return users;
  };
}
