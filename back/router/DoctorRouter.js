const express = require('express')
const {addDoctor, getDoctors} = require('../controller/Doctor')
const protectAdmin = require("../middleware/protectAdmin")

console.log('fdpeiwjoiufwn')

const router = express.Router()

router.post('/post-doctor', protectAdmin, addDoctor)
router.get('/get-doctor', getDoctors)

module.exports = router