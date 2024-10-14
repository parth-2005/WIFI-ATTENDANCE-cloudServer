/*

/session/create
/session/
/session/:sessionId

*/
const authMiddleware = require('../middlewares/authMiddleware');
const Session = require('../../models/attendanceSessionModel');
const Admin = require('../../models/adminModel');
const User = require('../../models/userModel');

const createSession = async (req, res) => {
    try {
        const admin = await Admin.findOne({ user: req.user._id });
        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found'
            });
        }
        const newSession = new Session({
            adminId: admin._id,
            // datetime.now()
            dateTime: new Date(),
        });
        await newSession.save();
        res.status(201).json({
            message: 'Session created successfully',
            session: newSession
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const admin = await Admin.findOne({ user: req.user._id });
        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found'
            });
        }
        const session = await Session.findOne({ _id: sessionId, adminId: admin._id });
        if (!session) {
            return res.status(404).json({
                message: 'Session not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getSessionList = async (req, res) => {
    try {
        const admin = await Admin.findOne({ user: req.user._id });
        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found'
            });
        }
        const sessions = await Session.find({ adminId: admin._id });
        res.status(200).json({
            sessions
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { createSession, getSession, getSessionList };