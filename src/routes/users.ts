import { FastifyInstance } from "fastify";
import { createUser } from "../services/user.service";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: { emp_code: number; password: string } }>(
    "/users",
    async (request, reply) => {
      try {
        const user = await createUser(request.body);
        reply.status(201).send(user);
        return user;
      } catch (error) {
        reply.status(500).send(error);
      }
    },
  );
}
