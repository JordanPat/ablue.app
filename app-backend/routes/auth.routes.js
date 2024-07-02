const express = require('express');
const router = express.Router();
const { register, login, googleAuth } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth); // For handling Google OAuth

module.exports = router;
