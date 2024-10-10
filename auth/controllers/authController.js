const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const { sendMail } = require('../../utils/mailService');

require('dotenv').config();

const Salt = Number(process.env.ENCRYPT_KEY)

const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, Salt);

        const verificationToken = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            verified: false,
            verificationToken
        });
        await newUser.save();

        const verificationLink =  'http://127.0.0.1:3000/api/v1/auth/verify/' + verificationToken;

        sendMail(email, 'Verify your email', 'verification', { verificationLink });

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
        if (!existingUser.verified) {
            return res.status(400).json({
                message: 'Email not verified'
            });
        }
        // userid as payload
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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

const logout = async (req, res) => {
    res.status(200).json({
        message: 'Logout successful'
    });
};

const verify = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        user.verified = true;
        await user.save();
        res.status(200).json({
            message: 'Email verified successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const resendVerification = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        if (user.verified) {
            return res.status(400).json({
                message: 'Email already verified'
            });
        }
        const verificationToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.verificationToken = verificationToken;
        await user.save();
        const verificationLink = process.env.URL + '/api/v1/auth/verify/' + verificationToken;
        sendMail(email, 'Verify your email', 'verification', { verificationLink });
        res.status(200).json({
            message: 'Verification link sent successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.resetToken = resetToken;
        await user.save();
        const resetLink = process.env.URL + '/api/v1/auth/reset/' + resetToken;
        sendMail(email, 'Reset your password', 'reset', { resetLink });
        res.status(200).json({
            message: 'Reset link sent successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, Salt);
        user.password = hashedPassword;
        user.resetToken = null;
        await user.save();
        res.status(200).json({
            message: 'Password reset successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { register, login, logout, verify, resendVerification, forgotPassword, resetPassword };