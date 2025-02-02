const { AppError, NotFoundError, isAppError } = require("../../utils/error.js");
const logger = require("../../utils/logger.js");
const GeneralResponse = require("../../utils/response.js");
const { getUserByNameOrEmail } = require("../../Repository/auth/auth.repository.js");

module.exports.handleLogin = async (nameOrEmail, password) => {
  try {
    const user = await getUserByNameOrEmail(nameOrEmail);
    
    if (!user) {
      throw new NotFoundError("User Not Found");
    }
    
    if (user.password !== password) {
      throw new AppError(402, "Password Does Not Match");
    }

    return new GeneralResponse(true, null, 200, "Customer Login Successfully");
  } catch (error) {
    if (isAppError(error)) {
      throw error;
    }
    throw new AppError(500, "Error during Login");
  }
};
