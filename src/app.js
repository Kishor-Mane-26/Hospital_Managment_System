let express = require('express');
let pool = require("./config/db")
let app = express();
app.set("view engine", "ejs");
const path = require("path");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(require('./routes/regrouts'));
app.use(require('./routes/roomRoutes'));
const nurseRoutes = require('./routes/nurseRouts');
app.use('/', nurseRoutes);
const patientRoutes = require('./routes/patientRoutes');
app.use('/patients', patientRoutes);

module.exports = app;