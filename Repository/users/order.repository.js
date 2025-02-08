const { order } = require("../../Models/userModels/order.models");
const { product } = require("../../Models/userModels/product.model");
const { user } = require("../../Models/authModels/user.model");
const addOrder = async (data) => {
  const newOrder = new order(data);
  await newOrder.save();
  await user.findByIdAndupdate(data.seller_id, {
    $push: { sells: newOrder._id },
  });
  await user.findByIdAndupdate(data.buyer_id, {
    $push: { orders: newOrder._id },
  });
  await product.findByIdAndUpdate(data.buy_product, {
    $inc: { quantity: -data.quantity },
  });
};

const getAllOrder = async () => {
  return await order.find({});
};

const getAllOrdersByUserBuy = async (userId) => {
  return await order.find({ buyer_id: userId });
};

const getAllOrdersByUserSell = async (userId) => {
  return await order.find({ seller_id: userId });
};

module.exports = {
  addOrder,
  getAllOrder,
  getAllOrdersByUserBuy,
  getAllOrdersByUserSell,
};
