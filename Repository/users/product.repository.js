const { product } = require("../../Models/userModels/product.model");
const { category } = require("../../Models/userModels/category.model");
const { user } = require("../../Models/authModels/user.model");
const { location } = require("../../Models/userModels/location.model");

const getAllProduct = async () => {
  return await product
    .find({})
    .populate("category", "_id name")
    .populate("seller_id", "name email")
    .populate("location", "city state");
};

const getUserByProductId = async (id) => {
  return await product.findById(id);
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
  console.log(data);
  const newProduct = new product(data);
  await newProduct.save();
  await user.findByIdAndUpdate(data.seller_id, {
    $push: { products: newProduct._id },
  });
};

const updateProductByUserId = async (data) => {
  const { _id, ...updateData } = data;
  return await product.findByIdAndUpdate(_id, updateData);
};

const findProductByString = async (name, limit = null, city = null) => {
  let query = {};

  if (name) {
    // Simplified condition
    const matchingCategories = await category
      .find({ $text: { $search: name } })
      .select("_id")
      .lean();

    const categoryIds = matchingCategories.map((cat) => cat._id); // Shorter variable name

    query.$or = [
      { $text: { $search: name } },
      { category: { $in: categoryIds } },
    ];
  }

  if (city) {
    // 1. Find the location document by city name:

    const locationDoc = await location
      .findOne({
        $text: { $search: city },
      })
      .lean();

    if (locationDoc) {
      query.location = locationDoc._id;
    } else {
      // Handle the case where location is not found, e.g., return empty array or throw error
      console.log(`Location "${city}" not found.`);
      return []; // Or throw an error if appropriate.
    }
  }

  let products = await product
    .find(query)
    .populate("seller_id", "name")
    .populate("category", "name")
    .populate("location", "city state") // Keep this for the *result*
    .lean();

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }

  console.log(products);
  return products;
};

module.exports = {
  getAllProductByUserId,
  insertProduct,
  getAllProduct,
  findProductByString,
  getUserByProductId,
  updateProductByUserId,
};
