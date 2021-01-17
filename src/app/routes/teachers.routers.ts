import {Application} from "express";

module.exports = (app: Application) => {
  const Teacher = require("../controllers/teacher.controller");

  app.post("/teacherlogin", Teacher.login); 			// login
  app.post("/createteacher", Teacher.create);                           // create a teacher
  app.get("/getteachers", Teacher.findAll);                          // get all teachers
  app.get("/teacher/:teacherId", Teacher.findOne);                // get a single teacher
  app.get("/teachersfrominstitution/:institutionId", Teacher.teachersFromInstitution); // get a teacher from an institute

  // app.put("/admins/:adminId", admins.update);
  // app.delete("/admins/:adminId", admins.delete);

  // add teacher to module
  // remove teacher from module

  //get all teachers teaching a particular module
  //



};