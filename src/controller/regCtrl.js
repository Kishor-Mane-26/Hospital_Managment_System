const { response } = require("../app");
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



exports.viewDoctors = (req, res) => {
  const doctors = models.GetAllDoctor((err, result) => {
    if (err) {
      console.log("Error while gettinfg doxtor");
    } else {
      console.log("Controller doctors ", result);
    }
    res.render("viewDoctors", { doctors: result });
  });
};
