/*

/session/create
/session/update
/session/delete
/session/
/attendance/create
/attendance/:sessionId
/atendance/:userId
/attendance/:sessionId/:userId
/attendance/:sessionId/:userId/update
/attendance/:sessionId/:userId/delete

*/

const express = require('express');
const router = express.Router();
const { createSession, updateSession, deleteSession, getSession, getSessionList } = require('../controllers/sessionController');
const { createAttendance, getAttendance, updateAttendance, deleteAttendance } = require('../controllers/attendanceController');