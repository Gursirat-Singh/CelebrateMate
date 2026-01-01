const { body, validationResult } = require('express-validator');
const { sendValidationError } = require('../utils/response.util');

/**
 * Middleware to handle validation results
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => err.msg);
    return sendValidationError(res, extractedErrors);
  }
  next();
};

/**
 * Validation rules for user registration
 */
const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
];

/**
 * Validation rules for user login
 */
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

/**
 * Validation rules for event creation/update
 */
const validateEvent = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title is required and must be less than 100 characters'),
  body('eventType')
    .isIn(['birthday', 'anniversary', 'custom'])
    .withMessage('Event type must be birthday, anniversary, or custom'),
  body('tone')
    .isIn(['celebratory', 'supportive', 'remembrance', 'practical'])
    .withMessage('Tone must be celebratory, supportive, remembrance, or practical'),
  body('eventDate')
    .isISO8601()
    .withMessage('Event date must be a valid date')
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('Event date cannot be in the past');
      }
      return true;
    }),
  body('personName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Person name is required and must be less than 50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  body('reminderDaysBefore')
    .optional()
    .isInt({ min: 0, max: 365 })
    .withMessage('Reminder days must be between 0 and 365'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateEvent
};
