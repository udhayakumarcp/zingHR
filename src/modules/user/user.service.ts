import User from "../../db/models/user";
import { encryptPassword } from "../../services/password.service";
import { createUserBody, updateUserBody, userQueryParams } from "./user.type";

export async function createUser(params: createUserBody): Promise<User> {
  const password = encryptPassword(params.password);
  return await User.create({ ...params, password });
}

export async function updateUser(
  params: userQueryParams,
  body: updateUserBody,
): Promise<User> {
  const password = encryptPassword(body.password);

  const [updatedCount, updatedUsers] = await User.update(
    { ...body, password },
    {
      where: { id: params.id },
      returning: ["id", "emp_code"],
    },
  );

  if (updatedCount === 0) {
    throw new Error("User not found or no changes made");
  }

  return updatedUsers[0];
}
