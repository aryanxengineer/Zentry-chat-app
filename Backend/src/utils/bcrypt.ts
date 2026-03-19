import { compare, hash } from "bcrypt";

export const hashValue = async (
  value: string,
  salt: number = 10,
): Promise<string> => {
  return await hash(value, salt);
};

export const compareValue = async (
  value: string,
  hashedValue: string,
): Promise<boolean> => {
  return await compare(value, hashedValue);
};
