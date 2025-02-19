const express = require("express");
const { authMiddleware } = require("../../Middleware/middleware");
const locationController = require("../../Controller/users/location.controller");

const locationsRouter = express.Router();

locationsRouter.post("/add", authMiddleware, locationController.createLocation);
locationsRouter.get("/", authMiddleware, locationController.getAllLocation);
locationsRouter.get("/id", authMiddleware, locationController.getLocationById);
locationsRouter.get(
  "/user",
  authMiddleware,
  locationController.getLocationByUserId,
);
locationsRouter.delete(
  "/",
  authMiddleware,
  locationController.deleteLocationById,
);

module.exports = locationsRouter;
