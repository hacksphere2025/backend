const {
  CreateAddressDTO,
  AddressIdDTO,
} = require("../../dtos/users/locations.dtos");
const locationService = require("../../Services/users/location.service");

const createLocationController = async (req, res) => {
  try {
    const locationDTO = new CreateAddressDTO(req.body);
    const location = await locationService.createLocation(locationDTO);
    return res.status(location.statusCode).json(location);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllLocationController = async (req, res) => {
  try {
    const locations = await locationService.getAllLocation();
    return res.status(locations.statusCode).json(locations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getLocationByIdController = async (req, res) => {
  try {
    const locationIdDTO = new AddressIdDTO(req.body);
    const location = await locationService.getLocationById(locationIdDTO);
    return res.status(location.statusCode).json(location);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createLocationController,
  getAllLocationController,
  getLocationByIdController,
};
