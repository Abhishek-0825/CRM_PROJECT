const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
  const { email, password } = req.body;

  //  Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  //  Password strength check
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    //  Check if email already exists
    db.query('SELECT id FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error during check' });

      if (results.length > 0) {
        return res.status(409).json({ error: 'Email already in use' });
      }

      //  Hash and insert user
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword],
        (err) => {
          if (err) return res.status(500).json({ error: 'Database error during insert' });
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) 
        return res.status(401).json({ 
            error: 'Invalid credentials' 
        });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ 
                        id: user.id, 
                        email: user.email 
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );
    res.json({ 
        message: 'Login successful', 
        token 
    });
  });
};
