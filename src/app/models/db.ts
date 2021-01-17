const mysqlconnect = require("mysql");
const dbConfigconnect = require("../config/db.config");

// Create a connection to the database
let connectionconnect: any = mysqlconnect.createConnection({
  host: dbConfigconnect.HOST,
  user: dbConfigconnect.USER,
  password: dbConfigconnect.PASSWORD,
  database: dbConfigconnect.DB
});

//open the mysql connection:
connectionconnect.connect( (error: Error)=>{
	if (error) throw error;
	// console.log("Successfully connected to the database..."); 
});

module.exports = connectionconnect;