import Product from "./Products.js";
import Review from "./Reviews.js";
import User from "./Users.js";
import Category from "./Categorys.js";
import ProductCategory from "./ProductCategory.js";

User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

// manyToMany relation
Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false },
});
Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false },
});

export default { Product, Review, User, Category, ProductCategory };
