const { user } = require("../../Models/authModels/user.model");

exports.createUser = async (name, email, password, phone_no, userType) => {
  const newUser = new user({
    name,
    email,
    password,
    phone_no,
    userType,
  });
  return await newUser.save();
};

exports.userExists = async (email) => {
  const userCount = await user.countDocuments({ email: email });
  return userCount > 0;
};

exports.updateUserLocation = async (email, latitude, longitude) => {
  return await user.updateOne(
    {
      email: email,
    },
    { $set: { latitude: latitude, longitude: longitude } }
  );
};

exports.getUserByEmail = async (email) => {
  return await user.findOne({ email: email });
};

exports.getuserById = async (id) => {
  return await user
    .findOne({ _id: id })
    .select("-cart -order -products -__v -password -locations -session");
};
