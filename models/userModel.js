const db = require('../utils/db');

module.exports = {
  saveUser: (userData) => {
    const {
      id,
      email,
      name,
      given_name,
      family_name,
      picture,
      locale,
      account_type = 'free',
    } = userData;

    const query = `
      INSERT OR REPLACE INTO users (id, email, name, given_name, family_name, picture, locale, account_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      db.run(
        query,
        [id, email, name, given_name, family_name, picture, locale, account_type],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  },
updateAccountType: (email, accountType) => {
    const query = `
      UPDATE users
      SET account_type = ?
      WHERE email = ?
    `;

    return new Promise((resolve, reject) => {
      db.run(query, [accountType, email], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  updateRtlCounter: (email) => {
    const query = `
      UPDATE users
      SET rtl_counter = rtl_counter + 1
      WHERE email = ?
    `;

    return new Promise((resolve, reject) => {
      db.run(query, [email], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  getAllUsers: () => {
    const query = 'SELECT * FROM users';

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

  // Add this function to get a user by email
  getUserByEmail: (email) => {
    const query = `
      SELECT * FROM users
      WHERE email = ?
    `;

    return new Promise((resolve, reject) => {
      db.get(query, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
};
