import models from "../../db/models/index.js";

const { Product, Review, User, Category, ProductCategory } = models;

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Review, { model: Category, through: { attributes: [] } }],
      order: [["createdAt", "DESC"]],
    });

    res.send(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createproduct = async (req, res, next) => {
  try {
    const { categories, ...rest } = req.body;

    const data = await Product.create(rest);

    const valuesTo = categories.map((category) => ({
      categoryId: category,
      productId: data.id,
    }));

    await ProductCategory.bulkCreate(valuesTo);

    // await ProductCategory.create({
    //   categoryId: req.body.categoryId,
    //   productId: data.id,
    // });

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
      include: [Review, { model: Category, through: { attributes: [] } }],
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

    // const { categories, ...rest } = req.body;

    // const data = await Product.update(rest);

    // const valuesTo = categories.map((category) => ({
    //   categoryId: category,
    //   productId: req.params.id,
    // }));

    // await ProductCategory.bulkCreate(valuesTo).then(() => {
    //   return ProductCategory.update(
    //     { isProduct: false },
    //     { where: { categoryId: id } }
    //   );
    // });

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
