import models from "../../db/models/index.js";
import sequelize from "sequelize";
const { Op } = sequelize;

const { Product, Review, User, Category, ProductCategory } = models;

const getAllProducts = async (req, res, next) => {
  try {
    // **********************  (Opt 1-)  **********************
    /* 

    const products = await Product.findAll({
      include: [Review, { model: Category, through: { attributes: [] } }],
      order: [["createdAt", "DESC"]],
    });
    res.send(products);

 */
    // **********************  (Opt 2-)  **********************
    /* 

    const products = await Product.findAndCountAll({
      include: [
        {
          model: Category,
          // {{localUrl}}/products?category=mr
          where: req.query.category
          ? {
            name: { [Op.iLike]: `%${req.query.category}%` },
          }
          : {},
          through: { attributes: [] },
        },
        Review,
      ],
      
      // {{localUrl}}/products?search=mr
      where: req.query.search
      ? {
        [Op.or]: [
          { name: { [Op.iLike]: `%${req.query.search}%` } },
          { brand: { [Op.iLike]: `%${req.query.search}%` } },
        ],
      }
      : {},
      
      order: [["createdAt", "DESC"]],
      limit: req.query.size,
      offset: parseInt(req.query.size * req.query.page),
    });
    
    res.send({
      data: products.rows,
      total: products.count,
      pages: Math.ceil(articles.count / req.query.size),
    }); 

    */
    // **********************  (Opt 3-)  ********************** by a specific field
    /* 
    const products = await Product.findAndCountAll({
      include: [Review, { model: Category, through: { attributes: [] } }],
      where: {
        ...(req.query.name && {
          name: {
            [Op.iLike]: `%${req.query.name}%`,
          },
        }),
      },
      // limit: 2,
      // offset: 2,
    }).then((products) => {
      res.send({
        products: products.rows,
        total: products.count,
        // pages: Math.ceil(products.count / 2),
      });
    }); 
    */

    // **********************  (Opt 4-)  ********************** search by multiple fields
    const products = await Product.findAndCountAll({
      include: [Review, { model: Category, through: { attributes: [] } }],
      where: {
        ...(req.query.search && {
          [Op.or]: [
            { name: { [Op.iLike]: `%${req.query.search}%` } },
            { brand: { [Op.iLike]: `%${req.query.search}%` } },
          ],
        }),
      },
      // limit: 2,
      // offset: 2,
    }).then((products) => {
      res.send({
        products: products.rows,
        total: products.count,
        // pages: Math.ceil(products.count / 2),
      });
    });
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
    // delete req.body.id; //this is deleting the field that should not be updated by the user
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

// ---------PRODUCT CATEGORIES ENDPOINTS---------

//{{localUrl}}/products/removeCategory
const deleteProductCategory = async (req, res, next) => {
  try {
    const { categories, productId } = req.body;

    await ProductCategory.destroy({
      where: { productId: productId, categoryId: categories },
    });

    res.send({ ProductCategory });
  } catch (error) {
    console.log(error);
  }
};

const addCetegoryToProducts = async (req, res, next) => {
  const { categories, productId } = req.body;

  const valuesTo = categories.map((category) => ({
    categoryId: category,
    productId: productId,
  }));

  await ProductCategory.bulkCreate(valuesTo);

  const data = await Product.findOne({
    where: { id: req.body.productId },
    include: [Review, { model: Category, through: { attributes: [] } }],
  });

  res.send(data);
};

const productHandler = {
  getAllProducts,
  createproduct,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteProductCategory,
  addCetegoryToProducts,
};

export default productHandler;
