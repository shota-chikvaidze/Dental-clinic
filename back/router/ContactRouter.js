const express = require('express');
const { postContacts, getContacts } = require('../controller/Contact');
const  protect  = require('../middleware/protect');
const router = express.Router()

router.post('/contact', protect, postContacts)
router.get('/getContact', getContacts)
module.exports = router