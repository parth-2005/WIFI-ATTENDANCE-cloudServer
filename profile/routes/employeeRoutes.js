const express = require('express');
const router = express.Router();
const {createEmployee, updateEmployee, deleteEmployee, getEmployee, getEmployees } = require('../controllers/employeeControllers');

router.post('/create', createEmployee);
router.put('/update', updateEmployee);
router.delete('/delete', deleteEmployee);
router.get('/get', getEmployee);
router.get('/getAll', getEmployees);

module.exports = router;