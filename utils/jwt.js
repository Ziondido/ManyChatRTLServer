// utils/jwt.js

const fetch = require('node-fetch');

module.exports = {
  verifyIdToken: (idToken) => {
    return new Promise((resolve, reject) => {
      // Use Google API to validate the access token (idToken)
      fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${idToken}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.aud && data.sub) {
            // Token is valid, resolve with the decoded data
            resolve(data);
          } else {
            reject(new Error("Invalid token"));
          }
        })
        .catch(error => reject(error));
    });
  }
};
