
use test1;

CREATE TABLE `admin`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
);
    
insert into admin(`email`,`password`)values('uppulayogeshwar@gmail.com','123456');  
insert into admin(`email`,`password`)values('dhanush@gmail.com','dhanush@123');    
select * from admin;

CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45)  NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `fname` VARCHAR(45) NOT NULL,
  `lname` VARCHAR(45) NOT NULL,
  `address` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
);

select * from user;
CREATE TABLE `policy` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `policy_Number` INT NOT NULL,
  `insured_party` VARCHAR(45) NOT NULL, 
  `coverage_type` VARCHAR(45) NOT NULL,
  `start_date` VARCHAR(45) NOT NULL,
  `end_date` VARCHAR(45) NOT NULL,
  `premium_amount` INT NULL,
  `status` VARCHAR(45) default "pending" not null,
  PRIMARY KEY (`id`)
);
select * from policy;

CREATE TABLE `user_policy` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `policy_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`policy_id`) REFERENCES `policy`(`id`) on delete cascade on update cascade,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) on delete cascade on update cascade
);

select * from user_policy;

SELECT p.*
FROM user u
JOIN user_policy up ON u.id = up.user_id
JOIN policy p ON up.policy_id = p.id
WHERE u.id = 1;


