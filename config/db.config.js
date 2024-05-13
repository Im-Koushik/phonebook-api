import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("Failed to connect to DB", err);
  });

export default sequelize;
