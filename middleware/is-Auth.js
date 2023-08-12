require('dotenv').config(); //to get the secret key
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //split the token and get the second part
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId }; //add new field to the request
    req.userId = decodedToken.userId; //add new field to the request
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are not authenticated!' });
  }
};
