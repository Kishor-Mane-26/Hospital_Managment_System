const express = require('express');
const router = express.Router();
const patientCtrl = require('../controller/patientController');

router.get('/patientregisterpage', patientCtrl.registerPatientPage);
router.get('/patientregister', patientCtrl.registerPatientPage);
router.post('/patientregister', patientCtrl.registerPatient);
router.get('/viewpatient', patientCtrl.viewPatients);
router.get('/searchpatient', patientCtrl.searchPatients);
router.get('/editpatient/:id', patientCtrl.editPatientPage);
router.post('/updatepatient/:id', patientCtrl.updatePatient);
router.get('/deletepatient/:id', patientCtrl.deletePatient);

module.exports = router;
