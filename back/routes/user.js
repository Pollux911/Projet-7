const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password-validator');
const email = require('../middleware/joi');

router.post('/signup', email, password, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;