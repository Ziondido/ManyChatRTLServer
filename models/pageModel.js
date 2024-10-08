// models/pageModel.js

const db = require('../utils/db');

module.exports = {
  savePageView: (email, pageUrl) => {
    const query = `
      INSERT INTO pages (user_email, page_url)
      VALUES (?, ?)
    `;

    return new Promise((resolve, reject) => {
      db.run(query, [email, pageUrl], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  getAllPages: () => {
    const query = 'SELECT * FROM pages';

    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
};
