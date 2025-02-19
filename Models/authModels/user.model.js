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
  userType: {
    type: String,
    require: true,
    enum: ["user", "admin"],
    default: "user",
  },
  phone_no: {
    type: Number,
    require: true,
  },
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
  products: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Product",
    },
  ],
  order: [{ type: SchemaTypes.ObjectId, ref: "Order" }],
  session: [{ type: SchemaTypes.ObjectId, ref: "Session" }],
});

const user = mongoose.model("User", userSchema);
module.exports = {
  user,
};
