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

exports.getAllLocationByUserId = async (id) => {
  console.log(id)
  const data = await location.find({ userId: id._id });
  console.log(data);
  return data;
};
