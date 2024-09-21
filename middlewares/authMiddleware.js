const jwt = require('jsonwebtoken');
const user = require('../models/userModel');
require('dotenv').config();

// will have x-auth-token in headers
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        const existingUser = await user.findOne({ email: decoded.email });
        if (!existingUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        req.user = existingUser;
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};