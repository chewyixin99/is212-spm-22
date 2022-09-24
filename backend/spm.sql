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

-- INSERT INTO `role` () VALUES
-- ()
-- ()
-- ();
-- COMMIT;


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

-- INSERT INTO `staff` () VALUES
-- ()
-- ()
-- ();
-- COMMIT;


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

-- INSERT INTO `course` () VALUES
-- ()
-- ()
-- ();
-- COMMIT;


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

-- INSERT INTO `registration` () VALUES
-- ()
-- ()
-- ();
-- COMMIT;