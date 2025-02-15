const { queryChatbot } = require("../../Controller/users/chatbot.controller");
const sessionRepository = require("../../Repository/users/session.repository");
const { AppError } = require("../../utils/error");
const { logger } = require("../../utils/logger");
const { GeneralResponse } = require("../../utils/response");

const addMessage = async (data, sessionId, userId, userType) => {
  try {
    await sessionRepository.addMessageBySessionId(data, sessionId);

    const chatbotResponse = await queryChatbot({
      query: data.message,
      userType: userType == "buyer" ? "Producer" : "Consumer",
      userId: userId,
    });

    await sessionRepository.addMessageBySessionId(
      {
        user: "bot",
        message: chatbotResponse.message,
        type: chatbotResponse.data.type,
        data: chatbotResponse.data.data,
      },
      sessionId,
    );

    return new GeneralResponse(true, chatbotResponse, 200, "Sucess");
  } catch (error) {
    logger.error(error);
    return new AppError(500, "Error during add Message");
  }
};

const createNewSession = async (data, userId, loginType) => {
  try {
    const sessionData = {
      title: data.title,
      type: loginType,
    };
    const sessionResponse = await sessionRepository.createSessionByUser(
      sessionData,
      userId,
    );
    return new GeneralResponse(
      true,
      sessionResponse,
      200,
      "Added Session Succesfully",
    );
  } catch (error) {
    console.log(error);
    return new AppError(500, "Error during add Session");
  }
};

const getAllSessionByUser = async (userId, type) => {
  try {
    const response = await sessionRepository.getAllSessionByUser(userId, type);
    console.log(response);
    return new GeneralResponse(
      true,
      response.session,
      200,
      "Get All Session By User Succesfully",
    );
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during get All Session By User");
  }
};

const getMessagesBySessionId = async (sessionId) => {
  try {
    const messages = await sessionRepository.getMessageListBySession(sessionId);
    console.log(messages);
    return new GeneralResponse(
      true,
      messages[0],
      200,
      "Get all messages by sessionId Sucess",
    );
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during get All Session By User");
  }
};

module.exports = {
  addMessage,
  createNewSession,
  getAllSessionByUser,
  getMessagesBySessionId,
};
