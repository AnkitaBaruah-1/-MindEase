const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Booking saved successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); 

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    console.log('Bookings found:', bookings); 
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error); 
    res.status(500).json({ error: error.message });
  }
});




router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
