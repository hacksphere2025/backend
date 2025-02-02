const User = require("../../Models/user");

exports.getUserByNameOrEmail = async (nameOrEmail) => {
  return await User.findOne({
    $or: [{ email: nameOrEmail }, { userName: nameOrEmail }],
  });
};

exports.addUserToDataBase = async (userName, email, password) => {
  const newUser = new User({
    userName,
    email,
    password,
  });
  return await newUser.save();
};
