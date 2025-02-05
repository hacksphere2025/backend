const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const orderSchema = new mongoose.Schema({
  buy_product: {
    type: SchemaTypes.ObjectId,
    ref: "Products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  seller_id: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  buyer_id: { type: SchemaTypes.ObjectId, ref: "User", required: true },
});

const order = mongoose.model("Orders", orderSchema);

module.exports = {
  order,
};
