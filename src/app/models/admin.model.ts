import express, { Application, Request, Response, NextFunction } from "express";
const sql = require("./db");

interface person{
    institution_id: number,
    firstname: string,
    lastname: string,
    staffnumber: string,
    password: string,
    active: string,
}

// constructor
export default class Admin{
    private institution_id: number;
    private firstname: string;
    private lastname: string;
    private staffnumber: string;
    private password: string;
    private active: string;

    constructor(admin:person){
        this.institution_id = admin.institution_id;
        this.firstname = admin.firstname;
        this.lastname = admin.lastname;
        this.staffnumber = admin.staffnumber;
        this.password = admin.password;
        this.active = admin.active;     
    }

    // create method:
    static create(newadmin : any, result:any) {
      sql.query("INSERT INTO admins SET ?", newadmin, (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created admin: ", { id: res.insertId, ...newadmin });
        result(null, { id: res.insertId, ...newadmin });
      });
    };

    // get all method:
    static getAll(result: any){
      sql.query("SELECT * FROM admins", (err: Error, res: Response) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
      console.log("admin: ", res);
        result(null, res);
      });
    };

    // find an admin by ID method:
    static findById(admin: any, result: any){
      sql.query(`SELECT * FROM admins WHERE id = ${admin}`, (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        /*need to change this so that it returns an object that i want it to return
        instead of res[0],
        pass in an object
        */
        if (res.length) {
          console.log("found admin: ", res[0]);
          result(null, res[0]);
          return;
        }

        // not found admin with the id
        result({ kind: "not_found" }, null);
      });
    };

    // login the admin:
    static login(obj: any, result: any){
      sql.query(`SELECT * FROM admins WHERE staffnumber = ${obj.username} AND password = ${obj.password}`, (err: Error, res: any) => {
        if (err) {
          // this error runs and gets displayed when for instance: User provides vague object
          // eg. doesnt give "{username: ***, "password: ***"}"

          result({success: false,   message: "wrong parameters provided"}, null);
          return;
        }

        if (res.length) {
           // console.log("found admin: ", res[0]);
          result(null, {success: "true", result: res[0]});
          return;
        }
         
          result({ kind: "not_found" }, null);  
        

      });
    };

} ;// end of the class:

