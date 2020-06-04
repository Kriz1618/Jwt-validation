const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ auth: false, error: "No token provided" });
  }

  const decode = jwt.verify(token, config.secret);

  if (!decode || !decode.id) {
    return res.status(401).json({ auth: false, error: "Invalid token" });
  }

  req.userId = decode.id;
  next();  
};

module.exports = verifyToken;