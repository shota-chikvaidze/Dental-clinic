const express = require('express')
const ServiceController = require('../controller/Service')
const protectAdmin = require('../middleware/protectAdmin')
const router = express.Router()

router.get('/get-services', ServiceController.getService)
router.post('/add-services', protectAdmin, ServiceController.addService)

module.exports = router