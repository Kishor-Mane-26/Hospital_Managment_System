let models = require("../models/staffModel");
let services = require("../services/hashService");

exports.regCtrl = (req, res) => {
  res.send("hello world");
};
exports.getloginpage = (req, res) => {
  res.render("login.ejs");
};

exports.gethomepage = (req, res) => {
  res.render("Home.ejs");
};

exports.getRegPage = (req, res) => {
  res.render("register.ejs");
};

exports.getAdminDashboard=(req,res) => {
  res.render("adminpage.ejs");
}

exports.getUsername = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    res.render("adminpage.ejs");
  } else {
    res.send("Invalid username or password");
  }
};



exports.registerStaff = async (req, res) => {
  const { role, name, email, password, specialization, experience, contact } = req.body;

  try {
    const hashed = await services.hashPassword(password);

    // Save user and get userId
    const userId = await models.createUser(email, hashed, role);
    console.log(userId);
    
    // Save extra info based on role
    if (role === "doctor") {
      await models.createDoctor(name, specialization, experience, userId);
    } else if (role === "receptionist") {
      await models.createReceptionist(name, contact, userId);
    }

    res.redirect("/register");
  } catch (err) {
    console.error("Error in registerStaff:", err);
    res.status(500).send("Registration failed.");
  }
};



exports.viewDoctors = async (req, res) => {
  try {
    const result = await models.getAllDoctor();
    console.log(result);
    
    res.render("viewDoctors", { doctors: result });
  } catch (err) {
    console.error("Error while getting doctors:", err);
    res.status(500).send("Error fetching doctors");
  }
};

exports.getAllReceptionists = async (req, res) => {
  try {
    const result = await models.GetAllReceptionists();
    res.render("viewRecptions", { receptions: result });
  } catch (err) {
    console.error("Error while getting receptions:", err);
    res.status(500).send("Error fetching receptions");
  }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        await models.deleteDoctorById(doctorId);
        const doctors = await models.getAllDoctor();
        res.render('viewDoctors', { doctors :doctors});
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).send('Server Error');
    }
};

exports.deleteReceptionist = async (req, res) => {
    try {
        const receptionId = req.params.id;
        await models.deleteRecptionsById(receptionId);
        const receptions = await models.GetAllReceptionists();
        res.render('viewRecptions', { receptions: receptions });
    } catch (error) {
        console.error('Error deleting receptionist:', error);
        res.status(500).send('Server Error');
    }
};
