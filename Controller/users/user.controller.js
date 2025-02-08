const userService = require("../../Services/users/user.service")

const updateUserLocation = async (req, res) => {
  try {
    const email = req.user.email;
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and Longitude fields are required" });
    }
    const response = await userService.updateLocation(email, latitude, longitude);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const getUserDetails = async (req, res) => {
  try {
    const id = req.user.email;
    const response = await userService.getUserDetails(id);
    return res.status(response.statusCode).json(response)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });

  }
}

module.exports = {
  updateUserLocation,
  getUserDetails
}
