const express = require('express');
const router = express.Router();
const protectAdmin = require("../middleware/protectAdmin")
const { getUserCount, allAppointment, countContact, loginAdmin } = require('../controller/Admin');
const getContact = require('../controller/Contact');
const getAppointment = require('../controller/Booking')


router.post('/login', loginAdmin);

router.get('/dashboard/userStats', protectAdmin, getUserCount);  
router.get('/dashboard/appointment', protectAdmin, allAppointment);   
router.get('/dashboard/getAppointment', protectAdmin, getAppointment.getBooking)
router.get('/dashboard/contact', protectAdmin, countContact); 
router.get('/dashboard/getContact', protectAdmin, getContact.getContacts);

module.exports = router;
