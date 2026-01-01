// Date utility functions

/**
 * Calculate reminder date by subtracting days from event date
 * @param {Date} eventDate - The event date
 * @param {number} daysBefore - Days before event to send reminder
 * @returns {Date} Reminder date
 */
function calculateReminderDate(eventDate, daysBefore) {
  const reminderDate = new Date(eventDate);
  reminderDate.setDate(reminderDate.getDate() - daysBefore);
  return reminderDate;
}

/**
 * Format date to readable string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Check if a date is in the past
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is in the past
 */
function isPastDate(date) {
  return new Date(date) < new Date();
}

/**
 * Get days until event
 * @param {Date} eventDate - Event date
 * @returns {number} Days until event (negative if past)
 */
function getDaysUntil(eventDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const event = new Date(eventDate);
  event.setHours(0, 0, 0, 0);
  const diffTime = event - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

module.exports = {
  calculateReminderDate,
  formatDate,
  isPastDate,
  getDaysUntil
};
