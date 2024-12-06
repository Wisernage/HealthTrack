-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 22, 2022 at 01:50 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hy359`
--

-- --------------------------------------------------------

--
-- Table structure for table `bloodtest`
--

CREATE TABLE `bloodtest` (
  `bloodtest_id` int(11) NOT NULL,
  `amka` varchar(11) NOT NULL,
  `test_date` date NOT NULL,
  `medical_center` varchar(100) NOT NULL,
  `blood_sugar` double DEFAULT NULL,
  `blood_sugar_level` varchar(10) DEFAULT NULL,
  `cholesterol` double DEFAULT NULL,
  `cholesterol_level` varchar(10) DEFAULT NULL,
  `iron` double DEFAULT NULL,
  `iron_level` varchar(10) DEFAULT NULL,
  `vitamin_d3` double DEFAULT NULL,
  `vitamin_d3_level` varchar(10) DEFAULT NULL,
  `vitamin_b12` double DEFAULT NULL,
  `vitamin_b12_level` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bloodtest`
--

INSERT INTO `bloodtest` (`bloodtest_id`, `amka`, `test_date`, `medical_center`, `blood_sugar`, `blood_sugar_level`, `cholesterol`, `cholesterol_level`, `iron`, `iron_level`, `vitamin_d3`, `vitamin_d3_level`, `vitamin_b12`, `vitamin_b12_level`) VALUES
(1, '03069200000', '2021-10-11', 'pagni', 100, 'Normal', 210, 'High', 5, 'Low', 30, 'Normal', 50, 'Low'),
(10, '03069200000', '2021-10-11', 'pagni', 100, 'Normal', NULL, NULL, NULL, NULL, NULL, NULL, 50, 'Low'),
(11, '03069200000', '2021-10-11', 'pagni', 100, 'Normal', NULL, NULL, NULL, NULL, NULL, NULL, 50, 'Low'),
(12, '03069200000', '2021-10-11', 'pagni', 100, 'Normal', NULL, NULL, NULL, NULL, NULL, NULL, 50, 'Low'),
(13, '03069200000', '2021-10-11', 'pagni', 100, 'Normal', NULL, NULL, NULL, NULL, NULL, NULL, 50, 'Low'),
(14, '03069200000', '2021-10-11', 'pagni', 100, 'Normal', NULL, NULL, NULL, NULL, NULL, NULL, 50, 'Low'),
(21, '03069200000', '2021-10-11', 'pagni', 100, 'Normal', NULL, NULL, NULL, NULL, NULL, NULL, 50, 'Low'),
(22, '03069200000', '2021-10-11', 'pagni', 100, 'Normal', NULL, NULL, NULL, NULL, NULL, NULL, 50, 'Low'),
(23, '03069200000', '2021-10-11', 'pagni', 100, 'Normal', NULL, NULL, NULL, NULL, NULL, NULL, 50, 'Low'),
(24, '03069200000', '2021-10-11', 'pagni', 100, 'Normal', NULL, NULL, NULL, NULL, NULL, NULL, 50, 'Low'),
(28, '03069200000', '2021-10-11', 'pagni', 100, 'Normal', NULL, NULL, NULL, NULL, NULL, NULL, 50, 'Low'),
(29, '03069200000', '2021-10-11', 'pagni', 200, 'High', 80, 'Normal', NULL, NULL, NULL, NULL, 100, 'Low'),
(30, '69696969696', '2021-09-11', 'csd', 80, 'Normal', 60, 'Normal', 50, 'Low', NULL, NULL, 512, 'Normal'),
(31, '69696969696', '2021-09-11', 'csd', 80, 'Normal', 60, 'Normal', 50, 'Low', 15, 'Low', 512, 'Normal'),
(32, '03069200000', '2021-10-11', 'pagni', 100, 'Normal', NULL, NULL, NULL, NULL, NULL, NULL, 50, 'Low');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctor_id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(32) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `birthdate` date NOT NULL,
  `gender` varchar(7) NOT NULL,
  `amka` varchar(11) NOT NULL,
  `country` varchar(30) NOT NULL,
  `city` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `telephone` varchar(14) NOT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `blooddonor` tinyint(1) DEFAULT NULL,
  `bloodtype` varchar(7) NOT NULL,
  `specialty` varchar(30) NOT NULL,
  `doctor_info` varchar(500) NOT NULL,
  `certified` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctor_id`, `username`, `email`, `password`, `firstname`, `lastname`, `birthdate`, `gender`, `amka`, `country`, `city`, `address`, `lat`, `lon`, `telephone`, `height`, `weight`, `blooddonor`, `bloodtype`, `specialty`, `doctor_info`, `certified`) VALUES
(1, 'papadakis', 'papadakis@doctor.gr', 'doctor12*', 'Nikos', 'Papadakis', '1982-10-03', 'Male', '03108200123', 'Greece', 'Heraklion', 'Evans 83', 35.3361866, 25.1342504, '2810123456', 182, 80, 1, 'A+', 'GeneralDoctor', 'Exei megali empiria se axiologisi emvoliwn.', 1),
(2, 'stefanos', 'stefanos@doctor.gr', 'abcd12$3', 'Stefanos', 'Kapelakis', '1958-01-10', 'Male', '10015800234', 'Greece', 'Heraklion', 'Kalokairinou 50', 35.3376963, 25.1276121, '2810654321', 170, 68, 0, 'B+', 'Pathologist', 'O kaluteros giatros gia ti gripi.', 1),
(3, 'papadopoulou', 'papadopoulou@doctor.gr', 'doct12##', 'Eleni', 'Papopoulou', '1980-05-05', 'Female', '05058000123', 'Greece', 'Heraklion', 'Machis Kritis 10', 35.3375925, 25.1219286, '2810281028', 170, 60, 1, 'AB+', 'GeneralDoctor', 'Exei kanei metaptyxiakes spoudes stin ameriki.', 1),
(4, 'aggelopoulos', 'aggelopoulos@doctor.gr', 'agge58$1', 'Giorgos', 'Aggelopoulos', '1978-01-12', 'Male', '01127800111', 'Greece', 'Heraklion', 'Leoforos Knossou 200', 35.3152534, 25.1474208, '2811111111', 175, 60, 1, 'A-', 'Pathologist', 'Kathigitis iatrikis sto panepistimio.', 1),
(5, 'papatheodorou', 'papatheodorou@doctor.gr', 'papap$75', 'Konstantina', 'Papatheodorou', '1968-01-03', 'Female', '03016800111', 'Greece', 'Heraklion', 'Leoforos 62 Martyron 100', 35.3361846, 35.3361846, '2811121111', 160, 65, 1, 'A-', 'Pathologist', 'Exei empiria se zaxaro kai xolisterini.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `message_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `message` varchar(1000) NOT NULL,
  `sender` varchar(15) DEFAULT NULL,
  `blood_donation` tinyint(1) DEFAULT NULL,
  `bloodtype` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`message_id`, `doctor_id`, `user_id`, `date_time`, `message`, `sender`, `blood_donation`, `bloodtype`) VALUES
(1, 1, 1, '2021-10-11 12:11:00', 'Den eimai kala', 'user', 0, 'null');

-- --------------------------------------------------------

--
-- Table structure for table `randevouz`
--

CREATE TABLE `randevouz` (
  `randevouz_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `price` int(11) NOT NULL,
  `doctor_info` varchar(500) DEFAULT NULL,
  `user_info` varchar(500) DEFAULT NULL,
  `status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `randevouz`
--

INSERT INTO `randevouz` (`randevouz_id`, `doctor_id`, `user_id`, `date_time`, `price`, `doctor_info`, `user_info`, `status`) VALUES
(1, 1, 0, '2021-10-29 12:00:00', 50, 'Krata covid pass', 'null', 'free');

-- --------------------------------------------------------

--
-- Table structure for table `treatment`
--

CREATE TABLE `treatment` (
  `treatment_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `treatment_text` varchar(1000) DEFAULT NULL,
  `bloodtest_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `treatment`
--

INSERT INTO `treatment` (`treatment_id`, `doctor_id`, `user_id`, `start_date`, `end_date`, `treatment_text`, `bloodtest_id`) VALUES
(1, 1, 1, '2021-10-26', '2021-11-09', 'Xapia gia xolisterini 3 fores ti mera', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(32) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `birthdate` date NOT NULL,
  `gender` varchar(7) NOT NULL,
  `amka` varchar(11) NOT NULL,
  `country` varchar(30) NOT NULL,
  `city` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `telephone` varchar(14) NOT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `blooddonor` tinyint(1) DEFAULT NULL,
  `bloodtype` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `firstname`, `lastname`, `birthdate`, `gender`, `amka`, `country`, `city`, `address`, `lat`, `lon`, `telephone`, `height`, `weight`, `blooddonor`, `bloodtype`) VALUES
(1, 'mountanton', 'mike@mike.com', '123456', 'Michalis', 'Mountanton', '1992-06-03', 'Male', '03069200000', 'Greece', 'Heraklion', 'CSD Voutes', 35.3053121, 25.0722869, '1234567890', 173, 82, 1, 'A+'),
(2, 'admin', 'admin@admin.gr', 'admin12*', 'Admin', 'Admin', '1970-01-01', 'Male', '01234567890', 'Greece', 'Heraklion', 'Liontaria', 0.5, 0.1, '281000000', 200, 100, 0, 'A+'),
(38, 'ggeogigachad', 'ggeo@csd.uoc.gr', 'datastruct21!', 'Mpampis', 'Georgakopoulos', '1980-01-01', 'Male', '01018000000', 'Greece', 'Heraklion Municipal Unit', 'Ierolochiton 76 Daskalaki', 35.3233797, 25.1292375, '6943212375', 180, 83, 1, 'B-'),
(39, 'ggeogigachadb', 'mikeaaa@mike.com', 'datastruct21!', 'Dimitris', 'Grammenidis', '1992-06-03', 'Male', '03069200300', 'Greece', 'Heraklion Municipal Unit', 'Ierolochiton 76 Daskalaki', 35.3233797, 25.1292375, '6943212375', 172, 73, 1, 'B+'),
(40, 'ggeogigachadc', 'mikeaab@mike.com', 'datastruct21!', 'Dimitris', 'Grammenidis', '1992-06-03', 'Male', '03069200400', 'Greece', 'Heraklion Municipal Unit', 'Ierolochiton 76 Daskalaki', 35.3233797, 25.1292375, '6943212375', 172, 73, 1, 'B+');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bloodtest`
--
ALTER TABLE `bloodtest`
  ADD PRIMARY KEY (`bloodtest_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctor_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `randevouz`
--
ALTER TABLE `randevouz`
  ADD PRIMARY KEY (`randevouz_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `treatment`
--
ALTER TABLE `treatment`
  ADD PRIMARY KEY (`treatment_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `bloodtest_id` (`bloodtest_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bloodtest`
--
ALTER TABLE `bloodtest`
  MODIFY `bloodtest_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `randevouz`
--
ALTER TABLE `randevouz`
  MODIFY `randevouz_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `treatment`
--
ALTER TABLE `treatment`
  MODIFY `treatment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `randevouz`
--
ALTER TABLE `randevouz`
  ADD CONSTRAINT `randevouz_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`);

--
-- Constraints for table `treatment`
--
ALTER TABLE `treatment`
  ADD CONSTRAINT `treatment_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`),
  ADD CONSTRAINT `treatment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `treatment_ibfk_3` FOREIGN KEY (`bloodtest_id`) REFERENCES `bloodtest` (`bloodtest_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;