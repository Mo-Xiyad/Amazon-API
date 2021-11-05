import sequelize from "../index.js";
import s from "sequelize";

const { DataTypes } = s;

const User = sequelize.define("user", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,

    validate: {
      isEmail: true,
    },
  },
});

//User.sync({ force: true }); // This creates the table, dropping it first if it already existed

export default User;
