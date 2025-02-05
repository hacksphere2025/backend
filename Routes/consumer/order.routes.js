const express = require("express");
const orderRouter = express.Router();

const orderController = require("../../Controller/consumer/order.controller");

orderRouter.post("/add", orderController.addOrder);
orderRouter.get("/", orderController.getAllOrder);
orderRouter.get("/buy", orderController.getAllOrdersByUserBuy);
orderRouter.get("/sell", orderController.getAllOrdersByUserSell);

module.exports = orderRouter;
