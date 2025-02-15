const orderRepository = require("../../Repository/users/order.repository");
const { AppError } = require("../../utils/error");
const productRepository = require("../../Repository/users/product.repository");
const cartRepository = require("../../Repository/users/cart.repository");
const { GeneralResponse } = require("../../utils/response");
const { CreateOrderDTO } = require("../../dtos/users/order.dtos");
// const { order } = require("../../Models/userModels/order.models");

const handleAddOrder = async (data, id) => {
  try {
    data.buyer_id = id;
    const seller = await productRepository.getUserByProductId(data.product_id);
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

const handleOrderAllItemsByUser = async (userId) => {
  try {
    const userDetails = await cartRepository.getAllCartByEmailId(userId);
    console.log(userDetails);
    return new GeneralResponse(true, null, 200, "Order All Items In the cart");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during Order Items");
  }
};

const handleGetAllOrderedStatusList = async (userId) => {
  try {
    const data = await orderRepository.getAllOrderedStatusList(userId);
    return new GeneralResponse(true, data, 200, "Fetched Order Successfully");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during order fetch.");
  }
};

const handleGetAllDeliveredStatusList = async (userId) => {
  try {
    const data = await orderRepository.getAllDeliveredStatusList(userId);
    return new GeneralResponse(true, data, 200, "Fetched Order Successfully");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during order fetch.");
  }
};

const handleGetAllAcceptedStatusList = async (userId) => {
  try {
    const data = await orderRepository.getAllAcceptedStatusList(userId);
    return new GeneralResponse(true, data, 200, "Fetched Order Successfully");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during order fetch.");
  }
};

const handleGetAllRejectedStatusList = async (userId) => {
  try {
    const data = await orderRepository.getAllRejectedStatusList(userId);
    return new GeneralResponse(true, data, 200, "Fetched Order Successfully");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during order fetch.");
  }
};

const handleChangeTheStatus = async (orderId, status) => {
  try {
    const data = await orderRepository.changeTheStatus(orderId, status);
    return new GeneralResponse(true, data, 200, "Order Status Updated");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during order status change.");
  }
};

const handleAddOrderFromCart = async (userId, location) => {
  try {
    const userDetails = await cartRepository.getAllCartById(userId);
    // console.log(userDetails);
    // console.log(location);
    for (const item of userDetails) {
      const data = {
        buyer_id: userId,
        product_id: item.product_id._id,
        quantity: item.quantity,
        location: location,
        seller_id:item.product_id.seller_id,
      };
      const orderDTO = new CreateOrderDTO(data);
      await orderRepository.addOrder(orderDTO);
    }
    await cartRepository.clearAllProducts(userId);
    return new GeneralResponse(true, null, 200, "Order Created Successfully");
  } catch (error) {
    console.error(error);
    return new AppError(500, "Error during order creation.");
  }
};

module.exports = {
  handleAddOrder,
  handleChangeTheStatus,
  handleGetAllOrder,
  handleGetAllOrdersByUserBuy,
  handleGetAllOrdersByUserSell,
  handleOrderAllItemsByUser,
  handleGetAllOrderedStatusList,
  handleGetAllDeliveredStatusList,
  handleGetAllAcceptedStatusList,
  handleGetAllRejectedStatusList,
  handleAddOrderFromCart,
};
