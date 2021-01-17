// messages table:
export let createMessages: string = `create table if not exists messages(
  id int primary key auto_increment,
  institution_id int not null,
  conversation_id int not null,
  sender_id int not null,
  reciever_id int not null,
  message longtext not null,
  teacher_sender enum('true', 'false') not null,
  teacher_reciever enum('true', 'false') not null,
  date_created datetime not null
)`;