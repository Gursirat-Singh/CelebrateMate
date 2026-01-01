const Event = require('../models/event.model');
const reminderService = require('./reminder.service');

class EventService {
  // Create a new event
  async createEvent(eventData, userId) {
    const event = await Event.create({
      ...eventData,
      createdBy: userId
    });

    // Calculate and store reminder (stub)
    const reminderInfo = await reminderService.createReminder(event);

    return {
      event,
      reminder: reminderInfo
    };
  }

  // Get all events for a user
  async getUserEvents(userId) {
    return await Event.find({ createdBy: userId })
      .sort({ eventDate: 1 })
      .populate('createdBy', 'email');
  }

  // Get single event by ID
  async getEventById(eventId, userId) {
    const event = await Event.findOne({ _id: eventId, createdBy: userId })
      .populate('createdBy', 'email');

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  }

  // Update event
  async updateEvent(eventId, updateData, userId) {
    const event = await Event.findOneAndUpdate(
      { _id: eventId, createdBy: userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!event) {
      throw new Error('Event not found');
    }

    // Update reminder if needed
    if (updateData.eventDate || updateData.reminderDaysBefore) {
      await reminderService.updateReminder(event);
    }

    return event;
  }

  // Delete event
  async deleteEvent(eventId, userId) {
    const event = await Event.findOneAndDelete({ _id: eventId, createdBy: userId });

    if (!event) {
      throw new Error('Event not found');
    }

    // Remove reminder
    await reminderService.deleteReminder(eventId);

    return { message: 'Event deleted successfully' };
  }
}

module.exports = new EventService();
