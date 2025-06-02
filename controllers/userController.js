const db = require('../config/db');

const getUsers = (req, res) => {
  db.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) 
        return res.status(500).json({
            error: 'Database error' 
        });
    res.status(200).json({ 
        message: 'API is working!',
        dbResult: results[0].result 
    });
  });
};

module.exports = { getUsers };