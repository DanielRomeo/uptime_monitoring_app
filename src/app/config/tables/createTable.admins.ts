// admins table:
export let createAdmins: string = `create table if not exists admins(
    id int primary key auto_increment,
    institution_id int not null,
    firstname varchar(200)not null,
    lastname varchar(200)not null,
    staffnumber varchar(200)not null,
    password varchar(255) not null,
    active varchar(200)not null
)`;