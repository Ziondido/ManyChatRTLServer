const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const authMiddleware = require('../middleware/authMiddleware'); // Import authentication middleware

// Endpoint to track page views and update RTL counter
router.post('/track-page', userController.trackPage);

// Endpoint to fetch all users (admin use only)
router.get('/all', /*authMiddleware,*/ userController.getAllUsers);

// Endpoint to get the current user's details (including status and RTL counter)
router.post('/get-details', userController.getUserDetails);

// Endpoint to update account type (protected, admin use only)
router.put('/update-account-type', /*authMiddleware,*/ userController.updateAccountType);

module.exports = router;
