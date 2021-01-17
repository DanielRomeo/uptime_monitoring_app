import {Application} from "express";

module.exports = (app: Application) => {
  const Admin = require("../controllers/admin.controller");


  app.post("/adminlogin", Admin.login);
  app.post("/admin", Admin.create);
  app.get("/admins", Admin.findAll);
  app.get("/admin/:adminId", Admin.findOne);
  app.get("/adminlogin/:staffnumber/:password", Admin.login);
  // app.put("/admins/:adminId", admins.update);
  // app.delete("/admins/:adminId", admins.delete);

  /*some of these functions, only We will be able to do, and some ~ also the school admin will be able to do...*/

  //create modules
  // activate and inactivate a teacher from their insti..
  // activate and inactivate a student from their insti..


  // get all institutes
  // get all modules
  // get al
  
};