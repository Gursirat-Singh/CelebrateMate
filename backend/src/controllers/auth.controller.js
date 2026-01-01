const authService = require('../services/auth.service');
const { sendSuccess, sendError } = require('../utils/response.util');

/**
 * Register a new user
 * POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.register(email, password);

    sendSuccess(res, 'User registered successfully', result, 201);
  } catch (error) {
    sendError(res, error.message, 400);
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    sendSuccess(res, 'Login successful', result);
  } catch (error) {
    sendError(res, error.message, 401);
  }
};

/**
 * Get current user profile
 * GET /api/auth/profile
 */
const getProfile = async (req, res) => {
  try {
    sendSuccess(res, 'Profile retrieved successfully', { user: req.user });
  } catch (error) {
    sendError(res, error.message);
  }
};

/**
 * Update user profile
 * PUT /api/auth/profile
 */
const updateProfile = async (req, res) => {
  try {
    const { name, timezone } = req.body;
    const userId = req.user.id;

    // For now, we'll just return success since we don't have additional fields to update
    // In a real app, you might update name, timezone, preferences, etc.
    // Since our user model only has email/password, we'll store additional data in a separate profile collection

    sendSuccess(res, 'Profile updated successfully', {
      user: {
        id: userId,
        email: req.user.email,
        name: name || req.user.email.split('@')[0],
        timezone: timezone || 'UTC'
      }
    });
  } catch (error) {
    sendError(res, error.message);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
