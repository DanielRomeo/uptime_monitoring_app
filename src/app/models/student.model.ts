import express, { Application, Request, Response, NextFunction } from "express";
const sql = require("./db");

interface person{
    firstname: string,
    lastname: string,
    idnumber: number,
    studentnumber: number,
    institution_id: number,
    password: string,
    active: string,
}

// Students class:
export default class Student{
    private firstname: string;
    private lastname: string;
    private idnumber: number;
    private studentnumber: number;
    private institution_id: number;
    private password: string;
    private active: string;

    constructor(student:person){
        this.institution_id = student.institution_id;
        this.firstname = student.firstname;
        this.idnumber = student.idnumber;
        this.lastname = student.lastname;
        this.studentnumber = student.studentnumber;
        this.password = student.password;
        this.active = student.active;     
    }

    // create method:
    static create(newstudent : any, result:any) {
      sql.query("INSERT INTO students SET ?", newstudent, (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created student: ", { id: res.insertId, ...newstudent });
        // result(null, { id: res.insertId, ...newstudent }); 
        result(null, {success: "true"})
      });
    };

    // get all method:
    static getAll(result: any){
      sql.query("SELECT * FROM students", (err: Error, res: Response) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
      console.log("student: ", res);
        result(null, res);
      });
    };

    // find an student by ID method:
    static findById(student: any, result: any){
      sql.query(`SELECT * FROM students WHERE id = ${student}`, (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
          result({success: "false", message: "student not found"}, null);
          return;
        }

        if (res.length) {
          // console.log("found student: ", res[0]); // res[0] is an array with one object
          result(null, {success: "true"});
          return;
        }

        // not found student with the id
        result({ kind: "not_found" }, null);
      });
    };

    // login the student:
    static login(obj: any, result: any){
      sql.query(`SELECT * FROM students WHERE studentnumber = ${obj.studentnumber} AND password = ${obj.password}`, (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
          // result(err, null);
          result({success: false,   message: "wrong parameters provided"}, null);
          return;
        }

        if (res.length) {
          // console.log("found student: ", res[0]);
          result(null, {success: "true", "result": res[0]});
          return;
        }

        // not found student with the id
        result({ kind: "not_found" }, null);
      });
    };

    /*-----------*/

    static studentsFromInstitution(institution_id: any, result: any){
      sql.query(`SELECT * FROM students WHERE institution_id = ${institution_id}`, (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          // console.log("found student: ", res[0]);
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
      });
    };

} ;// end of the class:
