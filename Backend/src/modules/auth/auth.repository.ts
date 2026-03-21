import { UnauthorizedException } from "@/utils/appError.js";
import { UserModel } from "../user/user.model.js";
import type { loginSchemaType, RegisterSchemaType } from "./auth.schema.js";
import { compareValue, hashValue } from "@/utils/bcrypt.js";

export class AuthRepository {
  constructor() {}

  public register = async (data: RegisterSchemaType) => {
    const existingUser = await UserModel.findOne({ email: data.email });

    if (existingUser) {
      throw new UnauthorizedException("User already exists");
    }

    const newUser = new UserModel(data);

    await newUser.save();

    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
  };

  public login = async (data: loginSchemaType) => {
    const { email, password } = data;

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new UnauthorizedException();
    }

    const validPassword = await compareValue(password, existingUser.password);

    if (!validPassword) {
      throw new UnauthorizedException();
    }

    return {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    };
  };
}
