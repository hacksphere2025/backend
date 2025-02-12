const orderRepository = require("../../Repository/users/order.repository");
const { AppError } = require("../../utils/error");
const productRepository = require("../../Repository/users/product.repository");

const { GeneralResponse } = require("../../utils/response");
const { CreateOrderDTO } = require("../../dtos/users/order.dtos");

const handleAddOrder = async (data, id) => {
  try {
    data.buyer_id = id;
    const seller = await productRepository.getUserByProductId(data.product_id);
    console.log(seller);
    data.seller_id = seller.seller_id;
    const orderDTO = new CreateOrderDTO(data);
    const response = await orderRepository.addOrder(orderDTO);
    return new GeneralResponse(
      true,
      response,
      200,
      "Order Created Successfully"
    );
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during order creation.");
  }
};

const handleGetAllOrder = async () => {
  try {
    const data = await orderRepository.getAllOrder();
    return new GeneralResponse(true, data, 200, "Fetched Order Successfully");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during order fetch.");
  }
};

const handleGetAllOrdersByUserBuy = async (userId) => {
  try {
    const data = await orderRepository.getAllOrdersByUserBuy(userId);
    return new GeneralResponse(true, data, 200, "Fetched Order Successfully");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during order fetch.");
  }
};

const handleGetAllOrdersByUserSell = async (userId) => {
  try {
    const data = await orderRepository.getAllOrdersByUserSell(userId);
    return new GeneralResponse(true, data, 200, "Fetched Order Successfully");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during order fetch.");
  }
};

module.exports = {
  handleAddOrder,
  handleGetAllOrder,
  handleGetAllOrdersByUserBuy,
  handleGetAllOrdersByUserSell,
};
