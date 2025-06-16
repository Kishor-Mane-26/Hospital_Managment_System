const app = require("./src/app");
const db = require('./src/config/db'); // This is a pool, not a function

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});