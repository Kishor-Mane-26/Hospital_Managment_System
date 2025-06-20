const db = require('../config/db');

exports.insertPatient = async (patients, user) => {
    const conn = await db.getConnection();
    await conn.beginTransaction();
    try {
        const [userResult] = await conn.query(
            'INSERT INTO user (email, password) VALUES (?, ?)',
            [user.email, user.password]
        );
        const userId = userResult.insertId;

        await conn.query(
            'INSERT INTO patients (name, age, contact, issue, admitted, discharge, room_no, doctorId, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [patients.name, patients.age, patients.contact, patients.issue, patients.admitted, patients.discharge, patients.room_no, patients.doctorId, patients.gender]
        );
        await conn.commit();
        conn.release();
        return true;
    } catch (error) {
        await conn.rollback();
        conn.release();
        throw error;
    }
};

exports.getAllPatients = async () => {
    const [rows] = await db.query('SELECT * FROM patients');
    return rows;
};

exports.getPatientById = async (id) => {
    const [rows] = await db.query('SELECT * FROM patients WHERE patientId = ?', [id]);
    return rows[0];
};

exports.updatePatient = async (id, patient) => {
    await db.query(
        'UPDATE patients SET name=?, age=?, contact=?, issue=?, admitted=?, discharge=?, room_no=?, doctorId=?, gender=? WHERE patientId = ?',
        [patient.name, patient.age, patient.contact, patient.issue, patient.admitted, patient.discharge, patient.room_no, patient.doctorId, patient.gender, id]
    );
};

exports.deletePatient = async (id) => {
    await db.query('DELETE FROM patients WHERE patientId = ?', [id]);
};

exports.searchPatients = async (keyword) => {
    const [rows] = await db.query(`SELECT * FROM patients WHERE name LIKE ? OR contact LIKE ?`, [`%${keyword}%`, `%${keyword}%`]);
    return rows;
};
