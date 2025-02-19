const orderService = require("../../Services/users/order.service");

const addOrderController = async (req, res) => {
  try {
    // console.log(req.body);
    const id = req.user.id;
    const data = await orderService.handleAddOrder(req.body, id);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllOrderController = async (req, res) => {
  try {
    const data = await orderService.handleGetAllOrder();
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllOrdersByUserBuyController = async (req, res) => {
  try {
    const data = await orderService.handleGetAllOrdersByUserBuy(req.user.id);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllOrdersByUserSellController = async (req, res) => {
  try {
    const data = await orderService.handleGetAllOrdersByUserSell(req.user.id);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const orderAllItemByUser = async (req, res) => {
  try {
    const user = req.user.id;
    const response = await orderService.handleOrderAllItemsByUser(user);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return req.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllOrderedStatusList = async (req, res) => {
  try {
    const response = await orderService.handleGetAllOrderedStatusList(
      req.user.id
    );
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllDeliveredStatusList = async (req, res) => {
  try {
    const response = await orderService.handleGetAllDeliveredStatusList(
      req.user.id
    );
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllAcceptedStatusList = async (req, res) => {
  try {
    const response = await orderService.handleGetAllAcceptedStatusList(
      req.user.id
    );
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllRejectedStatusList = async (req, res) => {
  try {
    const response = await orderService.handleGetAllRejectedStatusList(
      req.user.id
    );
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const changeTheStatus = async (req, res) => {
  try {
    const response = await orderService.handleChangeTheStatus(
      req.body.id,
      req.body.status
    );
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addOrderFromCart = async (req, res) => {
  try {
    const user = req.user.id;
    const response = await orderService.handleAddOrderFromCart(user, req.body.location);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addOrderController,
  getAllOrderController,
  getAllOrdersByUserBuyController,
  getAllOrdersByUserSellController,
  orderAllItemByUser,
  getAllOrderedStatusList,
  getAllDeliveredStatusList,
  getAllAcceptedStatusList,
  getAllRejectedStatusList,
  changeTheStatus,
  addOrderFromCart,
};
