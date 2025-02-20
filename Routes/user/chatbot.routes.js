const express = require("express");
const { authMiddleware } = require("../../Middleware/middleware");
const { queryChatbot } = require("../../Controller/users/chatbot.controller");

const chatBotRouter = express.Router();

chatBotRouter.post('/query', authMiddleware, queryChatbot);

module.exports = chatBotRouter
