const express = require("express");
const {
  createCart,
  getAllCart,
  getAllCartByUser,
} = require("../../Controller/users/cart.controller");
const { authMiddleware } = require("../../Middleware/middleware");

const categoryRouter = express.Router();

categoryRouter.post("/add", authMiddleware, createCart);
categoryRouter.get("/", getAllCart);
categoryRouter.get("/user", authMiddleware, getAllCartByUser);

module.exports = categoryRouter;
