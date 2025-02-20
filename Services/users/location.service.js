const locationRepository = require("../../Repository/users/locations.repository");
const { AppError } = require("../../utils/error");
const { GeneralResponse } = require("../../utils/response");

module.exports.createLocation = async (dto) => {
  try {
    await locationRepository.createLocation(dto);
    return new GeneralResponse(
      true,
      null,
      200,
      "Location created successfully",
    );
  } catch (error) {
    console.log(error);
    throw new AppError(500, "Error during location creation");
  }
};

module.exports.getAllLocation = async () => {
  try {
    const locations = await locationRepository.getAllLocation();
    return new GeneralResponse(true, locations, 200, "All Locations");
  } catch (error) {
    console.log(error);
    throw new AppError(500, "Error during fetching locations");
  }
};

module.exports.getAllLocationByUserId = async (dto) => {
  try {
    const locations = await locationRepository.getAllLocationByUserId(dto);
    return new GeneralResponse(true, locations, 200, "All Locations By UserID");
  } catch (error) {
    console.log(error);
    throw new AppError(500, "Error during fetching locations");
  }
};

module.exports.getLocationById = async (dto) => {
  try {
    const location = await locationRepository.getLocationById(dto);
    return new GeneralResponse(true, location, 200, "Location");
  } catch (error) {
    console.log(error);
    throw new AppError(500, "Error during fetching location");
  }
};

module.exports.deleteLocationById = async (dto) => {
  try {
    const location = await locationRepository.deleteLocation(dto);
    return new GeneralResponse(true, location, 200, "Delete Location");
  } catch (error) {
    console.log(error);
    throw new AppError(500, "Error during deleting location");
  }
};
