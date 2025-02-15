const { CreateProductDTO } = require("../../dtos/users/product.dtos");
const productService = require("../../Services/users/product.service");

const createProduct = async (req, res) => {
  try {
    const id = req.user.id;
    // console.log(req.body);
    const productDTO = new CreateProductDTO({
      ...req.body,
      seller_id: id,
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

const getAllProductsByUserId = async (req, res) => {
  try {
    const data = await productService.getAllProductsByUserId(req.user.id);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getAllProductsByUserId,
};
