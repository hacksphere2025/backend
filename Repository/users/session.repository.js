const { message } = require("../../Models/userModels/message.model");
const { session } = require("../../Models/userModels/session.model");
const { user } = require("../../Models/authModels/user.model");

const addMessage = async (data) => {
  const messageData = new message(data);
  return await messageData.save();
};

const addTitleToSessionUser = async (data) => {
  const addTitleToSession = new session(data);
  return await addTitleToSession.save();
};

const pushMessageIdToSessionModel = async (messageId, sessionId) => {
  await session.findByIdAndUpdate(sessionId, {
    $push: { message: messageId },
  });
};

const pushSessionIdToUserModel = async (sessionId, UserId) => {
  return await user.findByIdAndUpdate(UserId, {
    $push: { session: sessionId },
  });
};

const getMessageListBySession = async (sessionId) => {
  return await session.findById(sessionId).populate("message").exec();
};

const getAllSessionByUser = async (userId) => {
  return await user.findBy(userId).populate("session").select("session").exec();
};

module.exports = {
  addMessage,
  pushMessageIdToSessionModel,
  pushSessionIdToUserModel,
  getMessageListBySession,
  getAllSessionByUser,
  addTitleToSessionUser,
};
