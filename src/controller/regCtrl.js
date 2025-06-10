exports.regCtrl=(req,res)=>{
    res.send('hello world');
}
exports.getloginpage=(req,res)=>{
    res.render("login.ejs");
};