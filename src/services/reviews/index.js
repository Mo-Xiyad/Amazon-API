import express from "express";
import handler from "./handlers.js";

const router = express.Router();

router.route("/").get(handler.getAllReviews).post(handler.createReview);

router
  .route("/:id")
  .get(handler.getReviewById)
  .put(handler.updateReviewById)
  .delete(handler.deleteReviewById);

export default router;
