import User from "../../db/models/user";
import { createUserBody } from "./user.type";

export async function createUser(params: createUserBody): Promise<User> {
  return await User.create(params);
}
