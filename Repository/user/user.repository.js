const { user } = require("../../Models/authModels/user.model");

exports.createUser = async (
  name,
  email,
  password,
  phone_no,
  latitude,
  longitude,
  cart
) => {
  const newUser = new user({
    name,
    email,
    password,
    phone_no,
    latitude,
    longitude,
    cart,
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
  return await user
    .findOne({ email: email })
    .populate("cart",'-__v')
    .populate({
      path: "products",
      populate: {
        path: "location",
        model: "Location",
        'select': 'address location'
      },
      'select': 'category name quantity freshness price',
    })
    .exec();
};

exports.getUserIdByEmail = async (email) => {
  const data = await user.findOne({ email: email });
  return data._id.toString();
};
