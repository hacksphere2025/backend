const { product } = require("../../Models/product");

const getAllProduct = async () => {
  return await product.find({}).populate("category", "name").populate("seller_id", "name email");
}

const getAllProductByUserId = async (seller_id) => {
  return await product.find({ seller_id: seller_id }).populate("category", "name").populate("seller_id", "name email");
}

const insertProduct = async (name, category, image, seller_id, latitude, longitude, harvest_date, quantity, freshness) => {
  const newProduct = new product({
    name: name,
    seller_id: seller_id,
    category: category,
    image: image,
    latitude: latitude,
    longitude: longitude,
    harvest_date: harvest_date,
    quantity: quantity,
    freshness: freshness,
  })

  await newProduct.save()
}

module.exports = {
  getAllProductByUserId,
  insertProduct,
  getAllProduct
}
