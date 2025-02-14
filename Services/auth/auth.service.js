const jwt = require("jsonwebtoken");
const { AppError } = require("../../utils/error.js");
const { GeneralResponse } = require("../../utils/response.js");
const userRepository = require("../../Repository/auth/user.repository.js");

module.exports.handleLogin = async (email, password, type) => {
  try {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      return new GeneralResponse(false, null, 403, "User Not Found");
    }

    if (user.password !== password) {
      return new GeneralResponse(false, null, 402, "Password Does Not Match");
    }
    const data = {
      token: createJWT(user.email, user._id, type),
    };
    return new GeneralResponse(true, data, 200, "User Login Successfully");
  } catch (error) {
    console.log(error);
    throw new AppError(500, "Error during Login");
  }
};

module.exports.handleCreateUser = async (
  name,
  email,
  password,
  rePassword,
  phone_no
) => {
  try {
    if (await userRepository.userExists(email)) {
      return new GeneralResponse(false, null, 403, "User already exists");
    }
    if (password != rePassword) {
      return new GeneralResponse(
        false,
        null,
        402,
        "Password and Re-password doesnt match"
      );
    }
    await userRepository.createUser(name, email, password, phone_no);
    const data = {
      token: createJWT(email),
    };
    return new GeneralResponse(true, data, 200, "User Created Successfully");
  } catch (error) {
    console.error(error);
    throw new AppError(500, "Error during create user");
  }
};

const createJWT = (email, id, type) => {
  const token = jwt.sign(
    { email: email, id: id, type: type },
    process.env.JWT_SECRET,
    {
      expiresIn: "1hr",
    }
  );
  return token;
};
