const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;

const productSchema = mongoose.Schema({
  category: {
    type: SchemaTypes.ObjectId,
    ref: "Category",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  image: {
    type: String,
    required: true,
  },
  seller_id: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  freshness: {
    type: Number,
    enum: [0, 1, 2, 3, 4],
    required: true,
  },
  harvest_date: {
    type: Date,
    required: true,
  },
  location:{
    type: SchemaTypes.ObjectId,
    ref: "location",
    required: true,
  }
});

const product = mongoose.model("Product", productSchema);
module.exports = {
  product,
};
