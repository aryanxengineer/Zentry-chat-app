import type { AuthRepository } from "./auth.repository.js";
import type { loginSchemaType, RegisterSchemaType } from "./auth.schema.js";

export class AuthService {
  constructor(private authRepo: AuthRepository) {}

  public register = async(data : RegisterSchemaType) => {
    const user = await this.authRepo.register(data);

    return { user };
  };

  public login = async(data : loginSchemaType) => {
    const user = await this.authRepo.login(data);

    return { user };
  };
}
