import Product from "./products.js";
import Review from "./reviews.js";
import User from "./users.js";
import Category from "./categories.js";
import ProductCategory from "./productCategory.js";
import Cart from "./cart.js";

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

// super manyTomany relation

Product.belongsToMany(User, {
  through: { model: Cart, unique: false },
});

User.belongsToMany(Product, {
  through: { model: Cart, unique: false },
});

Product.hasMany(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(Product, { onDelete: "CASCADE" });
User.hasMany(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(User, { onDelete: "CASCADE" });

export default { Product, Review, User, Category, ProductCategory, Cart };
