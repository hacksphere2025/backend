const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const user = require("../Models/user");
const category = require("../Models/category");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: SchemaTypes.ObjectId,
    ref: category, 
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  seller_id: {
    type: SchemaTypes.ObjectId,
    ref: user,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  freshness: {
    type: Number,
    enum: [0, 1, 2, 3, 4],
    required: true,
  },
  harvest_date: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

export const product = mongoose.model("Product", productSchema);