import { Request, Response } from "express";
import Module from "../models/module.model";
import axios from "axios";

interface module {
    institution_id: number;
    teacher_id: number /*i have a teacherId because i need to give a module atleast 1 teacher when initalizing*/;
    name: string;
    course_code: string;
    active: boolean;
}

interface studentToModule {
    institution_id: number;
    student_id: number;
    module_id: number;
    date_created: string;
}
interface teacherToModule {
    institution_id: number;
    teacher_id: number;
    module_id: number;
    date_created: string;
}

/*incase i wanna create a quick user*/
// {

//   "firstname": "mac",
//   "lastname": "base",
//   "idnumber": 9704245550080,
//   "studentnumber": 201603838,
//   "institution_id": 1,
//   "password": "password",
//   "active": "true"
// }

/*
{
"institution_id": "1",
"teacher_id": "1",
"name": "Computer science 1",
"course_code": "COS1511",
"active": "true"
}
*/

// Create and Save a new Student
exports.create = (req: any, res: any) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }

    const module = new Module({
        institution_id: req.body.institution_id,
        teacher_id: req.body.teacher_id,
        name: req.body.name,
        course_code: req.body.course_code,
        active: req.body.active,
    });

    Module.create(module, (err: any, data: any) => {
        if (err)
            res.status(500).send({
                success: "false",
                message:
                    err.message ||
                    "Some error occurred while creating the Module.",
            });
        else res.send(data);
    });
};

exports.StudentToModule = (req: any, res: any) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }

    const theobject: studentToModule = {
        institution_id: req.body.institution_id,
        student_id: req.body.student_id,
        module_id: req.body.module_id,
        date_created: req.body.date_created,
    };

    Module.linkStudentToModule(theobject, (err: any, data: any) => {
        if (err)
            res.status(500).send({
                success: "false",
                message:
                    err.message ||
                    "Some error occurred while linking student to module.",
            });
        else res.send(data);
    });
};

exports.TeacherToModule = (req: any, res: any) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }

    const theobject: teacherToModule = {
        institution_id: req.body.institution_id,
        teacher_id: req.body.teacher_id,
        module_id: req.body.module_id,
        date_created: req.body.date_created,
    };

    Module.linkTeacherToModule(theobject, (err: any, data: any) => {
        if (err)
            res.status(500).send({
                success: "false",
                message:
                    err.message ||
                    "Some error occurred while linking teacher to module.",
            });
        else res.send(data);
    });
};

//Retrieve all Modules from the database.
exports.findAll = (req: any, res: any) => {
    Module.getAll((err: any, data: any): any => {
        if (err)
            res.status(500).send({
                success: "false",
                message:
                    err.message ||
                    "Some error occurred while retrieving Modules.",
            });
        else res.send(data);
    });
};

exports.getStudentsModules = (req: any, res: any) => {
    Module.getAllModulesPerStudent(
        req.params.student_id,
        (err: any, data: any) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        success: "false",
                        message: `Not found Student with id ${req.params.student_id}.`,
                    });
                } else {
                    res.status(500).send({
                        success: "false",
                        message:
                            "Error retrieving modules from a student that has the Id : " +
                            req.params.student_id,
                    });
                }
            } else res.send(data);
        }
    );
};

exports.deactivateModule = (req: any, res: any) => {
    interface singleValueObject {
        module_id: number;
    }

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }

    const theobject: singleValueObject = {
        module_id: req.body.module_id,
    };

    Module.deactivateModule(theobject, (err: any, data: any) => {
        if (err)
            res.status(500).send({
                success: "false",
                message:
                    err.message ||
                    "Some error occurred while deactivating the module.",
            });
        else res.send(data);
    });
};

exports.activateModule = (req: any, res: any) => {
    interface singleValueObject {
        module_id: number;
    }

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }

    const theobject: singleValueObject = {
        module_id: req.body.module_id,
    };

    Module.activateModule(theobject, (err: any, data: any) => {
        if (err)
            res.status(500).send({
                success: "false",
                message:
                    err.message ||
                    "Some error occurred while activating the module.",
            });
        else res.send(data);
    });
};

exports.getTeacherModules = async (req: any, res: any) => {
    let teacher_id = req.params.teacher_id;

    const getOtherData = async () => {
        let info: any;
        try {
            await Module.getTeacherModuleConnections(
                teacher_id,
                (err: any, data: any) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                success: "false",
                                message: `Not found`,
                            });
                        } else {
                            res.status(500).send({
                                success: "false",
                                message: "Error retrieving.... ",
                            });
                        }
                    }
                    info = data;
                    loadData(data);
                }
            );
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    };

    const loadData = async (info: any) => {
        let ids: any = [];
        try {
            await info.result.map((item: any) => {
                ids.push(item.module_id);
            });

            await Module.getTeacherModulesGivenTheirIds(
                ids,
                (err: any, data: any) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                success: "false",
                                message: `Not found`,
                            });
                        } else {
                            res.status(500).send({
                                success: "false",
                                message: "Error retrieving.... ",
                            });
                        }
                    }
                    res.send(data);
                }
            );
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }; // end of loadData() function

    await getOtherData();
}; // end of getTeacherModules

/* response should be an array such as this 
[
  {
    name: elemantary stats,
    couseCode: STAT1,
    students: 600,
    teachers: 4,
  }, {
    name: Chemistry 2,
    couseCode: CHLM2,
    students: 100,
    teachers: 1,
  }
]

*/
