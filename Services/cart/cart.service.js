const cartRepository = require("../../Repository/cart/cart.repository")
const { AppError } = require("../../utils/error")

module.exports.createCart = async () => {
  try {
    return await cartRepository.createCart();
  } catch (error) {
    console.error(error);
    throw new AppError(500, "Error in creation of cart");
  }
}
