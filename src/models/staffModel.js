const db = require("../config/db");

exports.insertStaff = (staff, callback) => {
  const sql = `INSERT INTO doctors (name, email, password, specialization, experience)
               VALUES (?, ?, ?, ?, ?)`;
  const values = [
    staff.name,
    staff.email,
    staff.password,
    staff.role,
    // staff.role === "DOCTOR" ? staff.specialization : null,
    staff.role === "DOCTOR" ? parseInt(staff.experience) : null,
  ];

  db.query(sql, values, callback);
};


exports.GetAllDoctor= (callback) =>{
    let doctorsQuery = "select * from doctors";

    db.query(doctorsQuery,[],(err,result)=>{
        if(err){
            console.log("Error in GetAll Doctors "+err);
            return callback(err,null);
        }else{
            console.log("Get all doctors ",result);
        }
        callback(null,result)
    })

}


