const express = require("express");
const {
  createCart,
  getAllCart,
  getAllCartByEmailId,
} = require("../../Controller/consumer/cart.controller");
const { authMiddleware } = require("../../Middleware/middleware");

const categoryRouter = express.Router();

categoryRouter.post("/add", authMiddleware, createCart);
categoryRouter.get("/", getAllCart);
categoryRouter.get("/id", getAllCartByEmailId);

module.exports = categoryRouter;
