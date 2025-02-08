const productRepository = require("../../Repository/users/product.repository");
const userRepository = require("../../Repository/auth/user.repository");
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
    const sellerObjectId = await userRepository.getUserIdByEmail(
      data.seller_id
    );
    if (!sellerObjectId) {
      return new GeneralResponse(false, null, 403, "Seller does not exist");
    }
    data.seller_id = sellerObjectId;
    const [day, month, year] = data.harvest_date.split("-");
    const fullYear = year.length === 2 ? `20${year}` : year;
    const converted_harvest_date = new Date(fullYear, month - 1, day);
    data.harvest_date = converted_harvest_date.toISOString();
    await productRepository.insertProduct(data);
    return new GeneralResponse(true, null, 200, "Product Created Successfully");
  } catch (error) {
    console.log(error);
    return new AppError(500, "Error during product fetch.");
  }
};

const getAllProductsByEmailId = async (email) => {
  try {
    const userId = await userRepository.getUserIdByEmail(email);
    const data = await productRepository.getAllProductByUserId(userId);
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

module.exports = {
  getAllProductsByEmailId,
  getAllProducts,
  createProduct,
};
