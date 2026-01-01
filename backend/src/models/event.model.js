const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: {
      values: ['birthday', 'anniversary', 'custom'],
      message: 'Event type must be birthday, anniversary, or custom'
    }
  },
  tone: {
    type: String,
    required: [true, 'Tone is required'],
    enum: {
      values: ['celebratory', 'supportive', 'remembrance', 'practical'],
      message: 'Tone must be celebratory, supportive, remembrance, or practical'
    }
  },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required']
  },
  personName: {
    type: String,
    required: [true, 'Person name is required'],
    trim: true,
    maxlength: [50, 'Person name cannot exceed 50 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  reminderDaysBefore: {
    type: Number,
    default: 7,
    min: [0, 'Reminder days cannot be negative'],
    max: [365, 'Reminder days cannot exceed 365']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Created by user is required']
  }
}, {
  timestamps: true
});

// Index for efficient queries
eventSchema.index({ createdBy: 1, eventDate: 1 });

module.exports = mongoose.model('Event', eventSchema);
