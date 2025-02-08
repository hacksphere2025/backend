const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone_no: {
    type: Number,
    require: true,
  },
  products: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Product",
    },
  ],
  cart: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Cart",
    },
  ],
  locations: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Location",
    },
  ],
  order: [{ type: SchemaTypes.ObjectId, ref: "Order" }],
});

const user = mongoose.model("User", userSchema);
module.exports = {
  user,
};
