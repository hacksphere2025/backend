const cartRepository = require("../../Repository/consumer/cart.repository");
const userRepository = require("../../Repository/user/user.repository");
const { AppError } = require("../../utils/error");
const { GeneralResponse } = require("../../utils/response");

const handleCreateCart = async (data) => {
  try {
    const sellerObjectId = await userRepository.getUserIdByEmail(data.user);
    if (!sellerObjectId) {
      return new GeneralResponse(false, null, 403, "Seller does not exist");
    }
    data.user = sellerObjectId;
    await cartRepository.createCart(data);
    return new GeneralResponse(true, null, 200, "Cart Created Successfully");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during cart creation.");
  }
};

const handleGetAllCart = async () => {
  try {
    const data = await cartRepository.getAllCart();
    return new GeneralResponse(true, data, 200, "Fetched Cart Successfully");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during cart fetch.");
  }
};

const handleGetAllCartByEmailId = async (email) => {
  try {
    const data = await cartRepository.getAllCartByEmailId(email);
    return new GeneralResponse(true, data, 200, "Fetched Cart Successfully");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during cart fetch.");
  }
};

module.exports = {
  handleCreateCart,
  handleGetAllCart,
  handleGetAllCartByEmailId,    
};
