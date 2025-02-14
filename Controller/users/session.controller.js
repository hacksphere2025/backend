const sessionService = require("../../Services/users/session.service");

const addMessage = async (req, res) => {
  try {
    const sessionId = req.body.sessionName;
    const data = req.body.message;
    const response = await sessionService.addMessage(data, sessionId);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;
    const response = await sessionService.addNewMessageWithTopic(data, userId);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllSessionByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await sessionService.getAllSessionByUser(userId);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addMessage,
  createNewSession,
  getAllSessionByUser,
};
