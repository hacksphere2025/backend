const productRepository = require("../../Repository/users/product.repository");
// const userRepository = require("../../Repository/auth/user.repository");
const { AppError } = require("../../utils/error");
const { logger } = require("../../utils/logger");
const { GeneralResponse } = require("../../utils/response");

const getAllProducts = async () => {
  try {
    const data = await productRepository.getAllProduct();
    return new GeneralResponse(
      true,
      data,
      200,
      "Fetched Products Successfully"
    );
  } catch (error) {
    logger.error(error);
    return new AppError(500, "Error during product fetch.");
  }
};

const createProduct = async (data) => {
  try {
    const [day, month, year] = data.harvest_date.split("-");
    const fullYear = year.length === 2 ? `20${year}` : year;
    const converted_harvest_date = new Date(fullYear, month - 1, day);
    data.harvest_date = converted_harvest_date.toISOString();
    console.log(data);
    await productRepository.insertProduct(data);
    return new GeneralResponse(true, null, 200, "Product Created Successfully");
  } catch (error) {
    console.log(error);
    return new AppError(500, "Error during product fetch.");
  }
};

const getAllProductsByUserId = async (id) => {
  try {
    const data = await productRepository.getAllProductByUserId(id);
    // let total_amount = 0;
    // data = data.map((product) => {
    //   product.total_amount = product.sold_qty * product.price;
    //   total_amount += product.total_amount;
    //   return product;
    // });
    // data.push({ total_amount: total_amount });
    // console.log(data);
    return new GeneralResponse(
      true,
      data,
      200,
      "Fetched Products Successfully"
    );
  } catch (error) {
    console.log(error);
    return new AppError(500, "Error during product fetch.");
  }
};

const updateProductByUserId = async (data) => {
  try {
    const response = await productRepository.updateProductByUserId(data);
    return new GeneralResponse(
      true,
      response,
      200,
      "Updated Product Successfully"
    );
  } catch (error) {
    console.log(error);
    return new AppError(500, "Error during product update.");
  }
};

module.exports = {
  getAllProductsByUserId,
  getAllProducts,
  createProduct,
  updateProductByUserId,
};
