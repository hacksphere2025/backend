const express = require("express");
const authRouter = require("./auth/auth.routes");
const userRouter = require("./user/user.routes");
const categoryRouter = require("./user/category.routes");
const router = express.Router();
const locationRouter = require("./user/location.routes");
const cartRouter = require("./user/cart.routes");
const chatBotRouter = require("./user/chatbot.routes");
const orderRouter = require("./user/order.routes");
const productRouter = require("./user/product.routes");
const sessionRouter = require("./user/session.routes");

router.use("/auth", authRouter);
router.use("/order", orderRouter);
router.use("/cart", cartRouter);
router.use("/location", locationRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/chatbot", chatBotRouter);
router.use("/session", sessionRouter);

module.exports = router;
