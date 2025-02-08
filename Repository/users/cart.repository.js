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

const getAllCartByEmailId = async (id) => {
  return await cart.find({ user: id }).select('-__v -user');
};

module.exports = {
  createCart,
  getAllCart,
  getAllCartByEmailId,
};
