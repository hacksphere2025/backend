const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
  let token;
  try {
    token = req.header("Authorization").replace("Bearer ", "");
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = { email: decoded.email, id: decoded.id, type: decoded.type };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Token expired. Please authenticate." });
  }
};
