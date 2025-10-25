const express = require('express');
const { booking, getBooking, getBookedSlots } = require('../controller/Booking');
const  protect  = require('../middleware/protect');

const router = express.Router();

router.post('/book', protect, booking);
router.get('/book', getBooking)
router.get('/booked-slots', getBookedSlots);

module.exports = router;