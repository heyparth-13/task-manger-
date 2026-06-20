const jwt = require('jsonwebtoken');
const { readDB } = require('../config/fileDb');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the JSON DB
      const db = readDB();
      const user = db.users.find(u => u._id === decoded.id);
      
      if (!user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      req.user = { _id: user._id, name: user.name, email: user.email };

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      next(new Error('Not authorized, token failed'));
    }
  }

  if (!token) {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
};

module.exports = { protect };
