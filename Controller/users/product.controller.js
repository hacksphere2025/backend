const { CreateProductDTO } = require("../../dtos/users/product.dtos");
const productService = require("../../Services/users/product.service");

const createProduct = async (req, res) => {
  try {
    const email = req.user.email;
    console.log(req.body);
    const productDTO = new CreateProductDTO({
      ...req.body,
      seller_id: email,
    });
    console.log(productDTO);
    const data = await productService.createProduct(productDTO);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const data = await productService.getAllProducts();
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllProductsByEmailId = async (req, res) => {
  try {
    const email = req.user.email;
    const data = await productService.getAllProductsByEmailId(email);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getAllProductsByEmailId,
};
