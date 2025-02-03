const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;

const cartSchema = mongoose.Schema({
  products: [
    {
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
    },
  ],
});

const cart = mongoose.model("Cart", cartSchema);
module.exports = {
  cart
}
