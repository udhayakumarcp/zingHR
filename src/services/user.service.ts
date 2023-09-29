import User from "../models/user";

export async function createUser(params: any): Promise<User> {
  try {
    const user = await User.create(params);
    return user;
  } catch (error) {
    throw new Error("Error creating user");
  }
}
