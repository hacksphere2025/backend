const { CreateCartDTO } = require("../../dtos/users/cart.dtos");
const cartService = require("../../Services/users/cart.service");

const createCart = async (req, res) => {
  try {
    const email = req.user.email;
    const cartDTO = new CreateCartDTO({
      ...req.body,
      user: email,
    });
    console.log(cartDTO);
    const data = await cartService.handleCreateCart(cartDTO);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllCart = async (req, res) => {
  try {
    const data = await cartService.handleGetAllCart();
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllCartByUser = async (req, res) => {
  try {
    const id = req.user.id;
    const data = await cartService.handleGetAllCartById(id);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createCart,
  getAllCart,
  getAllCartByUser,
};
