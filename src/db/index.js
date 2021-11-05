import { Sequelize } from "sequelize";

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT, NODE_ENV } =
  process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
  ...(NODE_ENV === "production" && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }),
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
    await sequelize.sync({ force: false, logging: false });
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
