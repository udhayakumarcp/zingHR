import { Sequelize } from "sequelize";

const dbConnectionUrl = process.env.DATABASE_URL || "";

const sequelize = new Sequelize(dbConnectionUrl);

export default sequelize;
