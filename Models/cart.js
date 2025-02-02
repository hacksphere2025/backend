const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const user = require("../Models/user");

const cartSchema = mongoose.Schema({
    user_id: {
      type: SchemaTypes.ObjectId,
      ref: "User", 
      required: true,
    },
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

export const cart = mongoose.model("Cart", cartSchema)
