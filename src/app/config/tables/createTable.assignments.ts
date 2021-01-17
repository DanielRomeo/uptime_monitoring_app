// assigments table:
export let createAssignments: string = `create table if not exists assignments(
  	id int primary key auto_increment,
    institution_id int not null,
  	teacher_id varchar(200) not null,
  	title varchar(200) not null,
    description longtext not null,
  	unique_code varchar(200),
  	total_grade int not null,
    due_date datetime not null,
  	date_available datetime not null,
  	date_created datetime not null
)`;

// assignments submissions table:
export let createAssignmentSubmissions: string = `create table if not exists assignment_submissions(
	id int primary key auto_increment,
  	assignment_id int not null,
  	student_id int not null,
  	grade int not null,
  	file varchar(255) not null,
  	date_submitted datetime not null
)`;
