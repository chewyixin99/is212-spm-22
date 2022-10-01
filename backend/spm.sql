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
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `role`
--
DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `learning_journey`
--
DROP TABLE IF EXISTS `learning_journey`;
CREATE TABLE IF NOT EXISTS `learning_journey` (
  `learning_journey_id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `learning_journey_name` varchar(50) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `learning_journey`
  ADD CONSTRAINT `learning_journey_fk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);

--
-- Table structure for table `skill`
--
DROP TABLE IF EXISTS `skill`;
CREATE TABLE IF NOT EXISTS `skill` (
  `skill_id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(50) NOT NULL,
  `skill_desc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

--
-- Table structure for table `staff_learning_journey`
--
DROP TABLE IF EXISTS `staff_learning_journey`;
CREATE TABLE IF NOT EXISTS `staff_learning_journey` (
  `staff_id` int(11) NOT NULL,
  `learning_journey_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `staff_learning_journey`
  ADD CONSTRAINT `staff_learning_journey_fk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `staff_learning_journey_fk_2` FOREIGN KEY (`learning_journey_id`) REFERENCES `learning_journey` (`learning_journey_id`);

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