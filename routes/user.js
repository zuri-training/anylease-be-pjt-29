const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// import the router controller
const usersController = require('controllers/usersController');


//Register new user
router.post('/register', (req, res) => {
    res.send('Register');
});
//Login user route
router.post('/api/auth/login', 
    [
        check("email", "please enter a valid email").isEmail(),
        check("password", "A valid password is required").exists(),
    ],
usersController.loginUser
);

router.get("/api/auth", auth, userController.getLoggedInUser);

module.exports = router;