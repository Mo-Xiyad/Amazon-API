import { Sequelize } from "sequelize";

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
});

export const testConnetion = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("✅ Connection established with database");
  } catch (error) {
    console.log(error);
  }
};

export const connetDB = async () => {
  try {
    await sequelize.sync({ force: true, logging: false });
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
