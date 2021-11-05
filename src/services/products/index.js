import express from "express";
import handler from "./handlers.js";

const router = express.Router();

router.route("/").get(handler.getAllProducts).post(handler.createproduct);

router.route("/removeCategory").delete(handler.deleteProductCategory);

router
  .route("/:id")
  .get(handler.getProductById)
  .put(handler.updateProduct)
  .delete(handler.deleteProduct);

export default router;
