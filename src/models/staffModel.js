const db = require("../config/db");

exports.createUser = async (email, password, role) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO user (email, password, role) VALUES (?, ?, ?)",
      [email, password, role]
    );

    // console.log("Result from db.execute():", result);

    const insertId = result.insertId;
    // console.log("insertId:", insertId);

    return insertId;
  } catch (err) {
    console.error("Error in createUser:", err);
    throw err;
  }
};


// Create doctor
exports.createDoctor = async (name, specialization, experience, userId) => {
  try {
    await db.execute(
      'INSERT INTO doctors (name, specialization, experience, userId) VALUES (?, ?, ?, ?)',
      [name, specialization, experience, userId]
    );
  } catch (err) {
    throw err;
  }
};

// Create receptionist
exports.createReceptionist = async (name, userId, contact) => {
  try {
    await db.execute(
      'INSERT INTO receptions (name, userId, contact) VALUES (?, ?, ?)',
      [name, contact, userId]
    );
  } catch (err) {
    throw err;
  }
};


exports.getlogin = async (email) => {
  try {
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    return rows;
  } catch (err) {
    console.error("Error in getlogin:", err);
    throw err;
  }
};


exports.getAllDoctor = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM doctors');
    return rows;
  } catch (err) {
    console.error("Error in getAllDoctor:", err);
    throw err;
  }
};

exports.GetAllReceptionists= async () => {
  try {
    const [rows] = await db.query('SELECT * FROM receptions');
    return rows;
  } catch (err) {
    console.error("GetAllReceptionists:", err);
    throw err;
  }
};

exports.deleteDoctorById = async (id) => {
    const [result] = await db.query('DELETE FROM doctors WHERE doctorId = ?', [id]);
    return result;
};

exports.deleteRecptionsById = async (id) => {
    const [result] = await db.query('DELETE FROM receptions WHERE  receptionId = ?', [id])
    return result;
};