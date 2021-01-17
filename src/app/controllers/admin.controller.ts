import {Application, Request, Response, NextFunction } from "express";
import Admin from "../models/admin.model";

interface person{
    institution_id: number,
    firstname: string,
    lastname: string,
    staffnumber: string,
    password: string,
    active: string,
}

/*incase i wanna create a quick user*/
const data1:person={
  "institution_id": 1,
  "firstname": "daniel",
  "lastname": "mamphekgo",
  "staffnumber": "2021",
  "password": "password",
  "active": "true"
}

// Create and Save a new Student
exports.create = ((req:Request, res: Response) => {
	  // Validate request
	  if (!req.body) {
	    res.status(400).send({
	      message: "Content can not be empty!"
	    });
      	console.log("empty")
	  }

    // Create an Administrator
    /*I just noticed that this si not working, for some reason its not identifying the req's*/
	  const admin = new Admin({
    institution_id: req.body.institution_id,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		staffnumber: req.body.staffnumber,
		password: req.body.password,
		active: req.body.active
	  });

	  console.log('body is ',req.body);

	  // Save Admin in the database
	  Admin.create(admin, (err: Error, data: object) => {
	    if (err)
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the Admin."
	      });
	    else res.send(data);
	  });
});


//Retrieve all Student from the database.
exports.findAll = (req:Request, res:Response) => {
  Admin.getAll((err:any, data:any): any => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Admins."
      });
    else res.send(data);
  });
};


// Find a single Admin with a adminId
exports.findOne = (req: any, res: any) => {
  Admin.findById(req.params.adminId, (err: any, data: any) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Admin with id ${req.params.adminId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Admin with id " + req.params.adminId
        });
      }
    } else res.send(data);
  });
};

// login an admin:
exports.login = ((req: any, res:any)=>{
  // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
        console.log("empty")
    }

    const obj= {
      username: req.body.username,
      password: req.body.password
    }

    Admin.login(obj, (err: any, data: any) => {
      if (err)
        res/*.status(500)*/.send({
          success: "false",
          message: /*err.message ||*/ "wrong username or password"
        });
      else res.send(data);
    });
});




// // Update a Student identified by the studentId in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   Student.updateById(
//     req.params.studentId,
//     new Student(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Student with id ${req.params.studentId}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Student with id " + req.params.studentId
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// // Delete a Student with the specified studentId in the request
// exports.delete = (req, res) => {
//   Student.remove(req.params.studentId, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Student with id ${req.params.studentId}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Student with id " + req.params.studentId
//         });
//       }
//     } else res.send({ message: `Student was deleted successfully!` });
//   });
// };