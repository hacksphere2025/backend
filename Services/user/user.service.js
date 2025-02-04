const userRepository = require("../../Repository/user/user.repository");
const { AppError } = require("../../utils/error");
const { GeneralResponse } = require("../../utils/response");

module.exports.updateLocation = async (email, latitude, longtitude) => {
  try {
    await userRepository.updateUserLocation(email, latitude, longtitude);
    return new GeneralResponse(true, null, 200, "Location Update Successful")
  }
  catch (error) {
    console.log(error)
    throw new AppError(500, "Error during location update");
  }
}

module.exports.getUserDetails = async (email) => {
  try {
    const response = await userRepository.getUserByEmail(email);
    return new GeneralResponse(true, response, 200, "Fetched Deatails Successfully");
  } catch (error) {
    console.log(error)
    throw new AppError(500, "Error during location update");
  }
}
