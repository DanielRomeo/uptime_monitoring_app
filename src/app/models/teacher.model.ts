import express, { Application, Request, Response, NextFunction } from "express";
const sql = require("./db");

interface person{
    firstname: string,
    lastname: string,
    idnumber: number,
    staffnumber: number,
    institution_id: number,
    password: string,
    active: string,
}

// Teacher class:
export default class Teacher{
    private firstname: string;
    private lastname: string;
    private idnumber: number;
    private staffnumber: number;
    private institution_id: number;
    private password: string;
    private active: string;

    constructor(teacher:person){
        this.institution_id = teacher.institution_id;
        this.firstname = teacher.firstname;
        this.idnumber = teacher.idnumber;
        this.lastname = teacher.lastname;
        this.staffnumber = teacher.staffnumber;
        this.password = teacher.password;
        this.active = teacher.active;     
    }

    // create method:
    static create(newteacher : any, result:any) {
      sql.query("INSERT INTO teachers SET ?", newteacher, (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created teacher: ", { id: res.insertId, ...newteacher });
        result(null, { id: res.insertId, ...newteacher });
      });
    };

    // get all method:
    static getAll(result: any){
      sql.query("SELECT * FROM teachers", (err: Error, res: Response) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
      console.log("teacher: ", res);
        result(null, res);
      });
    };

    // find an teacher by ID method:
    static findById(teacher: any, result: any){
      sql.query(`SELECT * FROM teachers WHERE id = ${teacher}`, (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("found teacher: ", res[0]);
          result(null, res[0]);
          return;
        }

        // not found teacher with the id
        result({ kind: "not_found" }, null);
      });
    };

    // login the teacher:
    static login(obj:any, result: any){
      sql.query(`SELECT * FROM teachers WHERE staffnumber = ${obj.staffnumber} AND password = ${obj.password}`, (err: Error, res: any) => {
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

    static teachersFromInstitution(institution_id: any, result: any){
      sql.query(`SELECT * FROM teachers WHERE institution_id = ${institution_id}`, (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found teacher: ", res[0]);
          result(null, res[0]);
          return;
        }
        result({ kind: "not_found" }, null);
      });
    };

} ;// end of the class:

