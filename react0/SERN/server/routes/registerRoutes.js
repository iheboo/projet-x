// routes/registerRoutes.js
const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');

router.post('/api/register', RegisterController.register);

module.exports = router;
