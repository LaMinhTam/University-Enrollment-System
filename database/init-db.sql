CREATE DATABASE IF NOT EXISTS auth_db;
USE auth_db;

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(150) NOT NULL,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ofx66keruapi6vyqpv6f2or37` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `roles` (`id`, `description`, `name`) VALUES
(1,	'Students who are currently studies at the university',	'ROLE_STUDENT'),
(2,	'Students who are completed studies at the university',	'ROLE_GRADUATE');

DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` varchar(255) NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `password` varchar(64) NOT NULL,
  `photos` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `student` (`id`, `full_name`, `password`, `photos`) VALUES
('21023911',	'La Minh Tâm',	'$2a$10$d.kRHxGIsH1aULbZg8g85Oj/1pfyDGy6YJ8RL8wdWu4XiwdX1PySO',	'https://source.unsplash.com/random'),
('21082081',	'Võ Đình Thông',	'$2a$10$d.kRHxGIsH1aULbZg8g85Oj/1pfyDGy6YJ8RL8wdWu4XiwdX1PySO',	'https://source.unsplash.com/random');

DROP TABLE IF EXISTS `students_roles`;
CREATE TABLE `students_roles` (
  `student_id` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`student_id`,`role_id`),
  KEY `FKex4y7c8r6jlhd5pnt3e9skepe` (`role_id`),
  CONSTRAINT `FKex4y7c8r6jlhd5pnt3e9skepe` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKnp5xtnpjwsyd3vll8j9s3ontw` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `students_roles` (`student_id`, `role_id`) VALUES
('21023911',	1),
('21082081',	1);