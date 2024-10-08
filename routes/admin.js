// routes/admin.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware to protect admin routes
router.use(adminController.adminAuth);

// Serve the admin panel
router.get('/', adminController.adminPanel);

// API endpoints for admin to get users and pages data
router.get('/users', adminController.getUsers);
router.get('/pages', adminController.getPages);

module.exports = router;
