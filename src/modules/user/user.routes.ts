import { FastifyInstanceTypeBox } from "../../types/fastify.types";
import { createUserHandler } from "./user.controller";
import { createUserSchema } from "./user.schema";

export default async function userRoutes(fastify: FastifyInstanceTypeBox) {
  fastify.post("/users", { schema: createUserSchema }, createUserHandler);
}
