import { UnauthorizedException } from "@/utils/appError.js";
import { UserModel } from "../user/user.model.js";
import type { loginSchemaType, RegisterSchemaType } from "./auth.schema.js";
import { compareValue, hashValue } from "@/utils/bcrypt.js";

export class AuthRepository {
  constructor() {}

  public register = async (data: RegisterSchemaType) => {
    const { name, email, password, avatar } = data;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new UnauthorizedException("User already exists");
    }

    const hashedPassword = await hashValue(password);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    await newUser.save();

    return newUser;
  };

  public login = async (data: loginSchemaType) => {
    const { email, password } = data;

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new UnauthorizedException("Unauthorized access - email or password not found");
    }

    const validPassword = await compareValue(password, existingUser.password);

    if (!validPassword) {
      throw new UnauthorizedException("Unauthorized access - email or password not found");
    }

    return existingUser;
  };
}
