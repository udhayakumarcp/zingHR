import {
  FastifyReplyTypeBox,
  FastifyRequestTypeBox,
} from "../../types/fastify.types";
import { createUserSchema, updateUserSchema } from "./user.schema";
import { createUser, updateUser } from "./user.service";

export async function createUserHandler(
  request: FastifyRequestTypeBox<typeof createUserSchema>,
  reply: FastifyReplyTypeBox<typeof createUserSchema>,
) {
  try {
    const { body } = request;
    const user = await createUser(body);
    reply.send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
}

export async function updateUserHandler(
  request: FastifyRequestTypeBox<typeof updateUserSchema>,
  reply: FastifyReplyTypeBox<typeof updateUserSchema>,
) {
  try {
    const { body, params } = request;
    const user = await updateUser(params, body);
    reply.send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
}
