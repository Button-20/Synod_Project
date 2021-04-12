const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlRegistrant = require('../controllers/registrants.controller');
const ctrlAttendance = require('../controllers/attendance.controller');

const jwtHelper = require('../config/jwtHelper');

// Users
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/users', jwtHelper.verifyJwtToken, ctrlUser.get);
router.get('/users/:id',jwtHelper.verifyJwtToken, ctrlUser.getID);
router.put('/users/:id', jwtHelper.verifyJwtToken, ctrlUser.put);
// router.put('/userspermission/:id', ctrlUser.putLoginPermission);
router.delete('/users/:id', jwtHelper.verifyJwtToken, ctrlUser.delete);

// Registrant => localhost:3000/api/.......
router.post('/registrant', ctrlRegistrant.register);
router.get('/getallregistrant', jwtHelper.verifyJwtToken, ctrlRegistrant.get);


// Admin
router.get('/verifycode/:regId', ctrlRegistrant.getRegIdCount);
router.get('/registrant/countall', jwtHelper.verifyJwtToken, ctrlRegistrant.getAllCount);
router.get('/registrant/ministerscountall', jwtHelper.verifyJwtToken, ctrlRegistrant.getPositionMinisterCount);
router.get('/registrant/laycountall', jwtHelper.verifyJwtToken, ctrlRegistrant.getPositionLayCount);
router.get('/registrant/visitorscountall', jwtHelper.verifyJwtToken, ctrlRegistrant.getPositionVisitorsCount);
router.get('/registrant/delegatecountall', jwtHelper.verifyJwtToken, ctrlRegistrant.getCategoryDelegateCount);
router.get('/registrant/observercountall', jwtHelper.verifyJwtToken, ctrlRegistrant.getCategoryObserverCount);
router.get('/registrant/:id', ctrlRegistrant.getID);
router.put('/registrant/:id', ctrlRegistrant.put);
router.delete('/registrant/:id', ctrlRegistrant.delete);

/////////////////////////////////////////////////////////////////

// Attendance => localhost:3000/api/.......
router.post('/user/attendance/register', ctrlAttendance.register);
router.get('/user/attendance', ctrlAttendance.get);
router.get('/user/attendance/:id', ctrlAttendance.getID);
router.get('/user/attendancecount/:classname', ctrlAttendance.getCount);
router.get('/user/allattendancecount', ctrlAttendance.getAllCount);
router.get('/user/allattendancedatefilter/:startdate/:enddate', ctrlAttendance.getAllAttendanceDateFilter);
router.get('/user/attendance/classname/:classname', ctrlAttendance.getClassname);
router.put('/user/attendance/:id', ctrlAttendance.put);
router.delete('/user/attendance/:id', ctrlAttendance.delete);


module.exports = router;