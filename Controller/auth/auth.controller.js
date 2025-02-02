const authService = require("../../Services/auth/auth.service");

exports.userLogin = async (req, res) => {
  try {
    console.log(req.body);
    const { nameOrEmail, password } = req.body;

    if (!nameOrEmail || !password) {
      return res.status(400).json({ message: "Both fields are required" });
    }

    const response = await authService.handleLogin(nameOrEmail, password);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
