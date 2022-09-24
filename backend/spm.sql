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
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) PRIMARY KEY NOT NULL,
  `role_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'manager'),
(2, 'administrator'),
(3, 'employee');
COMMIT;


--
-- Table structure for table `staff`
--
DROP TABLE IF EXISTS `staff`;
CREATE TABLE IF NOT EXISTS `staff` (
  `staff_id` int(11) PRIMARY KEY NOT NULL,
  `staff_fname` varchar(50) NOT NULL,
  `staff_lname` varchar(50) NOT NULL,
  `dept` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `staff`
  ADD CONSTRAINT `staff_fk_1` FOREIGN KEY (`role`) REFERENCES `role` (`role_id`);

INSERT INTO `staff` (`staff_id`, `staff_fname`, `staff_lname`, `dept`, `email`, `role`) VALUES
(1, 'loh', 'kokwee', 'dept a', 'lohkokwee@mail.com', 1),
(2, 'gan', 'jianlin', 'dept b', 'ganjianlin@mail.com', 2),
(3, 'lim', 'joel', 'dept c', 'joellim@mail.com', 3);
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
('IS212', 'Software Project Management', 'spm desc', 'available', 'type 1', 'category 1'),
('CS420', 'Foundations of Cybersecurity', 'foc desc', 'available', 'type 2', 'category 2'),
('IS442', 'Object Oriented Programming', 'oop desc', 'unavailable', 'type 3', 'category 3');
COMMIT;


--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
CREATE TABLE IF NOT EXISTS `registration` (
  `reg_id` int(11) PRIMARY KEY NOT NULL,
  `staff_id` int(11) NOT NULL,
  `course_id` varchar(20) NOT NULL,
  `reg_status` varchar(20) NOT NULL,
  `completion_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `registration`
  ADD CONSTRAINT `registration_fk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `registration_fk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

INSERT INTO `registration` (`reg_id`, `staff_id`, `course_id`, `reg_status`, `completion_status`) VALUES
(1, 1, 'IS212', 'status 1', 'complete'),
(2, 2, 'IS442', 'status 2', 'complete'),
(3, 3, 'CS420', 'status 3', 'incomplete');
COMMIT;

-- ######################### NON GIVEN SCHEMA #########################

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
CREATE TABLE IF NOT EXISTS `skill` (
  `skill_id` int(11) PRIMARY KEY NOT NULL,
  `skill_name` varchar(50) NOT NULL,
  `skill_desc` varchar(255) NOT NULL,
  `skill_category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `skill` (`skill_id`, `skill_name`, `skill_desc`, `skill_category`) VALUES
(1, 'python', 'programming language', 'programming'),
(2, 'leadership', 'leadership skill', 'leadership'),
(3, 'aws', 'cloud solutioning', 'cloud architecture');
COMMIT;


--
-- Table structure for table `course_skills`
--

DROP TABLE IF EXISTS `course_skills`;
CREATE TABLE IF NOT EXISTS `course_skills` (
  `course_skills_id` int(11) PRIMARY KEY NOT NULL,
  `skill_id` int(11) NOT NULL,
  `course_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `course_skills`
  ADD CONSTRAINT `course_skills_fk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `course_skills_fk_2` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`);

INSERT INTO `course_skills` (`course_skills_id`, `skill_id`, `course_id`) VALUES
(1, 1, 'CS420'),
(2, 2, 'IS442'),
(3, 3, 'IS212');
COMMIT;

--
-- Table structure for table `learning_journey`
--

DROP TABLE IF EXISTS `learning_journey`;
CREATE TABLE IF NOT EXISTS `learning_journey` (
  `learning_journey_id` int(11) PRIMARY KEY NOT NULL,
  `role_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `learning_journey`
  ADD CONSTRAINT `learning_journey_fk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  ADD CONSTRAINT `learning_journey_fk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

INSERT INTO `learning_journey` (`learning_journey_id`, `role_id`, `staff_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);
COMMIT;

--
-- Table structure for table `learning_journey_skills`
--

DROP TABLE IF EXISTS `learning_journey_skills`;
CREATE TABLE IF NOT EXISTS `learning_journey_skills` (
  `learning_journey_skills_id` int(11) PRIMARY KEY NOT NULL,
  `learning_journey_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `learning_journey_skills`
  ADD CONSTRAINT `learning_journey_skills_fk_1` FOREIGN KEY (`learning_journey_id`) REFERENCES `learning_journey` (`learning_journey_id`),
  ADD CONSTRAINT `learning_journey_skills_fk_2` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`);

INSERT INTO `learning_journey_skills` (`learning_journey_skills_id`, `learning_journey_id`, `skill_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);
COMMIT;