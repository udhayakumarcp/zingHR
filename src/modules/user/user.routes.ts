import { FastifyInstanceTypeBox } from "../../types/fastify.types";
import { createUserHandler, updateUserHandler } from "./user.controller";
import { createUserSchema, updateUserSchema } from "./user.schema";

export default async function userRoutes(fastify: FastifyInstanceTypeBox) {
  fastify.post("/users", { schema: createUserSchema }, createUserHandler);
  fastify.put("/users/:id", { schema: updateUserSchema }, updateUserHandler);
}
