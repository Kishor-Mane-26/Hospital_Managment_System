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

exports.getAdminDashboard = (req, res) => {
  res.render("adminpage.ejs");
}
exports.getReceptonDashbord = (req, res)=>{
  res.render("receptionDashbord");
}


exports.getUsername = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await models.getlogin(email); 

    if (users.length === 0) {
      return res.send('Invalid email or password');
    }

    const user = users[0];

    if(email === 'admin@gmail.com' && password === 'admin123'){
      return res.render('adminpage', { email: user.email });
    }

    const isPasswordValid = await services.comparePassword(password, user.password); 

    if (!isPasswordValid) {
      return res.send('Invalid email or password');
    }

    switch (user.role) {
      case 'doctor':
        return res.render('doctorDashboard.ejs', { email: user.email });

      case 'receptionist':
        return res.render('receptionDashbord.ejs', { email: user.email });

      case 'admin':
        return res.render('adminpage', { email: user.email });

      default:
        return res.send('Unknown role. Please contact admin.');
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal Server Error');
  }
};




exports.registerStaff = async (req, res) => {
  const { role, name, email, password, specialization, experience, contact } = req.body;

  try {
    const hashed = await services.hashPassword(password);

    const userId = await models.createUser(email, hashed, role);
    console.log(userId);

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
    res.render('viewDoctors', { doctors: doctors });
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
