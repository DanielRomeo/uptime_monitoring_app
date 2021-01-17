// const Admin:any = require("../models/admin.model");
import {Request, Response} from "express";
import Teacher from "../models/teacher.model";

interface person{
  firstname: string,
  lastname: string,
  idnumber: number,
  staffnumber: number,
  institution_id: number,
  password: string,
  active: string,
}

/*incase i wanna create a quick user*/
const data1:person={
  
  "firstname": "daniel",
  "lastname": "mamphekgo",
  "idnumber": 9704245550080,
  "staffnumber": 2020,
  "institution_id": 1,
  "password": "password",
  "active": "true"
}

// Create and Save a new Student
exports.create = (req:any, res: any) => {
	  // Validate request
	  if (!req.body) {
	    res.status(400).send({
	      message: "Content can not be empty!"
	    });
      	console.log("empty")
	  }

    // Create an Administrator
    /*I just noticed that this si not working, for some reason its not identifying the req's*/
	  const teacher = new Teacher({
  		firstname: req.body.firstname,
  		lastname: req.body.lastname,
      idnumber: req.body.idnumber,
  		staffnumber: req.body.staffnumber,
      institution_id: req.body.institution_id,
  		password: req.body.password,
  		active: req.body.active
	  });

	  console.log('body is ',req.body);

	  // Save Teacher in the database
	  Teacher.create(teacher, (err: any, data: any) => {
	    if (err)
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the Teacher."
	      });
	    else res.send(data);
	  });
};


//Retrieve all Student from the database.
exports.findAll = (req:any, res:any) => {
  Teacher.getAll((err:any, data:any): any => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Teachers."
      });
    else res.send(data);
  });
};


// Find a single Teacher with a teacherId
exports.findOne = (req: any, res: any) => {
  Teacher.findById(req.params.teacherId, (err: any, data: any) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Teacher with id ${req.params.teacherId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Teacher with id " + req.params.teacherId
        });
      }
    } else res.send(data);
  });
};

// login an student:
exports.login = ((req: any, res:any)=>{
  // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
        console.log("empty")
    }

    const obj= {
      staffnumber: req.body.staffnumber,
      password: req.body.password
    }

    Teacher.login(obj, (err: any, data: any) => {
      if (err)
        res/*.status(500)*/.send({
          success: "false",
          message: /*err.message ||*/ "wrong username or password"
        });
      else res.send(data);
    });
});



// get all teachers from a particular institution_id
exports.teachersFromInstitution = (req: Request, res: Response) =>{
  Teacher.teachersFromInstitution(req.params.institution_id, (err: any, data: any) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Teacher with institution_id of ${req.params.institution_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Teachers with institution_id " + req.params.institution_id
        });
      }
    } else res.send(data);
  });
}
