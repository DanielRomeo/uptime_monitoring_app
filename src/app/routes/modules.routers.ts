import { Application } from "express";

module.exports = (app: Application) => {
    const Module = require("../controllers/module.controller");

    app.post("/createmodule", Module.create); // create a module
    app.post("/addmoduletostudent", Module.StudentToModule); // gives a student a new module
    app.post("/addmoduletoteacher", Module.TeacherToModule); // gives a teacher a new module
    app.get("/getallmodules", Module.findAll); // gets all the modules
    app.get("/getstudentmodules/:student_id", Module.getStudentsModules); /*copy the teachers one and make it work*/
    app.post("/activatemodule", Module.activateModule);
    app.post("/deactivateModule", Module.deactivateModule);

    /*this works but if there are no modules assigned to this specific teacher, it returns a 500Server error*/
    app.get("/getteachermodules/:teacher_id", Module.getTeacherModules); // router that gets modules that are linked to a teacher:

    /*URLS STILL TO BE ADDED/CREATED*/
    // app.get("getallmodulesdetailed", Module.findAllDetailed); // gets all modules(the object is detailed accordingly)
    // app.post("/addmoduletoteacher", Module.TeacherToModule); // gives a teacher a new module
};
