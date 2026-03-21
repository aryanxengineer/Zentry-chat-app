import { compare, hash } from "bcrypt";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

export const hashValue = async (value: string): Promise<string> => {
  if (!value) throw new Error("Value is required");

  try {
    return await hash(value, SALT_ROUNDS);
  } catch {
    throw new Error("Hashing failed");
  }
};

export const compareValue = async (
  value: string,
  hashedValue: string,
): Promise<boolean> => {
  if (!value || !hashedValue) {
    throw new Error("Invalid input for comparison");
  }

  try {
    return await compare(value, hashedValue);
  } catch {
    throw new Error("Comparison failed");
  }
};