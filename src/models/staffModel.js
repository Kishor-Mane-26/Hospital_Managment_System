const db = require("../config/db");

// Create user

// Insert user and return userId
exports.createUser = async (email, password, role) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO user (email, password, role) VALUES (?, ?, ?)",
      [email, password, role]
    );

    console.log("Result from db.execute():", result);

    const insertId = result.insertId;
    console.log("insertId:", insertId);

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
exports.createReceptionist = async (name, contact, userId) => {
  try {
    await db.execute(
      'INSERT INTO receptionist (name, contact, userId) VALUES (?, ?, ?)',
      [name, contact, userId]
    );
  } catch (err) {
    throw err;
  }
};


exports.GetAllDoctor = (callback) => {
  let doctorsQuery = "select * from doctors";

  db.query(doctorsQuery, [], (err, result) => {
    if (err) {
      console.log("Error in GetAll Doctors " + err);
      return callback(err, null);
    } else {
      console.log("Get all doctors ", result);
    }
    callback(null, result)
  })

}


