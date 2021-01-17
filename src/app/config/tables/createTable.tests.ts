// tests table:
export let createTests: string = `create table if not exists tests(
  	id int primary key auto_increment,
    institution_id int not null,
    module_id int not null,
  	teacher_id int not null,
  	name varchar(200) not null,
    description longtext not null,
    attempt_number int not null,
    due_date datetime not null,
    date_available datetime not null,
    date_created datetime not null
  	
)`;

// test_questions table:
export let createQuestionsForTests: string = `create table if not exists test_questions(
  	id int primary key auto_increment,
  	institution_id int not null,
    test_id int not null,
    type enum('multiple_choice', 'dual_choice', 'text') not null,
  	question longtext not null
)`;

/*for every answer in a question(of a test), there will be a record that determines the correct answer*/
export let createAnswerOptions: string = `create table if not exists test_answer_options(
  id int primary key auto_increment,
  question_id int not null,
  answer text not null,
   right_answer enum('true', 'false') not null
 )`;


// attempt number tells us how many times the student has answerd this particular question...
/*
How im gonna query the database: before i send to the database:
  - Ask database how many records in test_answer_submissions, that has a particular student_id AND question_id; THAT NUMBER, 
  will tell me the number of attempts this student has taken. Now i can increment that number and place it in the variable attempt_number
  and then submit it to the database.
*/
export let createTestAnswerSubmissions: string = `create table if not exists test_answer_submissions(
  id int primary key auto_increment,
  question_id int not null,
  student_id int not null,
  answer longtext not null,
  attempt_number int not null
 )`;
