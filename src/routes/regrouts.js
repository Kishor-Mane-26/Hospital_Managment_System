let routes = require("express");
let regCtrl = require('../controller/regCtrl')
let router = routes.Router();

router.get('/',regCtrl.regCtrl);

router.get('/home',regCtrl.gethomepage);

router.get("/login", regCtrl.getloginpage);

router.get("/register",regCtrl.getRegPage);

router.post("/saveuser",regCtrl.getUsername);


module.exports=router;