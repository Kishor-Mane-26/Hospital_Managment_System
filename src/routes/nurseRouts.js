const express = require('express');
const router = express.Router();
const nurseCtrl = require('../controller/nurseCtrl');

router.get('/registerNurse', nurseCtrl.renderRegisterPage);
router.post('/regnurse', nurseCtrl.registerNurse);
router.get('/viewnurses', nurseCtrl.viewNurses);
router.get('/editnurse/:id', nurseCtrl.renderEditPage);
router.post('/editupdate/:id', nurseCtrl.updateNurse);
router.get('/deletenurse/:id', nurseCtrl.deleteNurse);

module.exports = router;
