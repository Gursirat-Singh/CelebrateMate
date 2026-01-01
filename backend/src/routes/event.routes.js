const express = require('express');
const {
  createEvent,
  getUserEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/event.controller');
const { validateEvent } = require('../middlewares/validate.middleware');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// All event routes require authentication
router.use(authenticate);

// Routes
router.post('/', validateEvent, createEvent);
router.get('/', getUserEvents);
router.get('/:id', getEventById);
router.put('/:id', validateEvent, updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
