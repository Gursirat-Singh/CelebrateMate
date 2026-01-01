// Response utility functions for consistent API responses

/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {Object} data - Response data
 * @param {number} statusCode - HTTP status code (default 200)
 */
function sendSuccess(res, message, data = null, statusCode = 200) {
  const response = {
    success: true,
    message
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
}

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default 500)
 * @param {Object} errors - Additional error details
 */
function sendError(res, message, statusCode = 500, errors = null) {
  const response = {
    success: false,
    message
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
}

/**
 * Send validation error response
 * @param {Object} res - Express response object
 * @param {Object} errors - Validation errors object
 */
function sendValidationError(res, errors) {
  return sendError(res, 'Validation failed', 400, errors);
}

/**
 * Send not found response
 * @param {Object} res - Express response object
 * @param {string} resource - Resource name (default 'Resource')
 */
function sendNotFound(res, resource = 'Resource') {
  return sendError(res, `${resource} not found`, 404);
}

/**
 * Send unauthorized response
 * @param {Object} res - Express response object
 */
function sendUnauthorized(res) {
  return sendError(res, 'Unauthorized access', 401);
}

/**
 * Send forbidden response
 * @param {Object} res - Express response object
 */
function sendForbidden(res) {
  return sendError(res, 'Forbidden access', 403);
}

module.exports = {
  sendSuccess,
  sendError,
  sendValidationError,
  sendNotFound,
  sendUnauthorized,
  sendForbidden
};
