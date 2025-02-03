const productService = require("../../Services/product/product.service");

const createProduct = async (req, res) => {
  try {
    const email = req.user.email;
    const {
      name, category, image, latitude, longitude, harvest_date, quantity,
      freshness } = req.body

    if (!name || !category || !image || !latitude || !longitude
      || !harvest_date || !quantity || !freshness) {
      return res.status(401).send({ message: "The fields name, category, image, latitude, longitude, harvest_date, quantity is required" })
    }
    const data = await productService.createProduct(name, category, image,
      email, latitude, longitude, harvest_date, quantity, freshness);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const data = await productService.getAllProducts();
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const getAllProductsByEmailId = async (req, res) => {
  try {
    const email = req.user.email;
    const data = await productService.getAllProductsByEmailId(email);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  getAllProductsByEmailId
}
