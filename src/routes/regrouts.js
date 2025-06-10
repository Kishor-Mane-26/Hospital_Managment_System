let routes = require("express");
let regCtrl = require('../controller/regCtrl')
let router = routes.Router();

router.get('/',regCtrl.regCtrl);
router.get("/login", regCtrl.getloginpage);


module.exports=router;