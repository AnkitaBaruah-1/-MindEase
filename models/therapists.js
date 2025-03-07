const mongoose = require('mongoose');


const therapistSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: String,
  fees: String,
  description: String,
  image: String
});

const Therapist = mongoose.model('Therapist', therapistSchema);
module.exports = Therapist;
