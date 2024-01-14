-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2024 at 04:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatgpt`
--

-- --------------------------------------------------------

--
-- Table structure for table `adddevicedetails`
--

CREATE TABLE `adddevicedetails` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `namedevice` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `group` varchar(255) NOT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `adddevicedetails`
--

INSERT INTO `adddevicedetails` (`id`, `namedevice`, `amount`, `group`, `detail`, `created_at`, `updated_at`) VALUES
(1, 'ฟองน้ำ', 0, 'อุปกรณ์ล้างรถ', 'ฟองน้ำ', '2023-12-30 11:05:10', '2023-12-30 11:21:19'),
(2, 'น้ำยาล้างรถ', 57, 'อุปกรณ์ล้างรถ', 'น้ำยาล้างรถ', '2023-12-30 11:05:28', '2023-12-30 11:05:28'),
(3, 'น้ำยาขัดเงา', 32, 'อุปกรณ์ล้างรถ', 'น้ำยาขัดเงา', '2023-12-30 11:06:03', '2023-12-30 11:06:03');

-- --------------------------------------------------------

--
-- Table structure for table `add_cars`
--

CREATE TABLE `add_cars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `typecar` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `license_plate` varchar(255) NOT NULL,
  `in_mileage` int(11) NOT NULL,
  `oil` date DEFAULT NULL,
  `brake` date DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'false',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `add_cars`
--

INSERT INTO `add_cars` (`id`, `typecar`, `brand`, `license_plate`, `in_mileage`, `oil`, `brake`, `status`, `created_at`, `updated_at`) VALUES
(1, 'รถตู้', 'Honda', '9 กก 9999', 36651, '2023-12-31', '2023-12-31', 'Unreserve', '2023-12-30 10:57:26', '2023-12-30 11:17:58'),
(2, 'รถตู้', 'Honda', '8 สส 888', 36714, '2024-01-01', '2024-01-04', 'Unreserve', '2023-12-30 10:58:15', '2023-12-30 10:58:15'),
(3, 'รถพยาบาล', 'Isuzu', '1 กธ 2345', 37145, '2024-02-07', '2024-01-18', 'Unreserve', '2023-12-30 10:59:28', '2023-12-30 10:59:28'),
(4, 'รถพยาบาล', 'Isuzu', '4 กข 5422', 34876, '2023-12-31', '2023-12-31', 'Unreserve', '2023-12-30 11:00:15', '2023-12-30 11:00:15'),
(5, 'รถกระบะ', 'Nissan', '1 รย 1111', 46342, '2024-02-29', '2024-02-01', 'Reserve', '2023-12-30 11:02:25', '2023-12-30 11:19:44'),
(6, 'รถเอกซเรย์', 'Toyota', '3 มย 2421', 74624, '2023-12-31', '2023-12-31', 'Unreserve', '2023-12-30 11:02:53', '2023-12-30 11:18:53'),
(7, 'รถเอกซเรย์', 'Honda', '3 ดก 3564', 23134, '2024-02-14', '2024-03-12', 'Reserve', '2023-12-30 11:03:15', '2023-12-30 11:15:30'),
(8, 'รถเอกซเรย์', 'Suzuki', '3 อท 2313', 78634, '2024-03-13', '2024-03-13', 'Unreserve', '2023-12-30 11:03:50', '2023-12-30 11:03:50'),
(9, 'รถกอร์ฟ', 'Hyundai', '2 กห 4211', 214, '2023-12-31', '2023-12-31', 'Unreserve', '2023-12-30 11:04:24', '2023-12-30 11:04:24');

-- --------------------------------------------------------

--
-- Table structure for table `admin_details`
--

CREATE TABLE `admin_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_details`
--

INSERT INTO `admin_details` (`id`, `first_name`, `last_name`, `position`, `department`, `address`, `phone_number`, `email`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Sithhichai', 'Puckpoo', 'Admin', 'Administrator', '21-29 ถ.นาคราช แขวงคลองมหานาคเขตป้อมปราบ จ.กรุงเทพฯ 10100\r\n', '0991329375', 'Administrator@Administrator.com', 'Admin', 'asd0fa0sdf', '2023-12-30 17:45:57', '2023-12-30 17:45:57');

-- --------------------------------------------------------

--
-- Table structure for table `booking_cars`
--

CREATE TABLE `booking_cars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `booking_date` date NOT NULL,
  `namedriver` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `type_car` varchar(255) NOT NULL,
  `license_plate` varchar(255) NOT NULL,
  `mileage` int(11) DEFAULT NULL,
  `nameuser` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'false',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booking_cars`
--

INSERT INTO `booking_cars` (`id`, `booking_date`, `namedriver`, `location`, `type_car`, `license_plate`, `mileage`, `nameuser`, `time`, `status`, `created_at`, `updated_at`) VALUES
(1, '2024-01-05', 'Kanchana Lawan', 'กาชาด', 'รถตู้', '9 กก 9999', 36551, 'Sithhichai Puckpoo', '17:16', 'Unreserve', '2023-12-30 11:13:45', '2023-12-30 11:17:58'),
(2, '2024-01-06', 'Kanchana Lawan', 'บางนา', 'รถเอกซเรย์', '3 มย 2421', 74424, 'Sithhichai Puckpoo', '06:00', 'Unreserve', '2023-12-30 11:14:26', '2023-12-30 11:18:52'),
(3, '2024-01-06', 'Kanchana Lawan', 'บางประอิน', 'รถเอกซเรย์', '3 ดก 3564', 23134, 'Sithhichai Puckpoo', '06:15', 'Reserve', '2023-12-30 11:15:30', '2023-12-30 11:15:30'),
(4, '2024-01-06', 'Kanchana Lawan', 'บางประอิน', 'รถกระบะ', '1 รย 1111', 46342, 'Porntip Suchart', '07:19', 'Reserve', '2023-12-30 11:19:44', '2023-12-30 11:19:44');

-- --------------------------------------------------------

--
-- Table structure for table `booking_devices`
--

CREATE TABLE `booking_devices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `use_booking` varchar(255) NOT NULL,
  `type_device` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `car_usages`
--

CREATE TABLE `car_usages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `name_driver` varchar(255) NOT NULL,
  `license_plate` varchar(255) NOT NULL,
  `time_out` varchar(255) DEFAULT NULL,
  `time_in` varchar(255) DEFAULT NULL,
  `out_mileage` int(11) DEFAULT NULL,
  `in_mileage` int(11) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `car_usages`
--

INSERT INTO `car_usages` (`id`, `date`, `name_driver`, `license_plate`, `time_out`, `time_in`, `out_mileage`, `in_mileage`, `details`, `created_at`, `updated_at`) VALUES
(1, '2024-01-05', 'Kanchana Lawan', '9 กก 9999', '06:17', '19:17', 36551, 36651, 'บางนา', '2023-12-30 11:17:58', '2023-12-30 11:17:58'),
(2, '2024-01-06', 'Kanchana Lawan', '3 มย 2421', '06:18', '19:18', 74424, 74624, 'สภากาชาด', '2023-12-30 11:18:53', '2023-12-30 11:18:53');

-- --------------------------------------------------------

--
-- Table structure for table `driver_details`
--

CREATE TABLE `driver_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `driver_details`
--

INSERT INTO `driver_details` (`id`, `first_name`, `last_name`, `position`, `department`, `address`, `phone_number`, `email`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Kanchana', 'Lawan', 'พนักงานขับรถ', 'ขนส่ง', '316/9 ม.8 ถ.ประชาอุทิศราษฎร์บูรณะเขตราษฎร์บูรณะจ.กรุงเทพฯ 10140', '0922438590', 'Lkanchana', 'Driver', 'aas9d6f', '2023-12-30 11:09:41', '2023-12-30 11:09:41');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `namedevice` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `name`, `namedevice`, `amount`, `date`, `created_at`, `updated_at`) VALUES
(1, 'Kanchana Lawan', 'อุปกรณ์ล้างรถ', 30, '2023-12-30', '2023-12-30 11:12:55', '2023-12-30 11:12:55');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(2, '2023_12_19_065858_create_user_details_table', 1),
(3, '2023_12_19_080014_create_admin_details_table', 1),
(4, '2023_12_21_085438_create_driver_details_table', 1),
(5, '2023_12_22_033616_create_adddevicedetails_table', 1),
(6, '2023_12_22_115703_create_add_cars_table', 1),
(7, '2023_12_22_180021_create_booking_cars_table', 1),
(8, '2023_12_22_233602_create_booking_devices_table', 1),
(9, '2023_12_27_023843_create_testdetails_table', 1),
(10, '2023_12_27_040119_create_car_usages_table', 1),
(11, '2023_12_27_182119_create_equipment_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testdetails`
--

CREATE TABLE `testdetails` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `namedevice` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `first_name`, `last_name`, `position`, `department`, `address`, `phone_number`, `email`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Porntip', 'Suchart', 'พนักงานทั่วไป', 'ขนส่ง', '1379 ถ.จนั ทน์แขวงทุ่งวดัดอน เขตสาธรจ.กรุงเทพฯ 10120', '0947980941', 'Sporntip@mail.com', 'Employee', 'sa23ar4', '2023-12-30 11:08:17', '2023-12-30 11:08:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adddevicedetails`
--
ALTER TABLE `adddevicedetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `adddevicedetails_namedevice_unique` (`namedevice`);

--
-- Indexes for table `add_cars`
--
ALTER TABLE `add_cars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `add_cars_license_plate_unique` (`license_plate`);

--
-- Indexes for table `admin_details`
--
ALTER TABLE `admin_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_details_phone_number_unique` (`phone_number`);

--
-- Indexes for table `booking_cars`
--
ALTER TABLE `booking_cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_devices`
--
ALTER TABLE `booking_devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_usages`
--
ALTER TABLE `car_usages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_details`
--
ALTER TABLE `driver_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `driver_details_phone_number_unique` (`phone_number`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `testdetails`
--
ALTER TABLE `testdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_details_phone_number_unique` (`phone_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adddevicedetails`
--
ALTER TABLE `adddevicedetails`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `add_cars`
--
ALTER TABLE `add_cars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `admin_details`
--
ALTER TABLE `admin_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `booking_cars`
--
ALTER TABLE `booking_cars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `booking_devices`
--
ALTER TABLE `booking_devices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_usages`
--
ALTER TABLE `car_usages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `driver_details`
--
ALTER TABLE `driver_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `testdetails`
--
ALTER TABLE `testdetails`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
