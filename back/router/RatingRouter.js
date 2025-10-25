const express = require('express')
const router = express.Router()
const {handleRate, getRating} = require('../controller/Rating')
const  protect  = require('../middleware/protect');

router.post('/', protect, handleRate)
router.get('/user', getRating)

module.exports = router