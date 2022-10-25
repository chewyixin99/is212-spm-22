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
(1, 'kokwee', 'loh', 'dept a', 'lohkokwee@mail.com', 1, 'ACTIVE'),
(2, 'jianlin', 'gan', 'dept b', 'ganjianlin@mail.com', 2, 'ACTIVE'),
(3, 'joel', 'lim', 'dept c', 'joellim@mail.com', 3, 'RETIRED');
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
(3, 'Full-stack developer', 'just being a jianlin', 'Tech', 'ACTIVE');
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
  `learning_journey_id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `learning_journey_name` varchar(50) NOT NULL,
  `role_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `learning_journey`
  ADD CONSTRAINT `learning_journey_fk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  ADD CONSTRAINT `learning_journey_fk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

INSERT INTO `learning_journey` (`learning_journey_id`, `learning_journey_name`, `role_id`, `staff_id`) VALUES
(1, 'Product Manager 1', 1, 3),
(2, 'Product Manager 2', 1, 2),
(3, 'Full-stack developer 1', 3, 1);
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
(3, 'Vue', 'Front-end framework', 'ACTIVE');
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
('IS111', 'Intro to Programming', 'is111 desc', 'ACTIVE', 'Internal', 'Technical'),
('IS212', 'Software Project Management', 'spm desc', 'ACTIVE', 'Internal', 'Management'),
('IS216', 'Web App Development II', 'wad2 desc', 'RETIRED', 'Internal', 'Technical');
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
(2, 1),
(3, 1),
(3, 3);
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
(1, 'IS111'),
(1, 'IS212'),
(2, 'IS212'),
(3, 'IS216');
COMMIT;

--
-- Table structure for table `learning_journey_course`
--
DROP TABLE IF EXISTS `learning_journey_course`;
CREATE TABLE IF NOT EXISTS `learning_journey_course` (
  `learning_journey_id` int(11) NOT NULL,
  `course_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `learning_journey_course`
  ADD CONSTRAINT `learning_journey_course_fk_1` FOREIGN KEY (`learning_journey_id`) REFERENCES `learning_journey` (`learning_journey_id`),
    ADD CONSTRAINT `learning_journey_course_fk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`);

INSERT INTO `learning_journey_course` (`learning_journey_id`, `course_id`) VALUES
(1, 'IS212'),
(2, 'IS212'),
(3, 'IS216');
COMMIT;

--
-- Table structure for table `staff_course` (Take note this is a db.Model, unlike other db.Tables)
--
DROP TABLE IF EXISTS `staff_course`;
CREATE TABLE IF NOT EXISTS `staff_course` (
  `staff_id` int(11) NOT NULL,
  `course_id` varchar(20) NOT NULL,
  `completion_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `staff_course`
  ADD CONSTRAINT `staff_course_fk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `staff_course_fk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`);

-- to add dummy data (halp)
COMMIT;

--
-- Table structure for table `staff_skill` (Take note this is a db.Model, unlike other db.Tables)
--
DROP TABLE IF EXISTS `staff_skill`;
CREATE TABLE IF NOT EXISTS `staff_skill` (
  `staff_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `completion_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `staff_skill`
  ADD CONSTRAINT `staff_skill_fk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `staff_skill_fk_2` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`);

-- to add dummy data (halp)
COMMIT;
