const { cart } = require("../../Models/userModels/cart.models");
const { user } = require("../../Models/authModels/user.model");

const createCart = async (dto) => {
  const newCart = new cart(dto);
  await newCart.save();
  await user.findByIdAndUpdate(dto.user, { $push: { cart: newCart._id } });
};

const getAllCart = async () => {
  return await cart.find({});
};

const getAllCartById = async (id) => {
  return await cart
    .find({ user: id })
    .populate("product_id", "name price seller_id");
};

const getAllCartByUser = async (id) => {
  return await cart.findById(id);
};

const clearAllProducts = async (id) => {
  return await cart.findByIdAndDelete({ user: id });
};

module.exports = {
  createCart,
  getAllCart,
  getAllCartById,
  getAllCartByUser,
  clearAllProducts,
};
