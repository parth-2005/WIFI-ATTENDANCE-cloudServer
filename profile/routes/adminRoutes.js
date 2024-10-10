const express = require('express');
const router = express.Router();
const {createAdmin, updateAdmin, deleteAdmin, getAdmin, getAdmins } = require('../controllers/adminControllers');

router.post('/create', createAdmin);
router.put('/update', updateAdmin);
router.delete('/delete', deleteAdmin);
router.get('/get', getAdmin);
router.get('/getAll', getAdmins);

module.exports = router;