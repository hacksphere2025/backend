const cartRepository = require("../../Repository/users/cart.repository");
const userRepository = require("../../Repository/auth/user.repository");
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

const handleGetAllCartById = async (id) => {
  try {
    const data = await cartRepository.getAllCartByEmailId(id);
    console.log(data);
    return new GeneralResponse(true, data, 200, "Fetched Cart Successfully");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during cart fetch.");
  }
};

module.exports = {
  handleCreateCart,
  handleGetAllCart,
  handleGetAllCartById,
};
