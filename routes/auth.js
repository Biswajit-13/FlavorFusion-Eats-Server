const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const bcrypt = require('bcrypt');

// Your JWT secret key (keep this secret and secure)
const jwtSecret = 'b2e0aeb7e23b74e487c1f417a1c940c8897f1af5e3c9e1b76c5841c940936912';

console.log(jwtSecret)
// Create a transporter for sending verification emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'biswajitpaul8446@gmail.com', // Replace with your Gmail email address
        pass: 'agrmgswyflczcsgu',  // Replace with your Gmail password or app password
    },
});

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password,username,address,pin } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.isVerified) {
                return res.status(400).json({ message: 'User already exists' });
            } else {
                // If user exists but is not verified, update the OTP and send it again
                const otp = Math.floor(100000 + Math.random() * 900000);
                existingUser.otp = otp;
                await existingUser.save();

                await transporter.sendMail({
                    to: email,
                    subject: 'Verify Your Email',
                    html: `Your new verification OTP is: ${otp}`,
                });

                return res.status(201).json({ message: 'OTP sent again! Check your email', otp });
            }
        }

        const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
        // Create a verification token
        const verificationToken = jwt.sign({ email }, jwtSecret, {
            expiresIn: '7d', // Token expires in 7 day
        });

        // Save user with verification token
        const newUser = new User({username , email, password,address,pin, verificationToken, otp,});
        await newUser.save();

        // Send verification email
        await transporter.sendMail({
            to: email,
            subject: 'Verify Your Email',
            html: `Your verification OTP is: ${otp}`,
        });

        res.status(201).json({ message: 'OTP sent! Check your email', otp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Retrieve the user by email
        const user = await User.findOne({ email });

        // Check if the user exists and the OTP matches the stored OTP
        if (user && user.otp === otp) {
            // Mark the user's email as verified
            user.isVerified = true;
            await user.save();
            return res.status(200).json({ message: 'Email verified successfully' });
        }

        res.status(400).json({ message: 'Invalid OTP' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});




router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare plain text passwords (not recommended for production)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Check if the email is verified
        if (!user.isVerified) {
            return res.status(401).json({ message: 'Email not verified' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecret, {
            expiresIn: '1d', // Token expires in 1 hour
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
