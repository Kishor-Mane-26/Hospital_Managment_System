let express = require('express');
let app = express();
app.set("view engine","ejs");
const path=require("path");

app.use(express.static("public"));

app.use(require('./routes/regrouts'));


module.exports=app;