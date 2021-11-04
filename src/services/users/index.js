import express from "express";
import handler from "./handlers.js";

const router = express.Router();

router.route("/").get(handler.getAllUsers).post(handler.createUser);

router
  .route("/:id")
  .get(handler.getUserById)
  .put(handler.updateUser)
  .delete(handler.deleteUser);

export default router;
