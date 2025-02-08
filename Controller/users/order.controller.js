const orderService = require('../../Services/users/order.service');

const addOrderController = async (req, res) => {
  try {
    console.log(req.body);
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

module.exports = {
  addOrderController,
  getAllOrderController,
  getAllOrdersByUserBuyController,
  getAllOrdersByUserSellController,
};
