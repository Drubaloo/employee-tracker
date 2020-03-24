
DROP DATABASE IF EXISTS tracker_db;


CREATE DATABASE tracker_db;


USE tracker_db;


CREATE TABLE `department` (
  id int AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `role` (
  id int AUTO_INCREMENT NOT NULL,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL(10, 4),
  `department_id` INTEGER,
  PRIMARY KEY(id)
);

CREATE TABLE `employee` (
  id int AUTO_INCREMENT NOT NULL,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `role_id` INTEGER,
  `manager_id` INTEGER,
  PRIMARY KEY(id)
);