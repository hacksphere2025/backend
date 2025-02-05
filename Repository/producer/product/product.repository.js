const { product } = require("../../../Models/producerModels/product.model");
const { user } = require("../../../Models/authModels/user.model");

const getAllProduct = async () => {
  return await product
    .find({})
    .populate("category", "name")
    .populate("seller_id", "name email");
};

const getAllProductByUserId = async (seller_id) => {
  return await product
    .find({ seller_id: seller_id })
    .populate("category", "name")
    .populate("seller_id", "name email");
};

const insertProduct = async (data) => {
  const newProduct = new product(data);
  await newProduct.save();
  await user.findByIdAndUpdate(data.seller_id, { $push: { products: newProduct._id } });
};

const findProductByString = async (name) => {
  return await product.find({
    $text: {
      $search: name
    }
  }).populate("seller_id", "name")
  .populate("category", "name")
}

module.exports = {
  getAllProductByUserId,
  insertProduct,
  getAllProduct,
  findProductByString
};
