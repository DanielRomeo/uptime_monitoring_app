// students table:
export let createStudents: string = `create table if not exists students(
    id int primary key auto_increment,
    institution_id varchar(200) not null,
    firstname varchar(200) not null,
    idnumber bigint not null,
    lastname varchar(200) not null,
    studentnumber varchar(200)not null,
    password varchar(255) not null,
    active varchar(200) not null
)`;


/*might want to add date of birth soon::*/