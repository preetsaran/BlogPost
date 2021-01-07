const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
    body
} = require('express-validator');
const {
    logIn,
    authenticatedUser
} = require('../controllers/authController');
const check = [
    body('email', 'Please include valid email').isEmail(),
    body('password', 'Password is required').exists()
]



router
    .route('/')
    .get(auth, authenticatedUser)
    .post(check, logIn)

module.exports = router;