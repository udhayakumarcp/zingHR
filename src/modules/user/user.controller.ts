import {
  FastifyReplyTypeBox,
  FastifyRequestTypeBox,
} from "../../types/fastify.types";
import { createUserSchema } from "./user.schema";
import { createUser } from "./user.service";

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
