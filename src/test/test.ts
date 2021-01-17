// i will test my methods here:

// in the models, i need to make sure that all the functions call a result()-function somewhere


const assert = require('chai').assert;

import Student from "../app/models/student.model";

const {sayHello} = require("../random");

describe('Random', function(){
	it('app should return hello', function(){
		assert.equal(sayHello(), 'hello');
	});


});


// tetst to be ran by github actions:
// describe('Student' , function(){
// 	it('Student.create() should return undefined', function(){
// 		const person = new Student({
// 			"institution_id" : 99,
// 	        "firstname": "99",
// 	        "idnumber": 99,
// 	        "lastname" : "99",
// 	        "studentnumber" : 99,
// 	        "password" : "99",
// 	        "active" : "false"
// 		});

// 		//call
// 		const result = Student.create(person ,(err: any, data: any) => {
// 			if(err){return "";}
// 		});
// 		assert.equal(result, undefined);
// 	});	// end of `it
// });