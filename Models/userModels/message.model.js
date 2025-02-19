const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  user: {
    type: String,
    default: "user",
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  data: {
    type: Object,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = {
  Message,
};
