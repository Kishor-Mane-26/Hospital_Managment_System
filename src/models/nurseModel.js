const db = require('../config/db');

exports.insertNurse = async (userData, nurseData) => {
    const [user] = await db.query("INSERT INTO user (email, password, role) VALUES (?, ?, ?)", [userData.email, userData.password, "nurse"]);
    const userId = user.insertId;
    await db.query("INSERT INTO nurse (userId, department, shift, qualification, experience, status) VALUES (?, ?, ?, ?, ?, ?)",
        [userId, nurseData.department, nurseData.shift, nurseData.qualification, nurseData.experience, 1]);
};

exports.getAllNurses = async (search = '') => {
    const [nurse] = await db.query(`
        SELECT nurse.*, user.email 
        FROM nurse 
        JOIN user ON nurse.userId = user.userId
        WHERE user.email LIKE ?
    `, [`%${search}%`]);
    return nurse;
};

exports.getNurseById = async (id) => {
    const [[nurse]] = await db.query(`
        SELECT nurse.*, user.email, user.password 
        FROM nurse 
        JOIN user ON nurse.userId = user.userId
        WHERE nurse.nurseId = ?
    `, [id]);
    return nurse;
};

exports.updateNurse = async (id, userData, nurseData) => {
    const nurse = await this.getNurseById(id);
    await db.query("UPDATE user SET email = ?, password = ? WHERE id = ?", [userData.email, userData.password, nurse.user_id]);
    await db.query("UPDATE nurse SET department = ?, shift = ?, qualification = ?, experience = ?, status = ? WHERE id = ?",
        [nurseData.department, nurseData.shift, nurseData.qualification, nurseData.experience, nurseData.status, id]);
};

exports.deleteNurse = async (id) => {
    const nurse = await this.getNurseById(id);
    await db.query("DELETE FROM nurse WHERE userId = ?", [id]);
    await db.query("DELETE FROM user WHERE userId = ?", [nurse.userId]);
};
