// // const Admin:any = require("../models/admin.model");
// import {Request, Response} from "express";
// import Student from "../models/student.model";

// interface test{
//   firstname: string,
//   lastname: string,
//   idnumber: number,
//   studentnumber: number,
//   institution_id: number,
//   password: string,
//   active: string,
// }

// /*incase i wanna create a quick user*/
// // const data1:person={
  
// //   "firstname": "mac",
// //   "lastname": "base",
// //   "idnumber": 9704245550080,
// //   "studentnumber": 201603838,
// //   "institution_id": 1,
// //   "password": "password",
// //   "active": "true"
// // }

// // Create and Save a new Student
// exports.create = ((req:any, res: any) => {
// 	  // Validate request
// 	  if (!req.body) {
// 	    res.status(400).send({
// 	      message: "Content can not be empty!"
// 	    });
//       	console.log("empty")
// 	  }

//     // Create an Administrator
//     /*I just noticed that this si not working, for some reason its not identifying the req's*/
// 	  const student = new Student({
//   		firstname: req.body.firstname,
//   		lastname: req.body.lastname,
//       idnumber: req.body.idnumber,
//   		studentnumber: req.body.studentnumber,
//       institution_id: req.body.institution_id,
//   		password: req.body.password,
//   		active: req.body.active
// 	  });

// 	  // console.log('body is ',req.body);

// 	  // Save Student in the database
// 	  Student.create(student, (err: any, data: any) => {
// 	    if (err)
// 	      res.status(500).send({
//           success: "false",
// 	        message:
// 	          err.message || "Some error occurred while creating the Student."
// 	      });
// 	    else res.send(data);
// 	  });
// });


// //Retrieve all Student from the database.
// exports.findAll = (req:any, res:any) => {
//   Student.getAll((err:any, data:any): any => {
//     if (err)
//       res.status(500).send({
//         success: "false",
//         message:
//           err.message || "Some error occurred while retrieving Teachers."
//       });
//     else res.send(data);
//   });
// };

// // student
// // Find a single Student with a studentId
// exports.findOne = (req: any, res: any) => {
//   Student.findById(req.params.studentId, (err: any, data: any) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           success: "false",
//           message: `Not found Student with id ${req.params.studentId}.`
//         });
//       } else {
//         res.status(500).send({
//           success: "false",
//           message: "Error retrieving Student with id " + req.params.studentId
//         });
//       }
//     } else res.send(data);
//   });
// };

// // login an student:
// exports.login = ((req: any, res:any)=>{
// 	// Validate request
//     if (!req.body) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//         console.log("empty")
//     }

//     const obj= {
//       studentnumber: req.body.studentnumber,
//       password: req.body.password
//     }

//     Student.login(obj, (err: any, data: any) => {
//       if (err)
//         res/*.status(500)*/.send({
//           success: "false",
//           message: /*err.message ||*/ "wrong username or password"
//         });
//       else res.send(data);
//     });
// });


// // get all students from a particular institution_id
// exports.studentsFromInstitution = (req: Request, res: Response) =>{
//   Student.studentsFromInstitution(req.params.institutionId, (err: any, data: any) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           success: "false",
//           message: `Not found Student with institution_id of ${req.params.institutionId}.`
//         });
//       } else {
//         res.status(500).send({
//           success: "false",
//           message: "Error retrieving students with institution_id " + req.params.institutionId
//         });
//       }
//     } else res.send(data);
//   });
// }
