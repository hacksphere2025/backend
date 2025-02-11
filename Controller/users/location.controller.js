const {
  CreateAddressDTO,
  AddressIdDTO,
  DeleteAddressDTO,
} = require("../../dtos/users/locations.dtos");
const locationService = require("../../Services/users/location.service");

const createLocation = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const locationDTO = new CreateAddressDTO({ ...req.body, userId: userId });
    const location = await locationService.createLocation(locationDTO);
    return res.status(location.statusCode).json(location);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllLocation = async (req, res) => {
  try {
    const locations = await locationService.getAllLocation();
    return res.status(locations.statusCode).json(locations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getLocationById = async (req, res) => {
  try {
    const locationIdDTO = new AddressIdDTO(req.body);
    const location = await locationService.getLocationById(locationIdDTO);
    return res.status(location.statusCode).json(location);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getLocationByUserId = async (req, res) => {
  try {
    console.log(req.user.id);
    const locationIdDTO = new AddressIdDTO({ id: req.user.id });
    const location =
      await locationService.getAllLocationByUserId(locationIdDTO);
    return res.status(location.statusCode).json(location);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteLocationById = async (req, res) => {
  try {
    console.log(req.user.id);
    const deleteLocationDTO = new DeleteAddressDTO({
      user_id: req.user.id,
      id: req.body.id,
    });
    const location =
      await locationService.deleteLocationById(deleteLocationDTO);
    return res.status(location.statusCode).json(location);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createLocation,
  getAllLocation,
  getLocationById,
  getLocationByUserId,
  deleteLocationById,
};
