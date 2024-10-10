const Employee = require("../../models/employeeModel");
const User = require("../../models/userModel");

const createEmployee = async (req, res) => {
    try {
        const { name, uId } = req.body;

        const existingUser = await User.findOne({ _id: req.user._id, role: 'employee' });
        if (!existingUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const newEmployee = new Employee({
            user: req.user._id,
            name,
            uId
        });
        await newEmployee.save();
        res.status(201).json({
            message: 'Employee created successfully',
            employee: newEmployee
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { name, uId } = req.body;
        const employee = await Employee.findOne({ user: req.user._id });
        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }
        employee.name = name;
        employee.uId = uId;
        await employee.save();
        res.status(200).json({
            message: 'Employee updated successfully',
            employee
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findOne({ user: req.user._id });
        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }
        await employee.remove();
        res.status(200).json({
            message: 'Employee deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findOne({ user: req.user._id });
        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }
        res.status(200).json({
            employee
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({
            employees
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { createEmployee, updateEmployee, deleteEmployee, getEmployee, getEmployees };