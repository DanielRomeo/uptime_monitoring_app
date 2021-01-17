// modules table:
export let createModules: string = `create table if not exists modules(
  	id int primary key auto_increment,
  	institution_id int not null,
  	teacher_id int not null,
  	name varchar(200) not null,
  	course_code varchar(200) not null,
  	active varchar(200) not null
)`;

// module_student table:
export let createModuleStudent: string = `create table if not exists module_student(
  	id int primary key auto_increment,
  	institution_id int not null,
  	module_id int not null,
  	student_id int not null,
    date_created datetime not null
)`;

// module_student table:
export let createModuleTeacher: string = `create table if not exists module_teacher(
    id int primary key auto_increment,
    institution_id int not null,
    module_id int not null,
    teacher_id int not null,
    date_created datetime not null
)`;

