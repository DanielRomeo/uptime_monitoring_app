// meetings table:
export let createMeetings: string = `create table if not exists meetings(
  	id int primary key auto_increment,
  	title varchar(255) not null,
  	meeting_creator_id int not null,
  	meeting_id varchar(255) not null,
  	video varchar(255) not null,
  	date_created datetime not null,
  	date_set datetime not null,
  	date_ended datetime not null
)`;

// meeting_attendees table:
export let createMeetingAttendees: string = `create table if not exists meeting_attendees(
  	id int primary key auto_increment,
  	meeting_id int not null,
  	attendee_id int not null
)`;