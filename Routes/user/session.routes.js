const express = require("express");
const { authMiddleware } = require("../../Middleware/middleware");
const sessionRouter = express.Router();
const sessionController = require("../../Controller/users/session.controller");

sessionRouter.post("/message", authMiddleware, sessionController.addMessage);
sessionRouter.post("/", authMiddleware, sessionController.createNewSession);
sessionRouter.get(
  "/:id",
  authMiddleware,
  sessionController.getMessagesBySessionId,
);

module.exports = sessionRouter;
