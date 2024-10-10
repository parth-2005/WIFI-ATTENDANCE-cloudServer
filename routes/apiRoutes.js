const express = require('express');
const router = express.Router();
const authRoutes = require('../auth/routes/authRoutes');
const profileRoutes = require('../profile/routes/profileRoutes');

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);

module.exports = router;