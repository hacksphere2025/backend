const { location } = require("../../Models/userModels/location.model");

exports.createLocation = async (dto) => {
  const newLocation = new location(dto);
  return await newLocation.save();
};

exports.getAllLocation = async () => {
  return await location.find();
};

exports.getLocationById = async (id) => {
  return await location.findById(id);
};
