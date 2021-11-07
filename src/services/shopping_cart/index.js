import express from "express";
import handler from "./handlers.js";

const router = express.Router();

router
  .route("/:userId")
  .get(handler.getUserShoppingCart)
  .post(handler.addProductsTotheCart);

// router.route("/").get(handler.getAllCategories).post(handler.createCategories);

// router
//   .route("/:id")
//   .get(handler.getCategoriesById)
//   .put(handler.updateCategories)
//   .delete(handler.deleteCategories);

export default router;
