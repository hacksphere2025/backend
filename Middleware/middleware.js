const jwt = require('jsonwebtoken');

module.exports.authMiddleware = (req, res, next) => {
  try {
    console.log(req)
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { email: decoded.email };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: 'Token expired. Please authenticate.' });
  }
}
