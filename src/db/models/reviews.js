import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Review = sequelize.define("review", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

//Review.sync({ force: true }); // This creates the table, dropping it first if it already existed
export default Review;
