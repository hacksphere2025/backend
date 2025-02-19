const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;

const sessionSchema = mongoose.Schema({
  title: {
    type: String,
  },
  message: [
    {
      ref: "Message",
      type: SchemaTypes.ObjectId,
    },
  ],
  time: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    default: "buyer",
  },
});

const session = mongoose.model("Session", sessionSchema);
module.exports = {
  session,
};
