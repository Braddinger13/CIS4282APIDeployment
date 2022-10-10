const mysql = require("mysql");
require("dotenv").config();


//Creates connection
//create pool defaults to 10 connnections. Can change by specifying connectionLimit: #
const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 15
});



console.log("Database Connection to " + process.env.DATABASE);

module.exports = db;