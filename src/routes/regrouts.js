let routes = require("express");
let regCtrl = require('../controller/regCtrl')
let router = routes.Router();

router.get('/',regCtrl.regCtrl);
router.get("/login", regCtrl.getloginpage);
router.get("/register",regCtrl.getRegPage);

module.exports=router;