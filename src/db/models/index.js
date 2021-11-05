import Product from "./prodc.js";
import Review from "./rev.js";
import User from "./use.js";
import Category from "./cat.js";
import ProductCategory from "./procatgry.js";

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });

// manyToMany relation

Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false },
});
Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false },
});

export default { Product, Review, User, Category, ProductCategory };
