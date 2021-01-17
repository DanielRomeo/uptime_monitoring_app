import {Application} from "express";

module.exports = (app: Application) => {
  const Student = require("../controllers/student.controller");

  
  app.post("/login", Student.login); 			// login
  app.post("/createstudent", Student.create); 			// create a student
  // app.post("/deletestudent", Student.delete); 			// delete a student
  // app.put("/editstudent/:studentId", Student.edit); 	// edit a student
  app.get("/getstudent/:studentId", Student.findOne); 	// get single student
  app.get("/getstudents", Student.findAll); 			// get all students
  app.get("/getstudentsfrominstitution/:institutionId", Student.studentsFromInstitution); // all students from a particular school
  // get a students modules
  // get all students that do a module
  // get all active students
  // get all inactive students
  // get students from an institute

  // get all tests from my module
  // get all 
  // get all assignments from my module

};

// should be able to do things like 
// /getstudents?institutionid=5&active=true&