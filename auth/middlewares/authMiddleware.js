// create authentification middleware
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        // x-auth-token
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ msg: 'Token is not valid' });
        }
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ msg: 'Token is not valid' });
        }
        if (user.role !== 'admin') {
            return res.status(401).json({ msg: 'Not authorized as admin' });
        }
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = { authMiddleware, adminMiddleware };