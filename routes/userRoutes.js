const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
const { signup, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/users',authMiddleware, getUsers);
router.post('/signup', signup);
router.post('/login', login);



module.exports = router;