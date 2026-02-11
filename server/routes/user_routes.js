const express = require('express')
const router = express.Router()
const { createAccount, loginUser, currentUser } = require('../controllers/user_controller');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/register', createAccount);

router.post('/login', loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router