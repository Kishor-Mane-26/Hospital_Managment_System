let routes = require("express");
let regCtrl = require('../controller/regCtrl')
let router = routes.Router();

router.get('/',regCtrl.regCtrl);
router.get("/login", regCtrl.getloginpage);

router.post("/saveuser",regCtrl.getUsername);


module.exports=router;