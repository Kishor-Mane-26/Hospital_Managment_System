let routes = require("express");
let regCtrl = require('../controller/regCtrl')
let router = routes.Router();

router.get('/',regCtrl.regCtrl);
router.get("/home",regCtrl.gethomepage);

router.get("/login", regCtrl.getloginpage);

router.get("/register",regCtrl.getRegPage);

router.post("/saveuser",regCtrl.getUsername);

router.post("/savereg", regCtrl.registerStaff);

router.get("/admindashboard",regCtrl.getAdminDashboard);

router.get('/viewdoctors', regCtrl.viewDoctors);

router.get('/viewrecptions', regCtrl.getAllReceptionists);

module.exports=router;