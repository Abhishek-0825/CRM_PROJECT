const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
const { signup, login } = require('../controllers/authController');


router.get('/users', getUsers);
router.post('/signup', signup);
router.post('/login', login);


module.exports = router;