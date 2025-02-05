const { product } = require("../../../Models/producerModels/product.model");
const { category } = require("../../../Models/adminModels/category.model")
const { user } = require("../../../Models/authModels/user.model");

const getAllProduct = async () => {
  return await product
    .find({})
    .populate("category", "name")
    .populate("seller_id", "name email");
};

const getUserByProductId = async (product_id) => {
  return await product.findById(product_id).select("seller_id");
};

const getAllProductByUserId = async (seller_id) => {
  return await product
    .find({ seller_id: seller_id })
    .populate("category", "name -_id")
    .populate("seller_id", "name email")
    .populate("location", "location address city state -_id")
    .exec();
};

const insertProduct = async (data) => {
  const newProduct = new product(data);
  await newProduct.save();
  await user.findByIdAndUpdate(data.seller_id, {
    $push: { products: newProduct._id },
  });
};


const findProductByString = async (name) => {
  // Step 1: Find matching categories by text search
  const matchingCategories = await category.find({ $text: { $search: name } }).select("_id");

  // Extract category IDs
  const categoryIds = matchingCategories.map((category) => category._id);

  // Step 2: Find products by text search on product name
  const productsByName = await product.find({ $text: { $search: name } });

  // Step 3: Find products that belong to matched categories
  const productsByCategory = await product.find({ category: { $in: categoryIds } });

  // Step 4: Store unique products in a Set (using _id to avoid duplicates)
  const productSet = new Map();

  [...productsByName, ...productsByCategory].forEach((p) => {
    productSet.set(p._id.toString(), p);
  });

  // Convert Map values to an array and populate necessary fields
  const uniqueProducts = await product.populate([...productSet.values()], [
    { path: "seller_id", select: "name" },
    { path: "category", select: "name" },
  ]);
  console.log(uniqueProducts)
  return uniqueProducts;
};

module.exports = {
  getAllProductByUserId,
  insertProduct,
  getAllProduct,
  findProductByString,
  getUserByProductId,
};
