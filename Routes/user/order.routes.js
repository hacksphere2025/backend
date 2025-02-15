const express = require("express");
const { authMiddleware } = require("../../Middleware/middleware");

const orderRouter = express.Router();

const orderController = require("../../Controller/users/order.controller");
orderRouter.post("/add", authMiddleware, orderController.addOrderController);
orderRouter.get("/", authMiddleware, orderController.getAllOrderController);
orderRouter.get(
  "/buy",
  authMiddleware,
  orderController.getAllOrdersByUserBuyController
);
orderRouter.get(
  "/sell",
  authMiddleware,
  orderController.getAllOrdersByUserSellController
);
orderRouter.get("/buyAll", authMiddleware, orderController.orderAllItemByUser);
orderRouter.get(
  "/status/requested",
  authMiddleware,
  orderController.getAllOrderedStatusList
);
orderRouter.get(
  "/status/accepted",
  authMiddleware,
  orderController.getAllAcceptedStatusList
);
orderRouter.get(
  "/status/rejected",
  authMiddleware,
  orderController.getAllRejectedStatusList
);
orderRouter.get(
  "/status/delivered",
  authMiddleware,
  orderController.getAllDeliveredStatusList
);

orderRouter.put("/update", authMiddleware, orderController.changeTheStatus);
module.exports = orderRouter;
