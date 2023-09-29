import dotenv from "dotenv";
dotenv.config();

import sequelize from "./config/database";
import server from "./app";

const PORT = Number(process.env.PORT) || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    await server.listen({ port: PORT, host: "0.0.0.0" });
    server.cron.startAllJobs();
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
