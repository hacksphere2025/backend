const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const product = require("../Models/product");
const user = require("../Models/user");
const message = require("../Models/Message");

const chatSessionSchema = mongoose.Schema({
  product_id: {
    type: SchemaTypes.ObjectId,
    ref: product,
    required: true,
  },
  seller_id: {
    type: SchemaTypes.ObjectId,
    ref: user,
    required: true
  },
  buyer_id: {
    type: SchemaTypes.ObjectId,
    ref: user,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      ref: message,
      type: SchemaTypes.ObjectId,
    }
  ]
});

export const chatSession = mongoose.model("ChatSession", chatSessionSchema);