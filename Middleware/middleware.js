const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { email: decoded.email, id: decoded.id, type: decoded.type };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: "Token expired. Please authenticate." });
  }
};
