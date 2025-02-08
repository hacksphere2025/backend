const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;

const locationSchema = mongoose.Schema({
  address: {
    type: SchemaTypes.String,
    required: true,
  },
  city: {
    type: SchemaTypes.String,
    required: true,
  },
  state: {
    type: SchemaTypes.String,
    required: true,
  },
  pincode:{
    type: SchemaTypes.Number,
    required: true
  },
  country: {
    type: SchemaTypes.String,
    default: "INDIA",
  },
  location: {
    lat: { type: SchemaTypes.String, required: true },
    lng: { type: SchemaTypes.String, required: true },
  },
});

const location = mongoose.model("Location", locationSchema);

module.exports = {
  location,
};
