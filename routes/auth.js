// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for verifying token
router.post('/verify-token', authController.verifyToken);

module.exports = router;
