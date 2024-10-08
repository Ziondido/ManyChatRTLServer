// controllers/adminController.js

const path = require('path');
const userModel = require('../models/userModel');
const pageModel = require('../models/pageModel');

// Middleware to protect admin routes
exports.adminAuth = (req, res, next) => {
  const { admin_key } = req.query;

  // Simple authentication using a hardcoded key (for demonstration purposes)
  const ADMIN_KEY = 'your_admin_key_here'; // Replace with a secure key

  if (admin_key && admin_key === ADMIN_KEY) {
    next();
  } else {
    
    res.status(401).send('Unauthorized');
  }
};

exports.adminPanel = (req, res) => {
  res.sendFile('admin.html', { root: path.join(__dirname, '../public') });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch users.' });
  }
};

exports.getPages = async (req, res) => {
  try {
    const pages = await pageModel.getAllPages();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch pages.' });
  }
};
