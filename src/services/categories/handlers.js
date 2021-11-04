import models from "../../db/models/index.js";

const { Product, Review, User, Category, ProductCategory } = models;

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({ include: [Product] });
    res.send(categories);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createCategories = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.send(category);
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
  getAllCategories,
  createCategories,
  getCategoriesById,
  updateCategories,
  deleteCategories,
};

export default categoriesHandler;
