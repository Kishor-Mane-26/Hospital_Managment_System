exports.regCtrl=(req,res)=>{
    res.send('hello world');
}
exports.getloginpage=(req,res)=>{
    res.render("login.ejs");
};


exports.gethomepage=(req,res)=>{
    res.render("Home.ejs");
};

exports.getRegPage=(req,res)=>{
    res.render("register.ejs");
};

exports.getUsername=(req,res)=>{
    
       const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {
        res.render("adminpage.ejs");
    } else {
        res.send("Invalid username or password");
    }
}
