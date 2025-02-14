const { session } = require("../../Models/userModels/session.model");
const { Message } = require("../../Models/userModels/message.model");
const { user } = require("../../Models/authModels/user.model");
const mongoose = require("mongoose");

const createSessionByUser = async (data, userId) => {
  const transaction = await mongoose.startSession();
  transaction.startTransaction();
  try {
    const addTitleToSession = new session(data);
    const sessionData = await addTitleToSession.save();
    await user.updateOne(
      { _id: userId },
      {
        $push: { session: addTitleToSession._id },
      },
    );
    return sessionData;
  } catch (e) {
    await transaction.abortTransaction();
    console.error(e);
  }
};

const addMessageBySessionId = async (newMessage, sessionId) => {
  const transaction = await mongoose.startSession();
  transaction.startTransaction();
  try {
    const messageResponse = new Message(newMessage);
    console.log(messageResponse);
    await messageResponse.save();
    await session.updateOne(
      { _id: sessionId },
      {
        $push: { message: messageResponse._id },
      },
    );
  } catch (e) {
    await transaction.abortTransaction();
    session.endSession();
    console.error(e);
  }
};

const getMessageListBySession = async (sessionId) => {
  return await session
    .find({ _id: sessionId })
    .populate("message")
    .select("message")
    .exec();
};

const getAllSessionByUser = async (userId) => {
  return await user
    .find({ _id: userId })
    .populate("session")
    .select("session -_id")
    .exec();
};

module.exports = {
  addMessageBySessionId,
  getMessageListBySession,
  getAllSessionByUser,
  createSessionByUser,
};
