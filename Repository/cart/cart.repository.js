const { cart } = require("../../Models/cart");

exports.createCart = async () => {
  const newCart = new cart({
  });
  return await newCart.save();
}
