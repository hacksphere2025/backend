const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const orderSchema = new mongoose.Schema({
  product_id: {
    type: SchemaTypes.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  location: {
    type: SchemaTypes.ObjectId,
    ref: "Location",
    required: true,
  },
  status: {
    type: String,
    enum: ["requested", "rejected", "accepted", "pending", "delivered"],
    default: "requested",
  },
  seller_id: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  buyer_id: { type: SchemaTypes.ObjectId, ref: "User", required: true },
});

const order = mongoose.model("Order", orderSchema);

module.exports = {
  order,
};
