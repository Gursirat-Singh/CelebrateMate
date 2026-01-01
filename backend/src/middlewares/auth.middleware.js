const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');
const { JWT_SECRET } = require('../config/env');
const { sendUnauthorized } = require('../utils/response.util');

/**
 * Middleware to authenticate JWT token
 */
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return sendUnauthorized(res);
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get user from token
      const user = await authService.getUserById(decoded.userId);

      // Add user to request
      req.user = user;
      next();
    } catch (error) {
      return sendUnauthorized(res);
    }
  } catch (error) {
    return sendUnauthorized(res);
  }
};

module.exports = {
  authenticate
};
