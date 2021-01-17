import express, { Application, Request, Response, NextFunction } from "express";
const sql = require("./db");

interface module {
    institution_id: number;
    teacher_id: number;
    name: string;
    course_code: string;
    active: boolean;
}

interface singleValueObject {
    module_id: number;
}

// Students class:
export default class Module {
    private institution_id: number;
    private teacher_id: number;
    private name: string;
    private course_code: string;
    private active: boolean;

    constructor(module: module) {
        this.institution_id = module.institution_id;
        this.teacher_id = module.teacher_id;
        this.name = module.name;
        this.course_code = module.course_code;
        this.active = module.active;
    }

    // create method:
    static create(newmodule: any, result: any) {
        sql.query(
            "INSERT INTO modules SET ?",
            newmodule,
            (err: Error, res: any) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                console.log("created module: ", {
                    id: res.insertId,
                    ...newmodule,
                });
                result(null, { success: "true" });
            }
        );
    }

    // get all table method:
    static getAll(result: any) {
        sql.query("SELECT * FROM modules", (err: Error, res: any) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("modules: ", res);
            result(null, res);
        });
    }

    // method that counts the number of students that take a particular module(by module code)
    /*this takes in a module id*/
    static getNumberOfStudentsPerModule(module_id: number, result: any) {
        sql.query(
            `SELECT COUNT FROM module_student WHERE module_id = ${module_id}`,
            (err: Error, res: any) => {
                if (err) {
                    console.log("error: ", err);
                    result(
                        { success: "false", message: "student not found" },
                        null
                    );
                    return;
                }

                if (res.length) {
                    // console.log("found student: ", res[0]); // res[0] is an array with one object
                    result(null, { success: "true" });
                    return;
                }
                // not found student with the id
                result({ kind: "not_found" }, null);
            }
        );
    }

    // need to create a method that links a student to a module:
    // meaning that the student select the module to be added to his list:
    /*takes in a module_id and student_id - as an object*/
    static linkStudentToModule(theobject: any, result: any) {
        sql.query(
            "INSERT INTO module_student SET ?",
            theobject,
            (err: Error, res: any) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                console.log("Linked student to module: ", {
                    id: res.insertId,
                    ...theobject,
                });
                result(null, { success: "true" });
            }
        );
    }

    static linkTeacherToModule(theobject: any, result: any) {
        sql.query(
            "INSERT INTO module_teacher SET ?",
            theobject,
            (err: Error, res: any) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                console.log("Linked teacher to module: ", {
                    id: res.insertId,
                    ...theobject,
                });
                result(null, { success: "true" });
            }
        );
    }

    // method that returns all modules linked to a student
    // takes in a student_id and the module_id
    static getAllModulesPerStudent(student_id: number, result: any) {
        sql.query(
            `SELECT * FROM module_student WHERE student_id=${student_id} `,
            (err: Error, res: any) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, { success: "true", result: res });
            }
        );
    }

    // method that deactivates a module:
    static deactivateModule(theobject: singleValueObject, result: any) {
        sql.query(
            `UPDATE modules SET active = false WHERE id=${theobject.module_id}`,
            (err: Error, res: any) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, { success: "true" });
            }
        );
    }

    // method that activates a module:
    static activateModule(theobject: singleValueObject, result: any) {
        sql.query(
            `UPDATE modules SET active = true WHERE id=${theobject.module_id}`,
            (err: Error, res: any) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, { success: "true" });
            }
        );
    }

    // this method will get me all the module_teachers that the teacher is liked to:
    static getTeacherModuleConnections(teacher_id: number, result: any) {
        sql.query(
            `SELECT * FROM module_teacher WHERE teacher_id = ${teacher_id}`,
            (err: Error, res: any) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, { success: "true", result: res });
            }
        );
    }

    // method that returns all modules given the the id's recieved:
    // takes an array of numbers:
    static getTeacherModulesGivenTheirIds = (array: any, result: any) => {
        sql.query(
            `SELECT * FROM modules WHERE id in (${array})`,
            (err: Error, res: any) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, { success: "true", result: res });
            }
        );
    };
} // end of the class:
