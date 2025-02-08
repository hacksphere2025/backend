const express = require("express");
const { getAllProducts, createProduct, getAllProductsByEmailId } = require("../../Controller/users/product.controller");
const { authMiddleware } = require("../../Middleware/middleware");

const productRouter = express.Router();

productRouter.get('/user', authMiddleware, getAllProductsByEmailId)
productRouter.post('/add', authMiddleware, createProduct);
productRouter.get('/', getAllProducts);

module.exports = productRouter
