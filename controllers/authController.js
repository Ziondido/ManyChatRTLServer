// controllers/authController.js

const jwtUtils = require('../utils/jwt');
const userModel = require('../models/userModel');
const axios = require('axios');

exports.verifyToken = async (req, res) => {
  const { id_token } = req.body;

  if (!id_token) {
    console.error('ID token is required');
    return res.status(400).json({ success: false, message: 'ID token is required' });
  }

  try {
    // Verify the ID token with Google
    const decoded = await jwtUtils.verifyIdToken(id_token);

    console.debug('Decoded User Data:', decoded);

    const { sub: id, email } = decoded;

    // Fetch additional user info from Google
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${id_token}`
      }
    });

    const userInfo = userInfoResponse.data;
    console.debug('Fetched User Info:', userInfo);

    // Save user info to the database
    await userModel.saveUser({
      id,
      email,
      name: userInfo.name || null,
      given_name: userInfo.given_name || null,
      family_name: userInfo.family_name || null,
      picture: userInfo.picture || null,
      locale: userInfo.locale || null
    });

    console.debug('User data saved successfully:', { id, email });
    res.status(200).json({ success: true, email });
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
