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

CREATE DATABASE `enroll_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `enroll_db`;

DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` varchar(255) NOT NULL,
  `max_capacity` int NOT NULL,
  `semester` int NOT NULL,
  `status` enum('PLANNING','WAITING','OPENED','CLOSED') DEFAULT NULL,
  `year` int NOT NULL,
  `course_id` varchar(255) DEFAULT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `classes` (`id`, `max_capacity`, `semester`, `status`, `year`, `course_id`, `course_name`) VALUES
('420300066424201',	70,	2,	'OPENED',	2024,	'4203000664',	'Lập trình GUI với Qt Framework'),
('420300066424202',	60,	2,	'OPENED',	2024,	'4203000664',	'Lập trình GUI với Qt Framework'),
('420300066424203',	80,	2,	'CLOSED',	2024,	'4203000664',	'Lập trình GUI với Qt Framework'),
('420300066424204',	60,	2,	'WAITING',	2024,	'4203000664',	'Lập trình GUI với Qt Framework'),
('420300086824201',	80,	2,	'OPENED',	2024,	'4203000868',	'Công nghệ mới trong phát triển ứng dụng CNTT'),
('420300086824202',	70,	2,	'OPENED',	2024,	'4203000868',	'Công nghệ mới trong phát triển ứng dụng CNTT'),
('420300086824203',	70,	2,	'CLOSED',	2024,	'4203000868',	'Công nghệ mới trong phát triển ứng dụng CNTT'),
('420300086824204',	80,	2,	'WAITING',	2024,	'4203000868',	'Công nghệ mới trong phát triển ứng dụng CNTT'),
('420300090124101',	80,	1,	'PLANNING',	2024,	'4203000901',	'Xã hội học'),
('420300090824101',	60,	1,	'CLOSED',	2024,	'4203000908',	'Giáo dục thể chất 1 '),
('420300090824102',	60,	1,	'WAITING',	2024,	'4203000908',	'Giáo dục thể chất 1 '),
('420300094124201',	60,	2,	'PLANNING',	2024,	'4203000941',	'Tư tưởng Hồ Chí Minh'),
('420300094124202',	70,	2,	'CLOSED',	2024,	'4203000941',	'Tư tưởng Hồ Chí Minh'),
('420300094124203',	80,	2,	'CLOSED',	2024,	'4203000941',	'Tư tưởng Hồ Chí Minh'),
('420300094124204',	60,	2,	'WAITING',	2024,	'4203000941',	'Tư tưởng Hồ Chí Minh'),
('420300094224101',	60,	1,	'WAITING',	2024,	'4203000942',	'Giao tiếp kinh doanh'),
('420300094224102',	80,	1,	'CLOSED',	2024,	'4203000942',	'Giao tiếp kinh doanh'),
('420300094224103',	80,	1,	'WAITING',	2024,	'4203000942',	'Giao tiếp kinh doanh'),
('420300094224104',	70,	1,	'OPENED',	2024,	'4203000942',	'Giao tiếp kinh doanh'),
('420300100424201',	70,	2,	'WAITING',	2024,	'4203001004',	'Toán ứng dụng'),
('420300100424202',	60,	2,	'WAITING',	2024,	'4203001004',	'Toán ứng dụng'),
('420300100424203',	70,	2,	'CLOSED',	2024,	'4203001004',	'Toán ứng dụng'),
('420300105824201',	80,	2,	'WAITING',	2024,	'4203001058',	'Kiến trúc và Thiết kế phần mềm'),
('420300105824202',	80,	2,	'CLOSED',	2024,	'4203001058',	'Kiến trúc và Thiết kế phần mềm'),
('420300105824203',	60,	2,	'OPENED',	2024,	'4203001058',	'Kiến trúc và Thiết kế phần mềm'),
('420300105824204',	60,	2,	'PLANNING',	2024,	'4203001058',	'Kiến trúc và Thiết kế phần mềm'),
('420300107624201',	60,	2,	'PLANNING',	2024,	'4203001076',	'Lập trình phân tích dữ liệu 1'),
('420300111124201',	60,	2,	'OPENED',	2024,	'4203001111',	'Hàm phức và phép biến đổi Laplace'),
('420300111124202',	70,	2,	'CLOSED',	2024,	'4203001111',	'Hàm phức và phép biến đổi Laplace'),
('420300111124203',	60,	2,	'WAITING',	2024,	'4203001111',	'Hàm phức và phép biến đổi Laplace'),
('420300111124204',	60,	2,	'CLOSED',	2024,	'4203001111',	'Hàm phức và phép biến đổi Laplace'),
('420300114624101',	60,	1,	'OPENED',	2024,	'4203001146',	'Kỹ năng xây dựng kế hoạch'),
('420300114624102',	70,	1,	'CLOSED',	2024,	'4203001146',	'Kỹ năng xây dựng kế hoạch'),
('420300120724201',	70,	2,	'PLANNING',	2024,	'4203001207',	'Lập trình hướng sự kiện với công nghệ .NET'),
('420300120724202',	70,	2,	'OPENED',	2024,	'4203001207',	'Lập trình hướng sự kiện với công nghệ .NET'),
('420300120724203',	60,	2,	'PLANNING',	2024,	'4203001207',	'Lập trình hướng sự kiện với công nghệ .NET'),
('420300136624201',	70,	2,	'PLANNING',	2024,	'4203001366',	'Khai thác dữ liệu và ứng dụng'),
('420300136624202',	60,	2,	'PLANNING',	2024,	'4203001366',	'Khai thác dữ liệu và ứng dụng'),
('420300136624203',	80,	2,	'CLOSED',	2024,	'4203001366',	'Khai thác dữ liệu và ứng dụng'),
('420300136624204',	70,	2,	'CLOSED',	2024,	'4203001366',	'Khai thác dữ liệu và ứng dụng'),
('420300143224101',	70,	1,	'WAITING',	2024,	'4203001432',	'Kinh tế chính trị Mác - Lênin'),
('420300143224102',	80,	1,	'WAITING',	2024,	'4203001432',	'Kinh tế chính trị Mác - Lênin'),
('420300143224103',	70,	1,	'CLOSED',	2024,	'4203001432',	'Kinh tế chính trị Mác - Lênin'),
('420300143224104',	60,	1,	'CLOSED',	2024,	'4203001432',	'Kinh tế chính trị Mác - Lênin'),
('420300154924201',	80,	2,	'WAITING',	2024,	'4203001549',	'Thống kê máy tính và ứng dụng'),
('420300154924202',	70,	2,	'WAITING',	2024,	'4203001549',	'Thống kê máy tính và ứng dụng'),
('420300154924203',	80,	2,	'OPENED',	2024,	'4203001549',	'Thống kê máy tính và ứng dụng'),
('420300154924204',	70,	2,	'PLANNING',	2024,	'4203001549',	'Thống kê máy tính và ứng dụng'),
('420300200924101',	70,	1,	'CLOSED',	2024,	'4203002009',	'Cấu trúc rời rạc'),
('420300203124201',	70,	2,	'OPENED',	2024,	'4203002031',	'Giáo dục thể chất 2 '),
('420300203124202',	80,	2,	'CLOSED',	2024,	'4203002031',	'Giáo dục thể chất 2 '),
('420300203124203',	70,	2,	'CLOSED',	2024,	'4203002031',	'Giáo dục thể chất 2 '),
('420300203124204',	80,	2,	'CLOSED',	2024,	'4203002031',	'Giáo dục thể chất 2 '),
('420300204424201',	70,	2,	'CLOSED',	2024,	'4203002044',	'Lập trình hướng sự kiện với công nghệ Java'),
('420300207024201',	70,	2,	'WAITING',	2024,	'4203002070',	'Hệ Thống Máy tính'),
('420300213724201',	80,	2,	'OPENED',	2024,	'4203002137',	'Kỹ thuật điện tử'),
('420300213724202',	60,	2,	'PLANNING',	2024,	'4203002137',	'Kỹ thuật điện tử'),
('420300213724203',	70,	2,	'PLANNING',	2024,	'4203002137',	'Kỹ thuật điện tử'),
('420300214524201',	60,	2,	'WAITING',	2024,	'4203002145',	'Hệ Thống và Công nghệ Web'),
('420300214524202',	80,	2,	'CLOSED',	2024,	'4203002145',	'Hệ Thống và Công nghệ Web'),
('420300214624201',	70,	2,	'CLOSED',	2024,	'4203002146',	'Phương pháp tính'),
('420300214624202',	70,	2,	'CLOSED',	2024,	'4203002146',	'Phương pháp tính'),
('420300214624203',	80,	2,	'WAITING',	2024,	'4203002146',	'Phương pháp tính'),
('420300214624204',	60,	2,	'WAITING',	2024,	'4203002146',	'Phương pháp tính'),
('420300232924201',	60,	2,	'CLOSED',	2024,	'4203002329',	'Tiếp thị điện tử'),
('420300233024201',	70,	2,	'CLOSED',	2024,	'4203002330',	'Phân tích thiết kế hệ thống'),
('420300233024202',	80,	2,	'OPENED',	2024,	'4203002330',	'Phân tích thiết kế hệ thống'),
('420300233024203',	80,	2,	'OPENED',	2024,	'4203002330',	'Phân tích thiết kế hệ thống'),
('420300233024204',	60,	2,	'WAITING',	2024,	'4203002330',	'Phân tích thiết kế hệ thống'),
('420300234924201',	70,	2,	'PLANNING',	2024,	'4203002349',	'Vật lý đại cương'),
('420300234924202',	70,	2,	'WAITING',	2024,	'4203002349',	'Vật lý đại cương'),
('420300234924203',	60,	2,	'CLOSED',	2024,	'4203002349',	'Vật lý đại cương'),
('420300234924204',	60,	2,	'CLOSED',	2024,	'4203002349',	'Vật lý đại cương'),
('420300242224101',	80,	1,	'WAITING',	2024,	'4203002422',	'Chủ nghĩa xã hội khoa học'),
('420300242224102',	70,	1,	'WAITING',	2024,	'4203002422',	'Chủ nghĩa xã hội khoa học'),
('420300242224103',	80,	1,	'WAITING',	2024,	'4203002422',	'Chủ nghĩa xã hội khoa học'),
('420300309824101',	60,	1,	'WAITING',	2024,	'4203003098',	'Lịch sử Đảng Cộng sản Việt Nam'),
('420300314724201',	60,	2,	'CLOSED',	2024,	'4203003147',	'Kiến trúc hướng dịch vụ và Điện toán đám mây'),
('420300319224101',	60,	1,	'WAITING',	2024,	'4203003192',	'Lý thuyết đồ thị'),
('420300319224102',	70,	1,	'WAITING',	2024,	'4203003192',	'Lý thuyết đồ thị'),
('420300319224103',	70,	1,	'CLOSED',	2024,	'4203003192',	'Lý thuyết đồ thị'),
('420300319224104',	80,	1,	'WAITING',	2024,	'4203003192',	'Lý thuyết đồ thị'),
('420300319324201',	80,	2,	'CLOSED',	2024,	'4203003193',	'Kỹ thuật lập trình'),
('420300319324202',	80,	2,	'WAITING',	2024,	'4203003193',	'Kỹ thuật lập trình'),
('420300319324203',	70,	2,	'PLANNING',	2024,	'4203003193',	'Kỹ thuật lập trình'),
('420300319424101',	80,	1,	'WAITING',	2024,	'4203003194',	'Tâm lý học đại cương'),
('420300319424102',	60,	1,	'WAITING',	2024,	'4203003194',	'Tâm lý học đại cương'),
('420300319424103',	60,	1,	'CLOSED',	2024,	'4203003194',	'Tâm lý học đại cương'),
('420300319524101',	80,	1,	'PLANNING',	2024,	'4203003195',	'Phát triển ứng dụng'),
('420300319524102',	60,	1,	'CLOSED',	2024,	'4203003195',	'Phát triển ứng dụng'),
('420300319624101',	80,	1,	'WAITING',	2024,	'4203003196',	'Phương pháp luận nghiên cứu khoa học'),
('420300319724101',	60,	1,	'WAITING',	2024,	'4203003197',	'Âm nhạc – Nhạc lý và Guitar căn bản'),
('420300319724102',	80,	1,	'PLANNING',	2024,	'4203003197',	'Âm nhạc – Nhạc lý và Guitar căn bản'),
('420300319824101',	60,	1,	'OPENED',	2024,	'4203003198',	'Lập trình hướng đối tượng'),
('420300319824102',	60,	1,	'PLANNING',	2024,	'4203003198',	'Lập trình hướng đối tượng'),
('420300319824103',	60,	1,	'OPENED',	2024,	'4203003198',	'Lập trình hướng đối tượng'),
('420300319824104',	80,	1,	'WAITING',	2024,	'4203003198',	'Lập trình hướng đối tượng'),
('420300320324101',	60,	1,	'CLOSED',	2024,	'4203003203',	'Đảm bảo chất lượng và Kiểm thử phần mềm'),
('420300320324102',	60,	1,	'CLOSED',	2024,	'4203003203',	'Đảm bảo chất lượng và Kiểm thử phần mềm'),
('420300320324103',	80,	1,	'OPENED',	2024,	'4203003203',	'Đảm bảo chất lượng và Kiểm thử phần mềm'),
('420300320524101',	60,	1,	'OPENED',	2024,	'4203003205',	'Quản trị doanh nghiệp'),
('420300320524102',	60,	1,	'PLANNING',	2024,	'4203003205',	'Quản trị doanh nghiệp'),
('420300320524103',	60,	1,	'PLANNING',	2024,	'4203003205',	'Quản trị doanh nghiệp'),
('420300320624101',	80,	1,	'OPENED',	2024,	'4203003206',	'Môi trường và con người'),
('420300320624102',	70,	1,	'OPENED',	2024,	'4203003206',	'Môi trường và con người'),
('420300321724101',	80,	1,	'WAITING',	2024,	'4203003217',	'Quản trị học'),
('420300321724102',	60,	1,	'WAITING',	2024,	'4203003217',	'Quản trị học'),
('420300321724103',	70,	1,	'WAITING',	2024,	'4203003217',	'Quản trị học'),
('420300324024201',	70,	2,	'PLANNING',	2024,	'4203003240',	'Nhập môn an toàn thông tin'),
('420300324024202',	70,	2,	'WAITING',	2024,	'4203003240',	'Nhập môn an toàn thông tin'),
('420300324224101',	70,	1,	'OPENED',	2024,	'4203003242',	'Cấu trúc dữ liệu và giải thuật'),
('420300324224102',	80,	1,	'PLANNING',	2024,	'4203003242',	'Cấu trúc dữ liệu và giải thuật'),
('420300324224103',	70,	1,	'CLOSED',	2024,	'4203003242',	'Cấu trúc dữ liệu và giải thuật'),
('420300324524101',	60,	1,	'PLANNING',	2024,	'4203003245',	'Lập trình WWW (Java)'),
('420300324524102',	60,	1,	'PLANNING',	2024,	'4203003245',	'Lập trình WWW (Java)'),
('420300324524103',	80,	1,	'PLANNING',	2024,	'4203003245',	'Lập trình WWW (Java)'),
('420300325924101',	70,	1,	'OPENED',	2024,	'4203003259',	'Hệ cơ sở dữ liệu'),
('420300325924102',	60,	1,	'WAITING',	2024,	'4203003259',	'Hệ cơ sở dữ liệu'),
('420300328524101',	60,	1,	'PLANNING',	2024,	'4203003285',	'Giáo dục Quốc phòng và An ninh 1 '),
('420300328524102',	70,	1,	'OPENED',	2024,	'4203003285',	'Giáo dục Quốc phòng và An ninh 1 '),
('420300328524103',	60,	1,	'PLANNING',	2024,	'4203003285',	'Giáo dục Quốc phòng và An ninh 1 '),
('420300328524104',	70,	1,	'WAITING',	2024,	'4203003285',	'Giáo dục Quốc phòng và An ninh 1 '),
('420300328824101',	60,	1,	'WAITING',	2024,	'4203003288',	'Tiếng Việt thực hành'),
('420300328824102',	70,	1,	'PLANNING',	2024,	'4203003288',	'Tiếng Việt thực hành'),
('420300328824103',	80,	1,	'WAITING',	2024,	'4203003288',	'Tiếng Việt thực hành'),
('420300330624201',	70,	2,	'CLOSED',	2024,	'4203003306',	'Mạng máy tính'),
('420300330624202',	70,	2,	'PLANNING',	2024,	'4203003306',	'Mạng máy tính'),
('420300330724101',	70,	1,	'CLOSED',	2024,	'4203003307',	'Lập trình thiết bị di động'),
('420300330724102',	70,	1,	'CLOSED',	2024,	'4203003307',	'Lập trình thiết bị di động'),
('420300332024201',	60,	2,	'WAITING',	2024,	'4203003320',	'Tương tác người máy'),
('420300332024202',	80,	2,	'CLOSED',	2024,	'4203003320',	'Tương tác người máy'),
('420300332024203',	80,	2,	'PLANNING',	2024,	'4203003320',	'Tương tác người máy'),
('420300332024204',	60,	2,	'OPENED',	2024,	'4203003320',	'Tương tác người máy'),
('420300332524101',	80,	1,	'CLOSED',	2024,	'4203003325',	'Phát triển ứng dụng Web với Qt Engine'),
('420300332524102',	80,	1,	'CLOSED',	2024,	'4203003325',	'Phát triển ứng dụng Web với Qt Engine'),
('420300334524201',	60,	2,	'CLOSED',	2024,	'4203003345',	'Công nghệ phần mềm'),
('420300334524202',	60,	2,	'PLANNING',	2024,	'4203003345',	'Công nghệ phần mềm'),
('420300334524203',	70,	2,	'CLOSED',	2024,	'4203003345',	'Công nghệ phần mềm'),
('420300334524204',	60,	2,	'OPENED',	2024,	'4203003345',	'Công nghệ phần mềm'),
('420300334724201',	80,	2,	'OPENED',	2024,	'4203003347',	'Những vấn đề xã hội và đạo đức nghề nghiệp'),
('420300334724202',	80,	2,	'CLOSED',	2024,	'4203003347',	'Những vấn đề xã hội và đạo đức nghề nghiệp'),
('420300334724203',	80,	2,	'PLANNING',	2024,	'4203003347',	'Những vấn đề xã hội và đạo đức nghề nghiệp'),
('420300334724204',	70,	2,	'CLOSED',	2024,	'4203003347',	'Những vấn đề xã hội và đạo đức nghề nghiệp'),
('420300335424201',	60,	2,	'OPENED',	2024,	'4203003354',	'Hệ quản trị cơ sở dữ liệu'),
('420300335424202',	60,	2,	'PLANNING',	2024,	'4203003354',	'Hệ quản trị cơ sở dữ liệu'),
('420300335424203',	70,	2,	'PLANNING',	2024,	'4203003354',	'Hệ quản trị cơ sở dữ liệu'),
('420300335424204',	80,	2,	'CLOSED',	2024,	'4203003354',	'Hệ quản trị cơ sở dữ liệu'),
('420300339524201',	70,	2,	'OPENED',	2024,	'4203003395',	'Automat & ngôn ngữ hình thức'),
('420300343624201',	80,	2,	'WAITING',	2024,	'4203003436',	'Lập trình phân tán với công nghệ Java'),
('420300343624202',	80,	2,	'PLANNING',	2024,	'4203003436',	'Lập trình phân tán với công nghệ Java'),
('420300344224201',	80,	2,	'WAITING',	2024,	'4203003442',	'Nhập môn dữ liệu lớn'),
('420300344224202',	70,	2,	'PLANNING',	2024,	'4203003442',	'Nhập môn dữ liệu lớn'),
('420300344224203',	70,	2,	'WAITING',	2024,	'4203003442',	'Nhập môn dữ liệu lớn'),
('420300344324201',	80,	2,	'CLOSED',	2024,	'4203003443',	'Giáo dục quốc phòng và an ninh 2'),
('420300344324202',	80,	2,	'PLANNING',	2024,	'4203003443',	'Giáo dục quốc phòng và an ninh 2'),
('420300344324203',	70,	2,	'PLANNING',	2024,	'4203003443',	'Giáo dục quốc phòng và an ninh 2'),
('420300344324204',	70,	2,	'CLOSED',	2024,	'4203003443',	'Giáo dục quốc phòng và an ninh 2'),
('420300345124201',	70,	2,	'PLANNING',	2024,	'4203003451',	'Logic học'),
('420300345124202',	70,	2,	'PLANNING',	2024,	'4203003451',	'Logic học'),
('420300345124203',	60,	2,	'CLOSED',	2024,	'4203003451',	'Logic học'),
('420300345324201',	70,	2,	'WAITING',	2024,	'4203003453',	'Lập trình mạng với Qt Framework'),
('420300345324202',	70,	2,	'OPENED',	2024,	'4203003453',	'Lập trình mạng với Qt Framework'),
('420300345324203',	80,	2,	'OPENED',	2024,	'4203003453',	'Lập trình mạng với Qt Framework'),
('420300345324204',	60,	2,	'PLANNING',	2024,	'4203003453',	'Lập trình mạng với Qt Framework'),
('420300350124101',	60,	1,	'PLANNING',	2024,	'4203003501',	'Nhập môn Lập trình'),
('420300350124102',	60,	1,	'WAITING',	2024,	'4203003501',	'Nhập môn Lập trình'),
('420300350124103',	60,	1,	'PLANNING',	2024,	'4203003501',	'Nhập môn Lập trình'),
('420300359124101',	70,	1,	'CLOSED',	2024,	'4203003591',	'Toán cao cấp 1'),
('420300359124102',	80,	1,	'WAITING',	2024,	'4203003591',	'Toán cao cấp 1'),
('420300359124103',	60,	1,	'CLOSED',	2024,	'4203003591',	'Toán cao cấp 1'),
('420300359224101',	70,	1,	'PLANNING',	2024,	'4203003592',	'Mô hình hóa dữ liệu NoSQL MongoDB'),
('420300359224102',	60,	1,	'OPENED',	2024,	'4203003592',	'Mô hình hóa dữ liệu NoSQL MongoDB'),
('420300359224103',	70,	1,	'WAITING',	2024,	'4203003592',	'Mô hình hóa dữ liệu NoSQL MongoDB'),
('420300359224104',	80,	1,	'PLANNING',	2024,	'4203003592',	'Mô hình hóa dữ liệu NoSQL MongoDB'),
('420300362124101',	70,	1,	'WAITING',	2024,	'4203003621',	'Kỹ năng sử dụng bàn phím và thiết bị văn phòng'),
('420300362124102',	60,	1,	'WAITING',	2024,	'4203003621',	'Kỹ năng sử dụng bàn phím và thiết bị văn phòng'),
('420300362124103',	60,	1,	'WAITING',	2024,	'4203003621',	'Kỹ năng sử dụng bàn phím và thiết bị văn phòng'),
('420300362124104',	80,	1,	'CLOSED',	2024,	'4203003621',	'Kỹ năng sử dụng bàn phím và thiết bị văn phòng'),
('420300375324201',	60,	2,	'CLOSED',	2024,	'4203003753',	'Lập trình phân tích dữ liệu 2'),
('420300375324202',	60,	2,	'CLOSED',	2024,	'4203003753',	'Lập trình phân tích dữ liệu 2'),
('420300375324203',	60,	2,	'WAITING',	2024,	'4203003753',	'Lập trình phân tích dữ liệu 2'),
('420300375324204',	70,	2,	'WAITING',	2024,	'4203003753',	'Lập trình phân tích dữ liệu 2'),
('420300375824201',	70,	2,	'PLANNING',	2024,	'4203003758',	'Lập trình thiết bị di động nâng cao'),
('420300375824202',	80,	2,	'WAITING',	2024,	'4203003758',	'Lập trình thiết bị di động nâng cao'),
('420300377324201',	70,	2,	'OPENED',	2024,	'4203003773',	'Thương mại điện tử'),
('420300377324202',	70,	2,	'OPENED',	2024,	'4203003773',	'Thương mại điện tử'),
('420300377324203',	60,	2,	'CLOSED',	2024,	'4203003773',	'Thương mại điện tử'),
('420300377324204',	80,	2,	'CLOSED',	2024,	'4203003773',	'Thương mại điện tử'),
('420300377424101',	70,	1,	'OPENED',	2024,	'4203003774',	'Tiếng Anh 1'),
('420300377424102',	60,	1,	'OPENED',	2024,	'4203003774',	'Tiếng Anh 1'),
('420300377424103',	80,	1,	'OPENED',	2024,	'4203003774',	'Tiếng Anh 1'),
('420300377424104',	80,	1,	'PLANNING',	2024,	'4203003774',	'Tiếng Anh 1'),
('420300377524201',	80,	2,	'WAITING',	2024,	'4203003775',	'Quản lý dự án CNTT'),
('420300384824101',	70,	1,	'WAITING',	2024,	'4203003848',	'Nhập môn Tin học'),
('420300384824102',	70,	1,	'OPENED',	2024,	'4203003848',	'Nhập môn Tin học'),
('420300405624201',	70,	2,	'WAITING',	2024,	'4203004056',	'Hệ quản trị cơ sở dữ liệu NoSQL MongoDB'),
('420300414724101',	80,	1,	'CLOSED',	2024,	'4203004147',	'Tiếng Anh 2'),
('420300414724102',	60,	1,	'PLANNING',	2024,	'4203004147',	'Tiếng Anh 2'),
('420300414724103',	70,	1,	'WAITING',	2024,	'4203004147',	'Tiếng Anh 2'),
('420300432324101',	70,	1,	'PLANNING',	2024,	'4203004323',	'Thực tập doanh nghiệp'),
('420300432324102',	60,	1,	'CLOSED',	2024,	'4203004323',	'Thực tập doanh nghiệp'),
('420300432324103',	80,	1,	'WAITING',	2024,	'4203004323',	'Thực tập doanh nghiệp'),
('420300432324104',	60,	1,	'CLOSED',	2024,	'4203004323',	'Thực tập doanh nghiệp'),
('420301066524101',	70,	1,	'OPENED',	2024,	'4203010665',	'Lập trình WWW (.NET)'),
('420301416424101',	80,	1,	'PLANNING',	2024,	'4203014164',	'Pháp luật đại cương'),
('420301416424102',	70,	1,	'PLANNING',	2024,	'4203014164',	'Pháp luật đại cương'),
('420301416424103',	60,	1,	'PLANNING',	2024,	'4203014164',	'Pháp luật đại cương'),
('420301416424104',	70,	1,	'WAITING',	2024,	'4203014164',	'Pháp luật đại cương'),
('420301416524101',	60,	1,	'CLOSED',	2024,	'4203014165',	'Kỹ năng làm việc nhóm'),
('420301416624201',	80,	2,	'PLANNING',	2024,	'4203014166',	'Lập trình phân tán với công nghệ .NET'),
('420301416724101',	80,	1,	'WAITING',	2024,	'4203014167',	'Cơ sở văn hóa Việt Nam'),
('420301416724102',	60,	1,	'OPENED',	2024,	'4203014167',	'Cơ sở văn hóa Việt Nam'),
('420301416724103',	70,	1,	'OPENED',	2024,	'4203014167',	'Cơ sở văn hóa Việt Nam'),
('420301416724104',	80,	1,	'CLOSED',	2024,	'4203014167',	'Cơ sở văn hóa Việt Nam'),
('420301416824101',	80,	1,	'OPENED',	2024,	'4203014168',	'Triết học Mác - Lênin'),
('420301416924101',	70,	1,	'OPENED',	2024,	'4203014169',	'Lập trình IoTs'),
('420301416924102',	60,	1,	'WAITING',	2024,	'4203014169',	'Lập trình IoTs'),
('420301416924103',	60,	1,	'WAITING',	2024,	'4203014169',	'Lập trình IoTs'),
('420301416924104',	80,	1,	'PLANNING',	2024,	'4203014169',	'Lập trình IoTs'),
('420301417024101',	70,	1,	'WAITING',	2024,	'4203014170',	'Khóa luận tốt nghiệp'),
('420301419324101',	80,	1,	'WAITING',	2024,	'4203014193',	'Kế toán cơ bản'),
('420301419324102',	60,	1,	'CLOSED',	2024,	'4203014193',	'Kế toán cơ bản'),
('420301419324103',	70,	1,	'PLANNING',	2024,	'4203014193',	'Kế toán cơ bản'),
('420301525324101',	80,	1,	'WAITING',	2024,	'4203015253',	'Hội họa'),
('420301525324102',	70,	1,	'CLOSED',	2024,	'4203015253',	'Hội họa'),
('420301525324103',	70,	1,	'PLANNING',	2024,	'4203015253',	'Hội họa'),
('420301525424101',	80,	1,	'CLOSED',	2024,	'4203015254',	'Toán cao cấp 2'),
('420301525424102',	80,	1,	'CLOSED',	2024,	'4203015254',	'Toán cao cấp 2'),
('420301525424103',	60,	1,	'WAITING',	2024,	'4203015254',	'Toán cao cấp 2'),
('420301525424104',	70,	1,	'OPENED',	2024,	'4203015254',	'Toán cao cấp 2');

DROP TABLE IF EXISTS `enrollments`;
CREATE TABLE `enrollments` (
  `registry_class` varchar(255) NOT NULL,
  `student_id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `semester` int NOT NULL,
  `year` int NOT NULL,
  `course_id` varchar(255) NOT NULL,
  PRIMARY KEY (`registry_class`,`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELIMITER //

CREATE PROCEDURE register_class (
    IN p_student_id VARCHAR(255),
    IN p_class_id VARCHAR(255),
    OUT p_status_code int
)
BEGIN
    DECLARE v_max_capacity INT;
    DECLARE v_current_students INT;
    DECLARE v_semester INT;
    DECLARE v_year INT;
    DECLARE v_course_id VARCHAR(255);
    -- Start transaction
    START TRANSACTION;

    -- Get the maximum capacity and status of the class
    SELECT max_capacity, semester, year, course_id year INTO v_max_capacity, v_semester, v_year, v_course_id FROM classes WHERE id = p_class_id FOR UPDATE;

    -- Get the current number of students registered for the class
    -- Check if the class is full
    IF EXISTS (SELECT 1 FROM enrollments WHERE registry_class = p_class_id HAVING COUNT(*) >= v_max_capacity) THEN
        SET p_status_code = 409; -- HTTP status code for class is full
    ELSE
        -- Insert enrollment record
        INSERT INTO enrollments (registry_class, student_id, created_at, semester, year, course_id) VALUES (p_class_id, p_student_id, NOW(), v_semester, v_year, v_course_id);
        SET p_status_code = 201; -- HTTP status code for created
    END IF;

    -- Commit transaction
    COMMIT;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE change_class (
    IN p_student_id VARCHAR(255),
    IN p_old_class_id VARCHAR(255),
    IN p_new_class_id VARCHAR(255),
    OUT p_status_code int
)
BEGIN
    DECLARE v_max_capacity INT;
    DECLARE v_old_course_id VARCHAR(255);
    DECLARE v_new_course_id VARCHAR(255);

    -- Start transaction
    START TRANSACTION;

    -- Get the maximum capacity and status of the new class
    SELECT max_capacity status INTO v_max_capacity FROM classes WHERE id = p_new_class_id FOR UPDATE;
    
    -- Get the current number of students registered for the class
    -- Check if the class is full
    IF EXISTS (SELECT 1 FROM enrollments WHERE registry_class = p_new_class_id HAVING COUNT(*) >= v_max_capacity) THEN
        SET p_status_code = 409; -- HTTP status code for class is full
    ELSE
        -- Update enrollment record
        UPDATE enrollments SET registry_class = p_new_class_id WHERE student_id = p_student_id AND registry_class = p_old_class_id;
        SET p_status_code = 200; -- HTTP status code for successful update
    END IF;

    -- Commit transaction
    COMMIT;
END//

DELIMITER ;