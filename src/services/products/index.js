import express from "express";
import productHandler from "./handlers.js";

const router = express.Router();

router
  .route("/")
  .get(productHandler.getAllProducts)
  .post(productHandler.createproduct);

router
  .route("/:id")
  .get(productHandler.getProductById)
  .put(productHandler.updateProduct)
  .delete(productHandler.deleteProduct);

export default router;
