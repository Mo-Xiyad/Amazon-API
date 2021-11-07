import models from "../../db/models/index.js";

const { Product, Review, User, Category, ProductCategory, Cart } = models;

const userShoppingCart = async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.params.userid,
      },
    });

    res.send(cart);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addProductsTotheCart = async (req, res, next) => {
  try {
    const cart = await Cart.create({
      userId: req.params.userid,
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
  userShoppingCart,
  addProductsTotheCart,
  getCategoriesById,
  updateCategories,
  deleteCategories,
};

export default categoriesHandler;
