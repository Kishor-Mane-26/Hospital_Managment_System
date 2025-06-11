exports.regCtrl=(req,res)=>{
    res.send('hello world');
}
exports.getloginpage=(req,res)=>{
    res.render("login.ejs");
};

exports.gethomepage=(req,res)=>{
    res.render("Home.ejs");
};
exports.getUsername=(req,res)=>{
    let{username} = req.body;
    if(username == "admin"){
        res.render("adminpage.ejs");
    }
}