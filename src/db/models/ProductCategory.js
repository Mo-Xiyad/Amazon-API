import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const ProductCategory = sequelize.define(
  "productCategory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { timestamps: false }
);

ProductCategory.sync({ force: true }); // This creates the table, dropping it first if it already existed
export default ProductCategory;
