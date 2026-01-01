const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/env');

class AuthService {
  // Register a new user
  async register(email, password) {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user (password hashing happens in pre-save middleware)
    const user = await User.create({ email, password });

    // Generate JWT token
    const token = this.generateToken(user._id);

    // Return user data without password
    return {
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    };
  }

  // Login user
  async login(email, password) {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user._id);

    // Return user data without password
    return {
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    };
  }

  // Generate JWT token
  generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
  }

  // Get user by ID (for middleware)
  async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = new AuthService();
