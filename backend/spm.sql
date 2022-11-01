-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 27, 2021 at 08:33 AM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `SPM`
--
DROP DATABASE IF EXISTS `SPM`;
CREATE DATABASE IF NOT EXISTS `SPM` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `SPM`;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--
DROP TABLE IF EXISTS `staff`;
CREATE TABLE IF NOT EXISTS `staff` (
  `staff_id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `staff_fname` varchar(50) NOT NULL,
  `staff_lname` varchar(50) NOT NULL,
  `dept` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `type` int(11) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `staff` (`staff_id`, `staff_fname`, `staff_lname`, `dept`, `email`, `type`, `status`) VALUES
(130001, 'John', 'Sim', 'Chairman', 'john.sim@allinone.com.sg', 1, 'Active'),
(130002, 'Jack', 'Sim', 'CEO', 'jack.sim@allinone.com.sg', 1, 'Active'),
(140001, 'Derek', 'Tan', 'Sales', 'Derek.Tan@allinone.com.sg', 3, 'Active'),
(140002, 'Susan', 'Goh', 'Sales', 'Susan.Goh@allinone.com.sg', 2, 'Active'),
(140003, 'Janice', 'Chan', 'Sales', 'Janice.Chan@allinone.com.sg', 2, 'Active'),
(140004, 'Mary', 'Teo', 'Sales', 'Mary.Teo@allinone.com.sg', 2, 'Active'),
(140008, 'Jaclyn', 'Lee', 'Sales', 'Jaclyn.Lee@allinone.com.sg', 2, 'Active'),
(140015, 'Oliva', 'Lim', 'Sales', 'Oliva.Lim@allinone.com.sg', 2, 'Active'),
(140025, 'Emma', 'Heng', 'Sales', 'Emma.Heng@allinone.com.sg', 2, 'Active'),
(140036, 'Charlotte', 'Wong', 'Sales', 'Charlotte.Wong@allinone.com.sg', 2, 'Active'),
(140078, 'Amelia', 'Ong', 'Sales', 'Amelia.Ong@allinone.com.sg', 2, 'Active'),
(140102, 'Eva', 'Yong', 'Sales', 'Eva.Yong@allinone.com.sg', 2, 'Active'),
(140103, 'Sophia', 'Toh', 'Sales', 'Sophia.Toh@allinone.com.sg', 2, 'Active'),
(140108, 'Liam', 'The', 'Sales', 'Liam.The@allinone.com.sg', 2, 'Active'),
(140115, 'Noah', 'Ng', 'Sales', 'Noah.Ng@allinone.com.sg', 2, 'Active'),
(140525, 'Oliver', 'Tan', 'Sales', 'Oliver.Tan@allinone.com.sg', 2, 'Active'),
(140736, 'William', 'Fu', 'Sales', 'William.Fu@allinone.com.sg', 2, 'Active'),
(140878, 'James', 'Tong', 'Sales', 'James.Tong@allinone.com.sg', 2, 'Active'),
(150008, 'Eric', 'Loh', 'Ops', 'Eric.Loh@allinone.com.sg', 3, 'Active'),
(150065, 'Noah', 'Goh', 'Ops', 'Noah.Goh@allinone.com.sg', 4, 'Active'),
(150075, 'Liam', 'Tan', 'Ops', 'Liam.Tan@allinone.com.sg', 4, 'Active'),
(150076, 'Oliver', 'Chan', 'Ops', 'Oliver.Chan@allinone.com.sg', 4, 'Active'),
(150085, 'Michael', 'Ng', 'Ops', 'Michael.Ng@allinone.com.sg', 4, 'Active'),
(150095, 'Alexander', 'The', 'Ops', 'Alexander.The@allinone.com.sg', 4, 'Active'),
(150096, 'Ethan', 'Tan', 'Ops', 'Ethan.Tan@allinone.com.sg', 4, 'Active'),
(150115, 'Jaclyn', 'Lee', 'Ops', 'Jaclyn.Lee@allinone.com.sg', 4, 'Active'),
(150118, 'William', 'Teo', 'Ops', 'William.Teo@allinone.com.sg', 4, 'Active'),
(150125, 'Mary', 'Teo', 'Ops', 'Mary.Teo@allinone.com.sg', 4, 'Active'),
(150126, 'Oliva', 'Lim', 'Ops', 'Oliva.Lim@allinone.com.sg', 2, 'Active'),
(150138, 'Daniel', 'Fu', 'Ops', 'Daniel.Fu@allinone.com.sg', 4, 'Active'),
(150142, 'James', 'Lee', 'Ops', 'James.Lee@allinone.com.sg', 4, 'Active'),
(150143, 'John', 'Lim', 'Ops', 'John.Lim@allinone.com.sg', 4, 'Active'),
(150148, 'Jack', 'Heng', 'Ops', 'Jack.Heng@allinone.com.sg', 4, 'Active'),
(150155, 'Derek', 'Wong', 'Ops', 'Derek.Wong@allinone.com.sg', 4, 'Active'),
(150162, 'Jacob', 'Tong', 'Ops', 'Jacob.Tong@allinone.com.sg', 4, 'Active'),
(150163, 'Logan', 'Loh', 'Ops', 'Logan.Loh@allinone.com.sg', 4, 'Active'),
(150165, 'Oliver', 'Tan', 'Ops', 'Oliver.Tan@allinone.com.sg', 2, 'Active'),
(150166, 'William', 'Fu', 'Ops', 'William.Fu@allinone.com.sg', 2, 'Active'),
(150168, 'Jackson', 'Tan', 'Ops', 'Jackson.Tan@allinone.com.sg', 4, 'Active'),
(150175, 'Aiden', 'Tan', 'Ops', 'Aiden.Tan@allinone.com.sg', 4, 'Active'),
(150192, 'Emma', 'Heng', 'Ops', 'Emma.Heng@allinone.com.sg', 2, 'Active'),
(150193, 'Charlotte', 'Wong', 'Ops', 'Charlotte.Wong@allinone.com.sg', 2, 'Active'),
(150198, 'Amelia', 'Ong', 'Ops', 'Amelia.Ong@allinone.com.sg', 2, 'Active'),
(150205, 'Eva', 'Yong', 'Ops', 'Eva.Yong@allinone.com.sg', 2, 'Active'),
(150208, 'James', 'Tong', 'Ops', 'James.Tong@allinone.com.sg', 2, 'Active'),
(150215, 'Michael', 'Lee', 'Ops', 'Michael.Lee@allinone.com.sg', 2, 'Active'),
(150216, 'Ethan', 'Lim', 'Ops', 'Ethan.Lim@allinone.com.sg', 2, 'Active'),
(150232, 'John', 'Loh', 'Ops', 'John.Loh@allinone.com.sg', 2, 'Active'),
(150233, 'Jack', 'Tan', 'Ops', 'Jack.Tan@allinone.com.sg', 2, 'Active'),
(150238, 'Derek', 'Tan', 'Ops', 'Derek.Tan@allinone.com.sg', 2, 'Active'),
(150245, 'Benjamin', 'Tan', 'Ops', 'Benjamin.Tan@allinone.com.sg', 2, 'Active'),
(150258, 'Daniel', 'Heng', 'Ops', 'Daniel.Heng@allinone.com.sg', 2, 'Active'),
(150265, 'Jaclyn', 'Tong', 'Ops', 'Jaclyn.Tong@allinone.com.sg', 2, 'Active'),
(150275, 'Mary', 'Fu', 'Ops', 'Mary.Fu@allinone.com.sg', 2, 'Active'),
(150276, 'Oliva', 'Loh', 'Ops', 'Oliva.Loh@allinone.com.sg', 2, 'Active'),
(150282, 'Jacob', 'Wong', 'Ops', 'Jacob.Wong@allinone.com.sg', 2, 'Active'),
(150283, 'Logan', 'Ong', 'Ops', 'Logan.Ong@allinone.com.sg', 2, 'Active'),
(150288, 'Jackson', 'Yong', 'Ops', 'Jackson.Yong@allinone.com.sg', 2, 'Active'),
(150295, 'Aiden', 'Toh', 'Ops', 'Aiden.Toh@allinone.com.sg', 2, 'Active'),
(150318, 'Emma', 'Tan', 'Ops', 'Emma.Tan@allinone.com.sg', 2, 'Active'),
(150342, 'Charlotte', 'Tan', 'Ops', 'Charlotte.Tan@allinone.com.sg', 2, 'Active'),
(150343, 'Amelia', 'Tan', 'Ops', 'Amelia.Tan@allinone.com.sg', 2, 'Active'),
(150345, 'William', 'Heng', 'Ops', 'William.Heng@allinone.com.sg', 2, 'Active'),
(150348, 'Eva', 'Goh', 'Ops', 'Eva.Goh@allinone.com.sg', 2, 'Active'),
(150355, 'Sophia', 'Chan', 'Ops', 'Sophia.Chan@allinone.com.sg', 2, 'Active'),
(150356, 'James', 'Wong', 'Ops', 'James.Wong@allinone.com.sg', 2, 'Active'),
(150398, 'John', 'Ong', 'Ops', 'John.Ong@allinone.com.sg', 2, 'Active'),
(150422, 'Jack', 'Yong', 'Ops', 'Jack.Yong@allinone.com.sg', 2, 'Active'),
(150423, 'Derek', 'Toh', 'Ops', 'Derek.Toh@allinone.com.sg', 2, 'Active'),
(150428, 'Benjamin', 'The', 'Ops', 'Benjamin.The@allinone.com.sg', 2, 'Active'),
(150435, 'Lucas', 'Ng', 'Ops', 'Lucas.Ng@allinone.com.sg', 2, 'Active'),
(150445, 'Ethan', 'Loh', 'Ops', 'Ethan.Loh@allinone.com.sg', 2, 'Active'),
(150446, 'Daniel', 'Tan', 'Ops', 'Daniel.Tan@allinone.com.sg', 2, 'Active'),
(150488, 'Jacob', 'Tan', 'Ops', 'Jacob.Tan@allinone.com.sg', 2, 'Active'),
(150512, 'Logan', 'Tan', 'Ops', 'Logan.Tan@allinone.com.sg', 2, 'Active'),
(150513, 'Jackson', 'Goh', 'Ops', 'Jackson.Goh@allinone.com.sg', 2, 'Active'),
(150518, 'Aiden', 'Chan', 'Ops', 'Aiden.Chan@allinone.com.sg', 2, 'Active'),
(150525, 'Samuel', 'Teo', 'Ops', 'Samuel.Teo@allinone.com.sg', 2, 'Active'),
(150555, 'Jaclyn', 'Wong', 'Ops', 'Jaclyn.Wong@allinone.com.sg', 2, 'Active'),
(150565, 'Benjamin', 'Ong', 'Ops', 'Benjamin.Ong@allinone.com.sg', 4, 'Active'),
(150566, 'Oliva', 'Ong', 'Ops', 'Oliva.Ong@allinone.com.sg', 2, 'Active'),
(150585, 'Samuel', 'Tan', 'Ops', 'Samuel.Tan@allinone.com.sg', 4, 'Active'),
(150608, 'Emma', 'Yong', 'Ops', 'Emma.Yong@allinone.com.sg', 2, 'Active'),
(150615, 'Sophia', 'Toh', 'Ops', 'Sophia.Toh@allinone.com.sg', 2, 'Active'),
(150632, 'Charlotte', 'Toh', 'Ops', 'Charlotte.Toh@allinone.com.sg', 2, 'Active'),
(150633, 'Amelia', 'The', 'Ops', 'Amelia.The@allinone.com.sg', 2, 'Active'),
(150638, 'Eva', 'Ng', 'Ops', 'Eva.Ng@allinone.com.sg', 2, 'Active'),
(150645, 'Sophia', 'Tan', 'Ops', 'Sophia.Tan@allinone.com.sg', 2, 'Active'),
(150655, 'Lucas', 'Goh', 'Ops', 'Lucas.Goh@allinone.com.sg', 2, 'Active'),
(150695, 'William', 'Tan', 'Ops', 'William.Tan@allinone.com.sg', 2, 'Active'),
(150705, 'Samuel', 'The', 'Ops', 'Samuel.The@allinone.com.sg', 2, 'Active'),
(150765, 'Liam', 'Teo', 'Ops', 'Liam.Teo@allinone.com.sg', 2, 'Active'),
(150776, 'Lucas', 'Yong', 'Ops', 'Lucas.Yong@allinone.com.sg', 4, 'Active'),
(150796, 'Susan', 'Goh', 'Ops', 'Susan.Goh@allinone.com.sg', 4, 'Active'),
(150826, 'Liam', 'The', 'Ops', 'Liam.The@allinone.com.sg', 2, 'Active'),
(150845, 'Henry', 'Tan', 'Ops', 'Henry.Tan@allinone.com.sg', 2, 'Active'),
(150866, 'Henry', 'Chan', 'Ops', 'Henry.Chan@allinone.com.sg', 2, 'Active'),
(150916, 'Susan', 'Ng', 'Ops', 'Susan.Ng@allinone.com.sg', 2, 'Active'),
(150918, 'Henry', 'Toh', 'Ops', 'Henry.Toh@allinone.com.sg', 4, 'Active'),
(150935, 'Susan', 'Lee', 'Ops', 'Susan.Lee@allinone.com.sg', 2, 'Active'),
(150938, 'Janice', 'Chan', 'Ops', 'Janice.Chan@allinone.com.sg', 4, 'Active'),
(150968, 'Noah', 'Ng', 'Ops', 'Noah.Ng@allinone.com.sg', 2, 'Active'),
(150976, 'Noah', 'Lee', 'Ops', 'Noah.Lee@allinone.com.sg', 2, 'Active'),
(151008, 'Alexander', 'Teo', 'Ops', 'Alexander.Teo@allinone.com.sg', 2, 'Active'),
(151055, 'Liam', 'Fu', 'Ops', 'Liam.Fu@allinone.com.sg', 2, 'Active'),
(151056, 'Alexander', 'Fu', 'Ops', 'Alexander.Fu@allinone.com.sg', 2, 'Active'),
(151058, 'Janice', 'Tan', 'Ops', 'Janice.Tan@allinone.com.sg', 2, 'Active'),
(151118, 'Oliver', 'Lim', 'Ops', 'Oliver.Lim@allinone.com.sg', 2, 'Active'),
(151146, 'Janice', 'Lim', 'Ops', 'Janice.Lim@allinone.com.sg', 2, 'Active'),
(151198, 'Michael', 'Tong', 'Ops', 'Michael.Tong@allinone.com.sg', 2, 'Active'),
(151266, 'Noah', 'Tong', 'Ops', 'Noah.Tong@allinone.com.sg', 2, 'Active'),
(151288, 'Mary', 'Heng', 'Ops', 'Mary.Heng@allinone.com.sg', 2, 'Active'),
(151408, 'Oliver', 'Loh', 'Ops', 'Oliver.Loh@allinone.com.sg', 2, 'Active'),
(160008, 'Sally', 'Loh', 'HR', 'Sally.Loh@allinone.com.sg', 1, 'Active'),
(160065, 'John', 'Tan', 'HR', 'John.Tan@allinone.com.sg', 1, 'Active'),
(160075, 'James', 'Tan', 'HR', 'James.Tan@allinone.com.sg', 1, 'Active'),
(160076, 'Jack', 'Goh', 'HR', 'Jack.Goh@allinone.com.sg', 1, 'Active'),
(160118, 'Derek', 'Chan', 'HR', 'Derek.Chan@allinone.com.sg', 1, 'Active'),
(160135, 'Jaclyn', 'Ong', 'HR', 'Jaclyn.Ong@allinone.com.sg', 2, 'Active'),
(160142, 'Benjamin', 'Teo', 'HR', 'Benjamin.Teo@allinone.com.sg', 1, 'Active'),
(160143, 'Lucas', 'Lee', 'HR', 'Lucas.Lee@allinone.com.sg', 1, 'Active'),
(160145, 'Mary', 'Wong', 'HR', 'Mary.Wong@allinone.com.sg', 2, 'Active'),
(160146, 'Oliva', 'Yong', 'HR', 'Oliva.Yong@allinone.com.sg', 2, 'Active'),
(160148, 'Henry', 'Lim', 'HR', 'Henry.Lim@allinone.com.sg', 1, 'Active'),
(160155, 'Alexander', 'Heng', 'HR', 'Alexander.Heng@allinone.com.sg', 1, 'Active'),
(160188, 'Emma', 'Toh', 'HR', 'Emma.Toh@allinone.com.sg', 2, 'Active'),
(160212, 'Charlotte', 'The', 'HR', 'Charlotte.The@allinone.com.sg', 2, 'Active'),
(160213, 'Amelia', 'Ng', 'HR', 'Amelia.Ng@allinone.com.sg', 2, 'Active'),
(160218, 'Eva', 'Tan', 'HR', 'Eva.Tan@allinone.com.sg', 2, 'Active'),
(160225, 'Sophia', 'Fu', 'HR', 'Sophia.Fu@allinone.com.sg', 2, 'Active'),
(160258, 'Michael', 'Tong', 'HR', 'Michael.Tong@allinone.com.sg', 2, 'Active'),
(160282, 'Ethan', 'Loh', 'HR', 'Ethan.Loh@allinone.com.sg', 2, 'Active'),
(170166, 'David', 'Yap', 'Finance', 'David.Yap@allinone.com.sg', 3, 'Active'),
(170208, 'Daniel', 'Tan', 'Finance', 'Daniel.Tan@allinone.com.sg', 2, 'Active'),
(170215, 'Mary', 'Wong', 'Finance', 'Mary.Wong@allinone.com.sg', 2, 'Active'),
(170216, 'Jaclyn', 'Ong', 'Finance', 'Jaclyn.Ong@allinone.com.sg', 2, 'Active'),
(170232, 'Jacob', 'Tan', 'Finance', 'Jacob.Tan@allinone.com.sg', 2, 'Active'),
(170233, 'Logan', 'Goh', 'Finance', 'Logan.Goh@allinone.com.sg', 2, 'Active'),
(170238, 'Jackson', 'Chan', 'Finance', 'Jackson.Chan@allinone.com.sg', 2, 'Active'),
(170245, 'Aiden', 'Teo', 'Finance', 'Aiden.Teo@allinone.com.sg', 2, 'Active'),
(170655, 'Samuel', 'Lee', 'Finance', 'Samuel.Lee@allinone.com.sg', 2, 'Active'),
(170866, 'Susan', 'Lim', 'Finance', 'Susan.Lim@allinone.com.sg', 2, 'Active'),
(171008, 'Janice', 'Heng', 'Finance', 'Janice.Heng@allinone.com.sg', 2, 'Active');
COMMIT;

--
-- Table structure for table `role`
--
DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  `role_desc` varchar(255) NOT NULL,
  `role_dept` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `role` (`role_id`, `role_name`, `role_desc`, `role_dept`, `status`) VALUES
(1, 'Product Manager', 'product manager lor', 'Business Support', 'ACTIVE'),
(2, 'Software Engineer', 'SWESWESWEDEN', 'Tech', 'ACTIVE'),
(3, 'Data Analyst', 'just being a data-man', 'Tech', 'ACTIVE');
COMMIT;

--
-- Table structure for table `registration`
--
-- DROP TABLE IF EXISTS `registration`;
-- CREATE TABLE IF NOT EXISTS `registration` (
--   `reg_id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
--   `course_id` varchar(50) NOT NULL,
--   `staff_id` varchar(50) NOT NULL,
--   `reg_status` varchar(50) NOT NULL,
--   `completion_status` varchar(50) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERT INTO `role` (`role_id`, `role_name`, `status`) VALUES
-- (1, 'Product Manager', 'Active'),
-- (2, 'Software Engineer', 'Active'),
-- (3, 'Full-stack developer', 'Active');
-- COMMIT;


--
-- Table structure for table `learning_journey`
--
DROP TABLE IF EXISTS `learning_journey`;
CREATE TABLE IF NOT EXISTS `learning_journey` (
  `learning_journey_id` varchar(23) PRIMARY KEY NOT NULL,
  `learning_journey_name` varchar(50) NOT NULL,
  `role_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `learning_journey`
  ADD CONSTRAINT `learning_journey_fk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  ADD CONSTRAINT `learning_journey_fk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

INSERT INTO `learning_journey` (`learning_journey_id`, `learning_journey_name`, `role_id`, `staff_id`) VALUES
('160155_1', 'Product Manager 1', 1, 160155),
('151266_1', 'Product Manager 2', 1, 151266),
('150008_3', 'Data Analyst 1', 3, 150008);
COMMIT;

--
-- Table structure for table `skill`
--
DROP TABLE IF EXISTS `skill`;
CREATE TABLE IF NOT EXISTS `skill` (
  `skill_id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(50) NOT NULL,
  `skill_desc` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `skill` (`skill_id`, `skill_name`, `skill_desc`, `status`) VALUES
(1, 'Python', 'General-purpose Programming language', 'ACTIVE'),
(2, 'Leadership', 'Leadership skill', 'ACTIVE'),
(3, 'Info-sec', 'Info-sec framework', 'ACTIVE'),
(4, 'Data analysis', 'Foundations of data analytics', 'ACTIVE'),
(5, 'Management', 'Management techniques and ideologies', 'ACTIVE');
COMMIT;

--
-- Table structure for table `course`
--
DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
  `course_id` varchar(20) PRIMARY KEY NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `course_desc` varchar(255) DEFAULT NULL,
  `course_status` varchar(15) DEFAULT NULL,
  `course_type` varchar(10) DEFAULT NULL,
  `course_category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `course` (`course_id`, `course_name`, `course_desc`, `course_status`, `course_type`, `course_category`) VALUES
('COR001', 'Systems Thinking and Design', 'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,', 'Active', 'Internal', 'Core'),
('COR002', 'Lean Six Sigma Green Belt Certification', 'Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics', 'Active', 'Internal', 'Core'),
('COR004', 'Service Excellence', 'The programme provides the learner with the key foundations of what builds customer confidence in the service industr', 'Pending', 'Internal', 'Core'),
('COR006', 'Manage Change', 'Identify risks associated with change and develop risk mitigation plans.', 'Retired', 'External', 'Core'),
('FIN001', 'Data Collection and Analysis', 'Data is meaningless unless insights and analysis can be drawn to provide useful information for business decision-making. It is imperative that data quality, integrity and security ', 'Active', 'External', 'Finance'),
('FIN002', 'Risk and Compliance Reporting', 'Regulatory reporting is a requirement for businesses from highly regulated sectors to demonstrate compliance with the necessary regulatory provisions.', 'Active', 'External', 'Finance'),
('FIN003', 'Business Continuity Planning', 'Business continuity planning is essential in any business to minimise loss when faced with potential threats and disruptions.', 'Retired', 'External', 'Finance'),
('HRD001', 'Leading and Shaping a Culture in Learning', 'This training programme, delivered by the National Centre of Excellence (Workplace Learning), aims to equip participants with the skills and knowledge of the National workplace learning certification framework,', 'Active', 'External', 'HR'),
('MGT001', 'People Management', 'enable learners to manage team performance and development through effective communication, conflict resolution and negotiation skills.', 'Active', 'Internal', 'Management'),
('MGT002', 'Workplace Conflict Management for Professionals', 'This course will address the gaps to build consensus and utilise knowledge of conflict management techniques to diffuse tensions and achieve resolutions effectively in the best interests of the organisation.', 'Active', 'External', 'Management'),
('MGT003', 'Enhance Team Performance Through Coaching', 'The course aims to upskill real estate team leaders in the area of service coaching for performance.', 'Pending', 'Internal', 'Management'),
('MGT004', 'Personal Effectiveness for Leaders', 'Learners will be able to acquire the skills and knowledge to undertake self-assessment in relation to one’s performance and leadership style', 'Active', 'External', 'Management'),
('MGT007', 'Supervisory Management Skills', 'Supervisors lead teams, manage tasks, solve problems, report up and down the hierarchy, and much more. ', 'Retired', 'External', 'Management'),
('SAL001', 'Risk Management for Smart Business', 'Apply risk management concepts to digital business', 'Retired', 'Internal', 'Sales'),
('SAL002', 'CoC in Smart Living Solutions', 'Participants will acquire the knowledge and skills in setting up a smart living solution', 'Pending', 'External', 'Sales'),
('SAL003', 'Optimising Your Brand For The Digital Spaces', 'Digital has fundamentally shifted communication between brands and their consumers from a one-way broadcast to a two-way dialogue. In a hastened bid to transform their businesses to be digital market-ready,', 'Active', 'External', 'Sales'),
('SAL004', 'Stakeholder Management', 'Develop a stakeholder engagement plan and negotiate with stakeholders to arrive at mutually-beneficial arrangements.', 'Active', 'Internal', 'Sales'),
('tch001', 'Print Server Setup', 'Setting up print server in enterprise environment', 'Retired', 'Internal', 'Technical'),
('tch002', 'Canon MFC Setup', 'Setting up Canon ImageRUNNER series of products', 'Retired', 'Internal', 'Technical'),
('tch003', 'Canon MFC Mainteance and Troubleshooting', 'Troubleshoot and fixing L2,3 issues of Canon ImageRUNNER series of products', 'Active', 'Internal', 'Technical'),
('tch004', 'Introduction to Open Platform Communications', 'This course provides the participants with a good in-depth understanding of the SS IEC 62541 standard', 'Pending', 'Internal', 'Technical'),
('tch005', 'An Introduction to Sustainability', 'The course provides learners with the multi-faceted basic knowledge of sustainability.', 'Active', 'External', 'Technical'),
('tch006', 'Machine Learning DevOps Engineer ', 'The Machine Learning DevOps Engineer Nanodegree program focuses on the software engineering fundamentals needed to successfully streamline the deployment of data and machine-learning models', 'Pending', 'Internal', 'Technical'),
('tch008', 'Technology Intelligence and Strategy', 'Participants will be able to gain knowledge and skills on: - establishing technology strategy with technology intelligence framework and tools', 'Active', 'External', 'Technical'),
('tch009', 'Smart Sensing Technology', 'This course introduces sensors and sensing systems. The 5G infrastructure enables the many fast-growing IoT applications equipped with sensors ', 'Pending', 'External', 'Technical'),
('tch012', 'Internet of Things', 'The Internet of Things (IoT) is integrating our digital and physical world, opening up new and exciting opportunities to deploy, automate, optimize and secure diverse use cases and applications. ', 'Active', 'Internal', 'Technical'),
('tch013', 'Managing Cybersecurity and Risks', 'Digital security is the core of our daily lives considering that our dependence on the digital world', 'Active', 'Internal', 'Technical'),
('tch014', 'Certified Information Privacy Professional', 'The Certified Information Privacy Professional/ Asia (CIPP/A) is the first publicly available privacy certification', 'Active', 'External', 'Technical'),
('tch015', 'Network Security', 'Understanding of the fundamental knowledge of network security including cryptography, authentication and key distribution. The security techniques at various layers of computer networks are examined.', 'Active', 'External', 'Technical'),
('tch018', 'Professional Project Management', 'solid foundation in the project management processes from initiating a project, through planning, execution, control,', 'Active', 'Internal', 'Technical'),
('tch019', 'Innovation and Change Management ', 'the organization that constantly reinvents itself to be relevant has a better chance of making progress', 'Active', 'External', 'Technical');
COMMIT;

--
-- Table structure for table `role_skill`
--
DROP TABLE IF EXISTS `role_skill`;
CREATE TABLE IF NOT EXISTS `role_skill` (
  `role_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `role_skill`
  ADD CONSTRAINT `role_skill_fk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  ADD CONSTRAINT `role_skill_fk_2` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`);

INSERT INTO `role_skill` (`role_id`, `skill_id`) VALUES
(1, 2),
(1, 5),
(2, 1),
(2, 3),
(3, 1),
(3, 4);
COMMIT;

--
-- Table structure for table `skill_course`
--
DROP TABLE IF EXISTS `skill_course`;
CREATE TABLE IF NOT EXISTS `skill_course` (
  `skill_id` int(11) NOT NULL,
  `course_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `skill_course`
  ADD CONSTRAINT `skill_course_fk_1` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`),
  ADD CONSTRAINT `skill_course_fk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`);

INSERT INTO `skill_course` (`skill_id`, `course_id`) VALUES
(1, 'FIN001'),
(1, 'tch006'),
(2, 'HRD001'),
(2, 'MGT003'),
(2, 'MGT004'),
(3, 'tch013'),
(3, 'tch014'),
(3, 'tch015'),
(4, 'COR002'),
(4, 'FIN001'),
(5, 'COR006'),
(5, 'MGT001'),
(5, 'MGT002'),
(5, 'MGT007'),
(5, 'SAL001'),
(5, 'SAL004'),
(5, 'tch018'),
(5, 'tch019');
COMMIT;

--
-- Table structure for table `learning_journey_course`
--
DROP TABLE IF EXISTS `learning_journey_course`;
CREATE TABLE IF NOT EXISTS `learning_journey_course` (
  `learning_journey_id` varchar(23) NOT NULL,
  `course_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `learning_journey_course`
  ADD CONSTRAINT `learning_journey_course_fk_1` FOREIGN KEY (`learning_journey_id`) REFERENCES `learning_journey` (`learning_journey_id`),
    ADD CONSTRAINT `learning_journey_course_fk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`);

INSERT INTO `learning_journey_course` (`learning_journey_id`, `course_id`) VALUES
('160155_1', 'HRD001'),
('160155_1', 'COR006'),
('151266_1', 'HRD001'),
('150008_3', 'COR002');
COMMIT;

--
-- Table structure for table `staff_course` (Take note this is a db.Model, unlike other db.Tables)
--
DROP TABLE IF EXISTS `staff_course`;
CREATE TABLE IF NOT EXISTS `staff_course` (
  `staff_id` int(11) NOT NULL,
  `course_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `staff_course`
  ADD CONSTRAINT `staff_course_fk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `staff_course_fk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`);

INSERT INTO `staff_course` (`staff_id`, `course_id`) VALUES
(130001, 'COR002'),
(130001, 'COR001'),
(130002, 'COR002'),
(140001, 'COR002'),
(140001, 'SAL004'),
(140001, 'MGT001'),
(140002, 'COR002'),
(140002, 'SAL004'),
(140003, 'SAL003'),
(140003, 'FIN002'),
(140004, 'COR002'),
(140078, 'MGT007'),
(140108, 'SAL003'),
(140108, 'SAL004'),
(140115, 'COR002'),
(140115, 'SAL004'),
(140115, 'tch001'),
(140525, 'SAL004'),
(140525, 'tch002'),
(140878, 'COR002'),
(150008, 'MGT001'),
(150008, 'COR002'),
(150075, 'COR002'),
(150096, 'tch003'),
(150115, 'tch001'),
(150115, 'tch005'),
(150118, 'COR002'),
(150118, 'tch005'),
(150125, 'tch003'),
(150126, 'tch002'),
(150138, 'COR002'),
(150143, 'tch001'),
(150143, 'tch019'),
(150148, 'COR001'),
(150162, 'COR002'),
(150162, 'tch005'),
(150163, 'COR002'),
(150166, 'COR002'),
(150166, 'tch005'),
(150166, 'MGT001'),
(150168, 'COR002'),
(150175, 'SAL003'),
(150192, 'tch003'),
(150205, 'COR002'),
(150208, 'FIN002'),
(150208, 'MGT002'),
(150215, 'FIN002'),
(150215, 'tch001'),
(150216, 'tch003'),
(150232, 'tch001'),
(150232, 'FIN001'),
(150232, 'MGT004'),
(150233, 'COR002'),
(150233, 'FIN002'),
(150233, 'MGT007'),
(150265, 'tch001'),
(150265, 'tch015'),
(150275, 'tch014'),
(150276, 'tch002'),
(150276, 'COR002'),
(150282, 'tch005'),
(150283, 'tch002'),
(150288, 'COR002'),
(150288, 'tch003'),
(150295, 'COR002'),
(150318, 'tch003'),
(150342, 'COR001'),
(150345, 'tch005'),
(150345, 'MGT001'),
(150348, 'COR006'),
(150356, 'COR002'),
(150398, 'tch001'),
(150398, 'COR002'),
(150398, 'MGT004'),
(150422, 'COR002'),
(150422, 'MGT007'),
(150435, 'COR002'),
(150435, 'SAL004'),
(150445, 'tch003'),
(150488, 'tch005'),
(150488, 'tch012'),
(150513, 'COR002'),
(150518, 'tch015'),
(150525, 'tch018'),
(150555, 'tch001'),
(150565, 'COR006'),
(150566, 'tch002'),
(150608, 'tch003'),
(150645, 'MGT002'),
(150655, 'MGT002'),
(150695, 'COR002'),
(150695, 'tch005'),
(150695, 'SAL003'),
(150705, 'COR002'),
(150776, 'FIN001'),
(150826, 'tch019'),
(150866, 'FIN002'),
(150866, 'MGT004'),
(150916, 'COR002'),
(150935, 'COR002'),
(150935, 'tch019'),
(150938, 'tch002'),
(150968, 'COR002'),
(150968, 'COR001'),
(150976, 'COR002'),
(151008, 'FIN001'),
(151008, 'tch005'),
(151008, 'MGT007'),
(151055, 'MGT004'),
(151118, 'HRD001'),
(151146, 'COR002'),
(151288, 'COR002'),
(151408, 'SAL001'),
(160008, 'COR002'),
(160008, 'HRD001'),
(160065, 'MGT002'),
(160075, 'MGT001'),
(160076, 'COR002'),
(160118, 'SAL004'),
(160135, 'MGT004'),
(160142, 'COR002'),
(160142, 'SAL004'),
(160143, 'SAL003'),
(160146, 'MGT007'),
(160146, 'SAL004'),
(160146, 'tch019'),
(160155, 'tch014'),
(160188, 'HRD001'),
(160188, 'SAL003'),
(160188, 'COR001'),
(160212, 'COR002'),
(160225, 'COR002'),
(160258, 'SAL003'),
(160282, 'tch002');
COMMIT;

--
-- Table structure for table `staff_skill` (Take note this is a db.Model, unlike other db.Tables)
--
DROP TABLE IF EXISTS `staff_skill`;
CREATE TABLE IF NOT EXISTS `staff_skill` (
  `staff_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `staff_skill`
  ADD CONSTRAINT `staff_skill_fk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `staff_skill_fk_2` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`);

INSERT INTO `staff_skill` (`staff_id`, `skill_id`) VALUES
(150232, 1),
(150776, 1),
(151008, 1),
(151118, 2),
(160008, 2),
(160188, 2),
(150232, 2),
(150398, 2),
(150866, 2),
(151055, 2),
(160135, 2),
(150275, 3),
(160155, 3),
(150265, 3),
(150518, 3),
(130001, 4),
(130002, 4),
(140001, 4),
(140002, 4),
(140004, 4),
(140115, 4),
(140878, 4),
(150008, 4),
(150075, 4),
(150118, 4),
(150138, 4),
(150162, 4),
(150163, 4),
(150166, 4),
(150168, 4),
(150205, 4),
(150233, 4),
(150276, 4),
(150288, 4),
(150295, 4),
(150356, 4),
(150398, 4),
(150422, 4),
(150435, 4),
(150513, 4),
(150695, 4),
(150705, 4),
(150916, 4),
(150935, 4),
(150968, 4),
(150976, 4),
(151146, 4),
(151288, 4),
(160008, 4),
(160076, 4),
(160142, 4),
(160212, 4),
(160225, 4),
(150232, 4),
(150776, 4),
(151008, 4),
(150348, 5),
(150565, 5),
(140001, 5),
(150008, 5),
(150166, 5),
(150345, 5),
(160075, 5),
(150208, 5),
(150645, 5),
(150655, 5),
(160065, 5),
(140078, 5),
(150233, 5),
(150422, 5),
(151008, 5),
(160146, 5),
(151408, 5),
(140002, 5),
(140108, 5),
(140115, 5),
(140525, 5),
(150435, 5),
(160118, 5),
(160142, 5),
(150525, 5),
(150143, 5),
(150826, 5),
(150935, 5);
COMMIT;
