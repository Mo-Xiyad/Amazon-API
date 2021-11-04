import models from "../../db/models/index.js";

const { Product, Review } = models;

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: Review });
    res.send(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createproduct = async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    // const data = await Product.findByPk(req.params.id);
    const data = await Product.findOne({
      where: { id: req.params.id },
      include: Review,
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    delete req.body.id; //this is deleting the field that should not be updated by the user
    const updatedProduct = await Product.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    res.send(updatedProduct[1][0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const data = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const productHandler = {
  getAllProducts,
  createproduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default productHandler;
