const Admin = require("../../models/adminModel");
const User = require("../../models/userModel");

const createAdmin = async (req, res) => {
    try {
        const { name, uId} = req.body;
        // existingUser with req.user._id & role: 'admin'
        const existingUser = await User.findOne({ _id: req.user._id, role: 'admin' });
        if (!existingUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const newAdmin = new Admin({
            user: req.user._id,
            name,
            uId
        });
        await newAdmin.save();
        res.status(201).json({
            message: 'Admin created successfully',
            admin: newAdmin
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateAdmin = async (req, res) => {
    try {
        const { name, uId } = req.body;
        const admin = await Admin.findOne({ user: req.user._id });
        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found'
            });
        }
        admin.name = name;
        admin.uId = uId;
        await admin.save();
        res.status(200).json({
            message: 'Admin updated successfully',
            admin
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ user: req.user._id });
        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found'
            });
        }
        await admin.remove();
        res.status(200).json({
            message: 'Admin deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ user: req.user._id });
        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found'
            });
        }
        res.status(200).json({
            admin
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json({
            admins
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { createAdmin, updateAdmin, deleteAdmin, getAdmin, getAdmins };