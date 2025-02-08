const express = require("express");
const { authMiddleware } = require("../../Middleware/middleware");
const {
  addOrderController,
  getAllOrderController,
  getAllOrdersByUserBuyController,
  getAllOrdersByUserSellController,
} = require("../../Controller/users/order.controller");

const orderRouter = express.Router();

orderRouter.post("/add", authMiddleware, addOrderController);
orderRouter.get("/", authMiddleware, getAllOrderController);
orderRouter.get("/buy", authMiddleware, getAllOrdersByUserBuyController);
orderRouter.get("/sell", authMiddleware, getAllOrdersByUserSellController);

module.exports = orderRouter;
