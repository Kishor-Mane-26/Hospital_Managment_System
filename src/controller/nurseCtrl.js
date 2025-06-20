const nurseModel = require('../models/nurseModel');

exports.renderRegisterPage = (req, res) => {
    res.render('registerNurse');
};

exports.registerNurse = async (req, res) => {
    const { email, password, department, shift, qualification, experience } = req.body;
    await nurseModel.insertNurse({ email, password }, { department, shift, qualification, experience });
    res.redirect('/viewnurses');
};

exports.viewNurses = async (req, res) => {
    const search = req.query.search || '';
    const nurse = await nurseModel.getAllNurses(search);
    res.render('viewNurses', { nurse });
};

exports.renderEditPage = async (req, res) => {
    const nurse = await nurseModel.getNurseById(req.params.id);
    res.render('editNurse', { nurse });
};

exports.updateNurse = async (req, res) => {
    const { email, password, department, shift, qualification, experience, status } = req.body;
    await nurseModel.updateNurse(req.params.id, { email, password }, { department, shift, qualification, experience, status });
    res.redirect('/viewnurses');
};

exports.deleteNurse = async (req, res) => {
    await nurseModel.deleteNurse(req.params.id);
    res.redirect('/viewnurses');
};
