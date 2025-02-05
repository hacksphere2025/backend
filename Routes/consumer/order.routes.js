const express = require("express");
const orderRouter = express.Router();

const orderController = require("../../Controller/consumer/order.controller");

orderRouter.post("/add", orderController.addOrderController);
orderRouter.get("/", orderController.getAllOrderController);
orderRouter.get("/buy", orderController.getAllOrdersByUserBuyController);
orderRouter.get("/sell", orderController.getAllOrdersByUserSellController);

module.exports = orderRouter;
