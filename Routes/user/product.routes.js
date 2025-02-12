const express = require("express");
const {
  getAllProducts,
  createProduct,
  getAllProductsByUserId,
} = require("../../Controller/users/product.controller");
const { authMiddleware } = require("../../Middleware/middleware");

const productRouter = express.Router();

productRouter.get("/user", authMiddleware, getAllProductsByUserId);
productRouter.post("/add", authMiddleware, createProduct);
productRouter.get("/", getAllProducts);

module.exports = productRouter;
