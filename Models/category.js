const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  }
});

const category = mongoose.model("Category", categorySchema);

module.exports = {
  category
}
