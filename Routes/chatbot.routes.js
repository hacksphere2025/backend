const express = require("express");
const { authMiddleware } = require("../Middleware/middleware");
const { queryChatbot } = require("../Controller/common/chatbot.controller");

const chatBotRouter = express.Router();

chatBotRouter.get('/query', authMiddleware, queryChatbot);

module.exports = chatBotRouter
