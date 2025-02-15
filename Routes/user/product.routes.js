const express = require("express");
const {
  getAllProducts,
  createProduct,
  getAllProductsByUserId,
  updateProductByUser,
} = require("../../Controller/users/product.controller");
const { authMiddleware } = require("../../Middleware/middleware");

const productRouter = express.Router();

productRouter.get("/user", authMiddleware, getAllProductsByUserId);
productRouter.post("/add", authMiddleware, createProduct);
productRouter.get("/", getAllProducts);
productRouter.put("/update", authMiddleware, updateProductByUser);

module.exports = productRouter;
