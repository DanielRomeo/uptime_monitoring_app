// import queries:
import {createStudents} from "./tables/createTable.students";
import {createAdmins} from "./tables/createTable.admins";
import {createTeachers} from "./tables/createTable.teachers";
import {createAssignments, createAssignmentSubmissions} from "./tables/createTable.assignments";
import {createMeetings, createMeetingAttendees} from "./tables/createTable.meetings";
import {createAnnouncements} from "./tables/createTable.announcements";
import {createMessages} from "./tables/createTable.messages";
import {
	createTests, 
	createQuestionsForTests, 
	createAnswerOptions, 
	createTestAnswerSubmissions} from "./tables/createTable.tests";
import {createModules, createModuleStudent, createModuleTeacher} from "./tables/createTable.modules";
import {createInstitutions} from "./tables/createTable.institutions";

// import mysql functions:
const mysql = require("mysql");
const dbConfig = require("./db.config");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// connect to the MySQL server
connection.connect((err:Error) => {
	if (err) {
		return console.error('error: ' + err.message);
	}

	const createTable = (query: string, msg: string) =>{
		connection.query(query, function(err:Error, results:any, fields:any) {
			if (err) {
				console.log(err.message);
			}else{
				console.log(msg);
			}
		});
	}

	console.log("Successfully connected to the database.");
	createTable(createAdmins, "Successfully created the admins table");
	createTable(createStudents, "Successfully created the students table");
	createTable(createTeachers, "Successfully created the teachers table");
	createTable(createAssignments, "Successfully created the assignments table");
	createTable(createMeetings, "Successfully created the meetings table");

	createTable(createMeetingAttendees, "Successfully created the meeting_attendees table");
	createTable(createAnnouncements, "Successfully created the announcements table");
	createTable(createMessages, "Successfully created the messages table");
	createTable(createTests, "Successfully created the tests table");

	createTable(createQuestionsForTests, "Successfully created the test_questions table");
	createTable(createAnswerOptions, "Successfully created the test_answer_options table");
	createTable(createTestAnswerSubmissions, "Successfully created the test_answer_submissions table");

	createTable(createModules, "Successfully created the modules table");
	createTable(createModuleStudent, "Successfully created the module_student table");
	createTable(createModuleTeacher, "Successfully created the module_teacher table");
	createTable(createInstitutions, "Successfully created the institutions table");


});