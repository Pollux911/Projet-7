const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password-validator');
const email = require('../middleware/joi');
const auth = require('../middleware/auth');

router.get('/user/:id', userCtrl.getUser)
router.post('/signup', /*email, password,*/ userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/deleteUser', auth, userCtrl.deleteUser)

module.exports = router;
