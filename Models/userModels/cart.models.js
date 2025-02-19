const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;

const cartSchema = mongoose.Schema({
  product_id: {
    type: SchemaTypes.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  isOrdered: {
    type: SchemaTypes.Boolean,
    default: false,
  },
});

const cart = mongoose.model("Cart", cartSchema);
module.exports = {
  cart,
};
