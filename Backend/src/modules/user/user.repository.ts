import { UserModel } from "./user.model.js";

export class UserRepository {
  constructor() {}

  public getUsers = async (userId: string) => {
    const users = await UserModel.find({ _id: { $ne: userId } }).select("-password");
    return users;
  };
}
