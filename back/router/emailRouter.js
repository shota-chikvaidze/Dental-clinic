const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../email');

router.post('/', forgotPassword);
router.post('/:token', resetPassword);

module.exports = router;
