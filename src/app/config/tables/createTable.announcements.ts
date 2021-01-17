//  announcements table:
export let createAnnouncements: string = `create table if not exists announcements(
  	id int primary key auto_increment,
  	teacher_id int not null,
  	module_id int not null,
  	title varchar(255) not null,
  	message longtext not null,
  	date_created datetime not null
)`;