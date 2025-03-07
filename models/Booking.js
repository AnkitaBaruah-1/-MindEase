const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  concern: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  mode: { type: String, required: true },
  therapist: { type: String, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
