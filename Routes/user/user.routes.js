const express = require("express");
const { authMiddleware } = require("../../Middleware/middleware");
const { updateUserLocation, getUserDetails } = require("../../Controller/users/user.controller");

const userRouter = express.Router();

userRouter.put("/location", authMiddleware, updateUserLocation);
userRouter.get("/", authMiddleware, getUserDetails);

module.exports = userRouter;
