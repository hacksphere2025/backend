const express = require("express");
const { authMiddleware } = require("../Middleware/middleware");
const { updateUserLocation } = require("../Controller/user/user.controller");

const userRouter = express.Router();

userRouter.put("/location", authMiddleware, updateUserLocation);

module.exports = userRouter;
