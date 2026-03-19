import { compareValue, hashValue } from "@/utils/bcrypt.js";

import { Schema, model } from "mongoose";
import type { IUser } from "./user.types.js";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    min: 2,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    select: false,
  },
  avatar: {
    type: String,
    default: null,
  },
  socketId: {
    type: String,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await hashValue(this.password);
  }
});

userSchema.methods.compareValue = async function (value: string) {
  return compareValue(value, this.password);
};

export const UserModel = model<IUser>("User", userSchema);
