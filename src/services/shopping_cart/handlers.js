import models from "../../db/models/index.js";
import sequelize from "sequelize";

const { Product, Review, User, Category, ProductCategory, Cart } = models;

const getUserShoppingCart = async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.params.userId,
      },
      include: { model: Product, include: Category },
      attributes: [
        "productId",
        "id",
        // [sequelize.fn("COUNT", sequelize.col("cart.productId")), "qty"],
        // [sequelize.fn("SUM", sequelize.col("product.price")), "unitary_price"],
      ],

      // group: ["cart.id", "cart.productId", "product.id", "product.category.id"],
    });

    const totalQty = await Cart.count({
      where: {
        userId: req.params.userId,
      },
    });

    const totalPrice = await Cart.sum("product.price", {
      include: { model: Product, attributes: [] },
    });

    res.send({ cart, totalQty, totalPrice });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addProductsTotheCart = async (req, res, next) => {
  try {
    const cart = await Cart.create({
      userId: req.params.userId,
      productId: req.body.productId,
    });

    res.send({ cart });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCategoriesById = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCategories = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCategories = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const categoriesHandler = {
  getUserShoppingCart,
  addProductsTotheCart,
};

export default categoriesHandler;
