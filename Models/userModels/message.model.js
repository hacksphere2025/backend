const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  user: {
    type: String,
    enum: ["user", "bot"],
    default: "user",
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

const message = mongoose.model("Message", messageSchema);
module.exports = {
  message,
};
