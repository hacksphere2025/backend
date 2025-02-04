const express = require("express");
const { authMiddleware } = require("../../Middleware/middleware");
const {
  createLocationController,
  getAllLocationController,
  getLocationByIdController,
} = require("../../Controller/common/location.controller");

const locationsRouter = express.Router();

locationsRouter.post("/add", authMiddleware, createLocationController);
locationsRouter.get("/", authMiddleware, getAllLocationController);
locationsRouter.get("/id", authMiddleware, getLocationByIdController);

module.exports = locationsRouter;
