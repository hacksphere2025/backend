const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const user = require("../Models/user");

const messageSchema = mongoose.Schema({
  from: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true 
  },
  time: {
    type: Date,
    default: Date.now
  }
});

export const messageSchema = mongoose.mode("Message", messageSchema);
