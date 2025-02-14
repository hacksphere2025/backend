const sessionRepository = require("../../Repository/users/session.repository");
const { AppError } = require("../../utils/error");
const { logger } = require("../../utils/logger");
const { GeneralResponse } = require("../../utils/response");

const addMessage = async (data, sessionId) => {
  try {
    const response = await sessionRepository.addMessage(data);
    const pushService = await sessionRepository.pushMessageIdToSessionModel(
      response._id,
      sessionId
    );
    console.log(pushService);
    return new GeneralResponse(
      true,
      response,
      200,
      "Added Message Succesfully"
    );
  } catch (error) {
    logger.error(error);
    return new AppError(500, "Error during add Message");
  }
};

const createNewSession = async (data, userId) => {
  try {
    const message = await sessionRepository.addMessage(data.message);
    const sessionData = {
      title: data.title,
      message: message._id,
    };
    const sessionResponse = await sessionRepository.addTitleToSessionUser(
      sessionData
    );
    const userResponse = await sessionRepository.pushSessionIdToUserModel(
      sessionResponse._id,
      userId
    );
    console.log(userResponse);
    return new GeneralResponse(
      true,
      sessionResponse,
      200,
      "Added Session Succesfully"
    );
  } catch (error) {
    console.log(error);
    return new AppError(500, "Error during add Session");
  }
};

const getAllSessionByUser = async (userId) => {
  try {
    const session = await sessionRepository.getAllSessionByUser(userId);
    return new GeneralResponse(
      true,
      session,
      200,
      "Get All Session By User Succesfully"
    );
  } catch (error) {
    logger.error(error);
    return new AppError(500, "Error during get All Session By User");
  }
};

module.exports = {
  addMessage,
  createNewSession,
  getAllSessionByUser,
};
