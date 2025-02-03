const jwt = require('jsonwebtoken')
const { AppError } = require("../../utils/error.js");
const { GeneralResponse } = require("../../utils/response.js");
const cartService = require("../cart/cart.service.js");
const userRepository = require("../../Repository/user/user.repository.js");

module.exports.handleLogin = async (email, password) => {
  try {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      return new GeneralResponse(false, null, 403, "User Not Found");
    }

    if (user.password !== password) {
      return new GeneralResponse(false, null, 402, "Password Does Not Match");
    }
    const data = {
      token: createJWT(email)
    };
    return new GeneralResponse(true, data, 200, "User Login Successfully");
  } catch (error) {
    console.log(error)
    throw new AppError(500, "Error during Login");
  }
};

module.exports.handleCreateUser = async (name, email, password, rePassword, phone_no, latitude, longitude) => {
  try {
    if (await userRepository.userExists(email)) {
      return new GeneralResponse(false, null, 403, "User already exists")
    }
    if (password != rePassword) {
      return new GeneralResponse(false, null, 402, "Password and Re-password doesnt match");
    }
    const cart = await cartService.createCart();
    await userRepository.createUser(
      name, email, password, phone_no, latitude, longitude, cart.insertedId
    );
    const data = {
      token: createJWT(email)
    }
    return new GeneralResponse(true, data, 200, "User Created Successfully");
  } catch (error) {
    console.error(error);
    throw new AppError(500, "Error during create user");
  }
}

const createJWT = (email) => {
  const token = jwt.sign(
    { email: email },
    process.env.JWT_SECRET,
    { expiresIn: '1hr' }
  );
  return token;
}
