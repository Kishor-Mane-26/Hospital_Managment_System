const patientModel = require('../models/patientModel');

exports.registerPatientPage = async(req, res) => {
    const doctors = await doctorModel.getAllDoctor();
       console.log(doctors);
        
        
        res.render('registerPatient', { doctors:doctors });
};

const doctorModel = require('../models/staffModel');

exports.getRegisterPatientPage = async (req, res) => {
    try {
        // Fetch doctors for dropdown
        const doctors = await doctorModel.getAllDoctor();
        console.log(doctors);
        
        
        res.render('registerPatient', { doctors:doctors });
    } catch (error) {
        console.error('Error loading patient registration page:', error);
        res.status(500).send('Server Error');
    }
};

exports.registerPatient = async (req, res) => {
    try {
        const { name, age, contact, issue, admitted, discharge, room_no, doctorId, gender, email, password } = req.body;

        const patient = {
            name,
            age,
            contact,
            issue,
            admitted,
            discharge,
            room_no,
            doctorId,
            gender
        };

        const user = { email, password };

        await patientModel.insertPatient(patient, user);
        res.redirect('/patients/viewpatient');
    } catch (error) {
        console.error('Error registering patient:', error);
        res.status(500).send('Server Error');
    }
};

exports.viewPatients = async (req, res) => {
    const patients = await patientModel.getAllPatients();
    res.render('viewPatients', { patients });
};

exports.searchPatients = async (req, res) => {
    const { keyword } = req.query;
    const patients = await patientModel.searchPatients(keyword);
    res.render('viewPatients', { patients });
};

exports.editPatientPage = async (req, res) => {
    const patient = await patientModel.getPatientById(req.params.id);
    res.render('editPatient', { patient });
};

exports.updatePatient = async (req, res) => {
    await patientModel.updatePatient(req.params.id, req.body);
    res.redirect('/patients/viewpatient');
};

exports.deletePatient = async (req, res) => {
    await patientModel.deletePatient(req.params.id);
    res.redirect('/patients/viewpatient');
};
