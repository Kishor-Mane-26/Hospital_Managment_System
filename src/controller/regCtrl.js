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

// const { insertStaff } = require("../models/staffModel");
// const { hashPassword } = require("../services/hashService");

exports.saveStaff = async (req, res) => {
  const { name, email, password, role, specialization, experience } = req.body;

  try {
    const hashedPassword = await services.hashPassword(password);

    const staff = {
      name,
      email,
      password: hashedPassword,
      role,
      specialization,
      experience,
    };

    models.insertStaff(staff, (err, result) => {
      if (err) {
        console.error("DB Insert Error:", err);
        return res.status(500).send("Error registering staff.");
      }
      res.redirect("/register");
    });
  } catch (err) {
    console.error("Hash Error:", err);
    res.status(500).send("Internal server error");
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
