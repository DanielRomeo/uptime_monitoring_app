import {Application} from "express";

module.exports = (app: Application) => {
  const Test = require("../controllers/test.controller");
  const Assignment = require("../controllers/test.controller");


  // test routes:
  app.post("/createtest", Test.create);  // create a test
  app.put("/edittest", Test.edit);// edit a test
  app.delete("/deletetest", Test.delete);// delete a test 

  // assignment routes:
  app.post("/createassignment", Assignment.create);// create assignment
  app.put("/editassignment", Assignment.edit);// edit an assignment
  app.delete("/deleteassignment", Assignment.delete); // delete an assignment




};