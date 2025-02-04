const express = require("express");
const authRouter = require("./auth/auth.routes");
const userRouter = require("./user.routes");
const categoryRouter = require("./common/category.routes");
const producerRouter = require("./producer/index.route");
const router = express.Router();
const locationRouter = require("./common/location.routes");
const cartRouter = require("./common/cart.routes");

router.use("/auth", authRouter);
router.use("/cart", cartRouter);
router.use("/location", locationRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/producer", producerRouter);
module.exports = router;
