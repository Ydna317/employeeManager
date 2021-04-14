const util = require("util");
const mysql = require("mysql");

const dbconnect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nguya114",
  database: "employees"
});

dbconnect.connect();
dbconnect.query = util.promisify(dbconnect.query);

module.exports = dbconnect;
