const eventService = require('../services/event.service');
const { sendSuccess, sendError } = require('../utils/response.util');

/**
 * Create a new event
 * POST /api/events
 */
const createEvent = async (req, res) => {
  try {
    const result = await eventService.createEvent(req.body, req.user.id);

    sendSuccess(res, 'Event created successfully', result, 201);
  } catch (error) {
    sendError(res, error.message, 400);
  }
};

/**
 * Get all events for the logged-in user
 * GET /api/events
 */
const getUserEvents = async (req, res) => {
  try {
    const events = await eventService.getUserEvents(req.user.id);

    sendSuccess(res, 'Events retrieved successfully', { events });
  } catch (error) {
    sendError(res, error.message);
  }
};

/**
 * Get single event by ID
 * GET /api/events/:id
 */
const getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id, req.user.id);

    sendSuccess(res, 'Event retrieved successfully', { event });
  } catch (error) {
    if (error.message === 'Event not found') {
      sendError(res, error.message, 404);
    } else {
      sendError(res, error.message);
    }
  }
};

/**
 * Update event
 * PUT /api/events/:id
 */
const updateEvent = async (req, res) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body, req.user.id);

    sendSuccess(res, 'Event updated successfully', { event });
  } catch (error) {
    if (error.message === 'Event not found') {
      sendError(res, error.message, 404);
    } else {
      sendError(res, error.message, 400);
    }
  }
};

/**
 * Delete event
 * DELETE /api/events/:id
 */
const deleteEvent = async (req, res) => {
  try {
    const result = await eventService.deleteEvent(req.params.id, req.user.id);

    sendSuccess(res, 'Event deleted successfully', result);
  } catch (error) {
    if (error.message === 'Event not found') {
      sendError(res, error.message, 404);
    } else {
      sendError(res, error.message);
    }
  }
};

module.exports = {
  createEvent,
  getUserEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
