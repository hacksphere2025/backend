const express = require("express");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const categoryRouter = require("./category.routes");
const productRouter = require("./product.routes");

const router = express.Router();

router.use(authRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);

module.exports = router;
