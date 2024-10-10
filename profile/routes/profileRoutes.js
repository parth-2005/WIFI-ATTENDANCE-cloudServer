const employeeRoutes = require('./employeeRoutes');
const adminRoutes = require('./adminRoutes');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../auth/middlewares/authMiddleware');

router.use('/employee', authMiddleware, employeeRoutes);
router.use('/admin', authMiddleware, adminRoutes);

module.exports = router;