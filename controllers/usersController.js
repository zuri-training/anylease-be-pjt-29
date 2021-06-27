const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { SECRET } = process.env;



exports.registerUser = async ( req, res) => {
    try {

    } catch {
        
    }
}


//@route    GET api/auth/
//@desc     Auth user(user, leaser, admin) and get token
//@access   Public
exports.getLoggedInUser = async (req, res) => {
    try {
        //Get user from db
        const user = await User.findById(req.user.id).select("-password");

        //return user
        res.json({
            statusCode: 200,
            message: "User gotten successfully",
            user
        })
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error!")
    }
}

// route    POST api/auth/login
// @desc    Auth user(student, tutor, admin) and get token
// @access  Public
exports.loginUser = async (req, res) => {
    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

    //else
    //destructure request body
    const { email, password } = req.body;

    try {
        //initialise user
        let user = await User.findOne({ email });

        if(!user) return res
        .status(400).json({ statusCode: 400, message: "invalid credentials"});

        //else
        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ 
            statusCode : 400,  
            message: "Invalid credentials"
        });

        //else
        // there's a match, send token
        // Send payload,  and signed token
        const payload = {
            user: {
                id: user.id,
            }
        };

        jwt.sign(
            payload, SECRET,
            {
                expiresIn: 90000,
            },
            (err, token) => {
                if (err) throw err; 
                    res.json({
                        statusCode: 200,
                        message: "Logged in successfully",
                        user: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            userRole: user.userRole,
                            isLeaser: user.isLeaser,
                            isAdmin: user.isAdmin
                        },
                        token
                    })
            }
        );

    } catch (error) {
        console.error(err.message);

        res.status(500)
    }
}