const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;

const chatSessionSchema = mongoose.Schema({
  product_id: {
    type: SchemaTypes.ObjectId,
    ref: "Product",
    required: true,
  },
  seller_id: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },
  buyer_id: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      ref: "Message",
      type: SchemaTypes.ObjectId,
    }
  ]
});

const chatSession = mongoose.model("ChatSession", chatSessionSchema);
module.exports = {
  chatSession
}

