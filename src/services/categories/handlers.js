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
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          as: "products",
          // attributes: [
          //   "name",
          //   "description",
          //   "brand",
          //   "price",
          //   "imageUrl",
          // ],
          through: { attributes: [] },
        },
      ],
    });
    console.log(category);
    res.send(category);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCategories = async (req, res, next) => {
  try {
    const currentCetegory = await Category.findByPk(req.params.id);
    const newCategory = await Category.findOne({
      where: { id: req.params.id },
      returning: true,
    }).then((category) => {
      if (!category) {
        throw new Error("category not found");
      }
      const { name, isProduct } = req.body;
      category
        .update({ name, isProduct, ...currentCetegory })
        .then(res.send(category));
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCategories = async (req, res, next) => {
  try {
    const category = await Category.destroy({ where: { id: req.params.id } });
    res.send({ category });
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
