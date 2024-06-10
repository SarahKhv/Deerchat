const express = require('express');

const Auth = require('../controllers/auth');
const Password = require('../controllers/password');

const router = express.Router();

// Auth endpoint
router.get('/', (req, res) => { 
    res.status(200).json({message: "This is auth endpoint"});
});

// Signup route
router.post('/signup', Auth.register);

// Signin route
router.post('/signin', Auth.login);

// EMAIL verification route
router.get('/verify/:token', Auth.verify);
router.post('/resend', Auth.resendToken);

// Password reset route
router.post('/recover', Password.recover);
router.get('/reset/', Password.reset);
router.post('/reset/:token', Password.resetPassword);


module.exports = router;