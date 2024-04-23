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

CREATE DATABASE `faculty_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `faculty_db`;

DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
  `id` varchar(255) NOT NULL,
  `credit` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `practical_credit` int NOT NULL,
  `theory_credit` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `courses` (`id`, `credit`, `name`, `practical_credit`, `theory_credit`) VALUES
('4203002009',	2,	'Nhập môn Tin học',	0,	2),
('4203003192',	2,	'Kỹ năng làm việc nhóm',	0,	2),
('4203003242',	4,	'Giáo dục Quốc phòng và An ninh 1 ',	0,	4),
('4203003259',	2,	'Toán cao cấp 1',	0,	2),
('4203003307',	2,	'Giáo dục thể chất 1 ',	2,	0),
('4203003848',	2,	'Nhập môn Lập trình',	2,	0),
('4203014164',	3,	'Triết học Mác - Lênin',	0,	3);

DROP TABLE IF EXISTS `faculties`;
CREATE TABLE `faculties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `faculties` (`id`, `name`) VALUES
(1,	'Khoa Công nghệ Thông tin');

DROP TABLE IF EXISTS `major_course_year`;
CREATE TABLE `major_course_year` (
  `academic_year` int NOT NULL,
  `major_id` int NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `semester` int NOT NULL,
  `type` tinyint DEFAULT NULL,
  PRIMARY KEY (`academic_year`,`course_id`,`major_id`),
  KEY `FKmv54wlxctyuhw8imbdmyq1nra` (`major_id`),
  KEY `FKp0kba12vrp9o7q1pycftijcp0` (`course_id`),
  CONSTRAINT `FKmv54wlxctyuhw8imbdmyq1nra` FOREIGN KEY (`major_id`) REFERENCES `majors` (`id`),
  CONSTRAINT `FKp0kba12vrp9o7q1pycftijcp0` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `major_course_year_chk_1` CHECK ((`type` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `major_course_year` (`academic_year`, `major_id`, `course_id`, `semester`, `type`) VALUES
(2021,	1,	'4203002009',	1,	1),
(2021,	1,	'4203003192',	1,	1),
(2021,	1,	'4203003242',	1,	1),
(2021,	1,	'4203003259',	1,	1),
(2021,	1,	'4203003307',	1,	1),
(2021,	1,	'4203003848',	1,	1),
(2021,	1,	'4203014164',	1,	1);

DROP TABLE IF EXISTS `majors`;
CREATE TABLE `majors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `faculty_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKitqtm0b9li7x2h872rumqnqol` (`faculty_id`),
  CONSTRAINT `FKitqtm0b9li7x2h872rumqnqol` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `majors` (`id`, `name`, `faculty_id`) VALUES
(1,	'Kỹ thuật phần mềm',	1),
(2,	'Khoa học máy tính',	1),
(3,	'Khoa học dữ liệu',	1),
(4,	'Hệ thống thông tin',	1),
(5,	'Công nghệ thông tin',	1);

DROP TABLE IF EXISTS `prerequisites`;
CREATE TABLE `prerequisites` (
  `course_id` varchar(255) NOT NULL,
  `prerequisite_course_id` varchar(255) NOT NULL,
  PRIMARY KEY (`course_id`,`prerequisite_course_id`),
  KEY `FKit1tn8d8y7wetc79w6isf7mhd` (`prerequisite_course_id`),
  CONSTRAINT `FK6c5rl8wmbsy9eknf0j4bgj5fr` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `FKit1tn8d8y7wetc79w6isf7mhd` FOREIGN KEY (`prerequisite_course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `major_id` int DEFAULT NULL,
  `year` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi04cc0278a1f49g0995mnuo63` (`major_id`),
  CONSTRAINT `FKi04cc0278a1f49g0995mnuo63` FOREIGN KEY (`major_id`) REFERENCES `majors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `students` (`id`, `name`, `major_id`, `year`) VALUES
('21023911',	'La Minh Tâm',	1,	2021),
('21082081',	'Võ Đình Thông',	1,	2021);