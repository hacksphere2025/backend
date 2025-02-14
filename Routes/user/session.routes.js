const express = require("express");
const { authMiddleware } = require("../../Middleware/middleware");
const sessionRouter = express.Router();
const sessionController = require("../../Controller/users/session.controller");

sessionRouter.post("/add", authMiddleware, sessionController.addMessage);
sessionRouter.post("/", authMiddleware, sessionController.createNewSession);
sessionRouter.get(
  "/user",
  authMiddleware,
  sessionController.getAllSessionByUser
);

module.exports = sessionRouter;
