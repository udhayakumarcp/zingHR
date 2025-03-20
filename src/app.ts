import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Fastify from "fastify";
import fastifyCron from "fastify-cron";
import userRoutes from "./modules/user/user.routes";
import { punchInOutAll } from "./services/punch-in-out.service";

const server = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifyCron, {
  jobs: [
    {
      cronTime: "50 09,18 * * 1-5",
      onTick: punchInOutAll,
      runOnInit: true,
    },
  ],
});

server.register(userRoutes);

export default server;
