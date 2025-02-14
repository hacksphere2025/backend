const authService = require("../../Services/auth/auth.service");

const userLogin = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    if (!email || !password || !type) {
      return res
        .status(401)
        .json({
          message: "Both email, password and userType fields are required",
        });
    }
    const response = await authService.handleLogin(email, password, type);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, rePassword, phone_no } = req.body;
    if (!name || !email || !password || !rePassword || !phone_no) {
      return res.status(401).json({ message: "Please fill all the fields" });
    }
    const response = await authService.handleCreateUser(
      name,
      email,
      password,
      rePassword,
      phone_no
    );
    res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  userLogin,
  createUser,
};
