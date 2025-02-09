const { order } = require("../../Models/userModels/order.models");
const { product } = require("../../Models/userModels/product.model");
const { user } = require("../../Models/authModels/user.model");
const mongoose = require("mongoose");
const path = require("path");

const addOrder = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log(data);
    const newOrder = new order(data);
    await newOrder.save();

    await user.findOneAndUpdate(
      { _id: data.buyer_id },
      {
        $push: { order: newOrder._id },
      },
    );

    await product.findOneAndUpdate(
      { _id: data.buy_product },
      {
        $inc: { sold_qty: data.quantity },
      },
    );
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    console.error(e);
  }
};

const getAllOrder = async () => {
  return await order
    .find()
    .populate({
      path: "product_id",
      select: "-__v -sold_qty",
      populate: {
        path: "seller_id",
        select: "name email",
      },
    })
    .select("product_id")
    .select("quantity");
};

const getAllOrdersByUserBuy = async (userId) => {
  return await order
    .find({ buyer_id: userId })
    .populate({
      path: "product_id",
      select: "-__v -sold_qty",
      populate: [
        { path: "seller_id", select: "name email" },
        { path: "category", select: "name" },
        { path: "location", select: "-userId -__v" },
      ],
    })
    .select("product_id")
    .select("quantity");
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
