// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/api/login', AuthController.login);
router.get('/api/checkLoggedIn', AuthController.checkLoggedIn);

module.exports = router;
