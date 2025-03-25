import { FastifyInstanceTypeBox } from "../../types/fastify.types";
import {
  createUserHandler,
  listUsersHandler,
  updateUserHandler,
} from "./user.controller";
import {
  createUserSchema,
  getUsersSchema,
  updateUserSchema,
} from "./user.schema";

export default async function userRoutes(fastify: FastifyInstanceTypeBox) {
  fastify.post("/users", { schema: createUserSchema }, createUserHandler);
  fastify.get("/users", { schema: getUsersSchema }, listUsersHandler);
  fastify.put("/users/:id", { schema: updateUserSchema }, updateUserHandler);
}
