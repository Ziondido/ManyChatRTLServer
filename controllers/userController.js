// controllers/userController.js

const userModel = require('../models/userModel');
const pageModel = require('../models/pageModel'); // Import pageModel

// Track page views and increment RTL counter
exports.trackPage = async (req, res) => {
    const { email, pageUrl } = req.body;

    if (!email || !pageUrl) {
        return res.status(400).json({ success: false, message: 'Email and page URL are required' });
    }

    try {
        // Save the page view to the database using pageModel
        await pageModel.savePageView(email, pageUrl);

        // Update the RTL counter using userModel
        await userModel.updateRtlCounter(email);

        res.status(200).json({ success: true, message: 'Page view tracked and RTL counter updated' });
    } catch (error) {
        console.error('Error tracking page view:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Get all users (admin use only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Get a specific user's details (including status and RTL counter)
exports.getUserDetails = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            email: user.email,
            account_type: user.account_type,
            rtl_counter: user.rtl_counter
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.updateAccountType = async (req, res) => {
    const { email, accountType } = req.body;

    if (!email || !accountType) {
        return res.status(400).json({ success: false, message: 'Email and account type are required' });
    }

    const validAccountTypes = ['pro', 'free']; // List of valid account types
    if (!validAccountTypes.includes(accountType)) {
        return res.status(400).json({ success: false, message: 'Invalid account type' });
    }

    try {
        await userModel.updateAccountType(email, accountType);
        res.status(200).json({ success: true, message: 'Account type updated successfully' });
    } catch (error) {
        console.error('Error updating account type:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
