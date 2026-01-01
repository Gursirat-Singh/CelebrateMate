const dateUtil = require('../utils/date.util');

class ReminderService {
  // Create reminder for an event (stub)
  async createReminder(event) {
    const reminderDate = dateUtil.calculateReminderDate(
      event.eventDate,
      event.reminderDaysBefore
    );

    // In a real implementation, this would store reminder in database
    // For now, just return reminder info
    const reminder = {
      eventId: event._id,
      reminderDate,
      daysBefore: event.reminderDaysBefore,
      message: `Reminder for ${event.title} on ${dateUtil.formatDate(event.eventDate)}`,
      // Future: status, notification method, etc.
    };

    console.log('Reminder created (stub):', reminder);
    return reminder;
  }

  // Update reminder when event changes (stub)
  async updateReminder(event) {
    // Recalculate reminder date
    const reminderDate = dateUtil.calculateReminderDate(
      event.eventDate,
      event.reminderDaysBefore
    );

    const reminder = {
      eventId: event._id,
      reminderDate,
      daysBefore: event.reminderDaysBefore,
      message: `Updated reminder for ${event.title} on ${dateUtil.formatDate(event.eventDate)}`,
    };

    console.log('Reminder updated (stub):', reminder);
    return reminder;
  }

  // Delete reminder (stub)
  async deleteReminder(eventId) {
    console.log('Reminder deleted (stub) for event:', eventId);
    return { eventId, deleted: true };
  }

  // Future method for processing reminders (when cron is implemented)
  async processReminders() {
    // This would check for reminders that need to be sent
    console.log('Processing reminders (stub)');
    // Query reminders where reminderDate <= now and status = pending
    // Send notifications
    // Update status
  }
}

module.exports = new ReminderService();
