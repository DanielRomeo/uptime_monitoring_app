// teachers table:
export let createTeachers: string = `create table if not exists teachers(
    id int primary key auto_increment,
    institution_id int not null,
    firstname varchar(200)not null,
    lastname varchar(200)not null,
    idnumber varchar(200) not null,
    staffnumber varchar(200)not null,
   
    password varchar(255) not null,
    active varchar(200)not null
)`;
