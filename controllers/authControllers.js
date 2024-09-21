const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const Salt = Number(process.env.ENCRYPT_KEY)

const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, Salt);
        const newUser = new User({
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password, Salt);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }
        const token = jwt.sign({ email: existingUser.email, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: '1w' });
        res.status(200).json({
            message: 'Login successful',
            token
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { register, login };