// institutions table:
export let createInstitutions: string = `create table if not exists institutions(
    id int primary key auto_increment,
    name varchar(255)not null,
    logo varchar(200)not null,
    slogan varchar(200)not null,
    description varchar(255) not null
)`;