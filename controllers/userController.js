const db = require('../config/db');

const getUsers = (req, res) => {
  db.query('SELECT id, email FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
};

module.exports = { getUsers };