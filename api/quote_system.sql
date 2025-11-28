-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 28, 2025 at 06:10 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quote_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'admin', '$2y$10$gnygeNwU.o1DxiSBSvGPSukCgxhzKkbWh/l/5pF.6cVUdWxJZMIDC', '2025-10-10 04:52:12'),
(2, 'test', 'etcnjl8juSU1E', '2025-10-12 07:56:26');

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `excerpt` varchar(500) DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `featured_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `slug`, `content`, `excerpt`, `status`, `created_at`, `updated_at`, `featured_image`) VALUES
(2, 'Test', 'test', '<p>test</p>', 'test...', 'published', '2025-11-02 06:45:48', '2025-11-02 06:45:48', 'http://localhost/api/uploads/6906fe17bdba5.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `logo_url` varchar(500) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `logo_url`, `status`, `created_at`) VALUES
(1, 'ThinkAside', 'http://localhost/api/uploads/6922b1f4035d8.jpg', 'active', '2025-11-23 07:04:21'),
(2, 'Prabanjam', 'http://localhost/api/uploads/6922b259c6553.png', 'active', '2025-11-23 07:06:03'),
(3, 'Nisanth', 'http://localhost/api/uploads/6922b2695e758.png', 'active', '2025-11-23 07:06:18');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `phone`, `subject`, `message`, `created_at`) VALUES
(1, 'Madhan', 'madhan@thinkaside.com', '9659450818', 'Test', 'test', '2025-10-10 15:11:12'),
(2, 'test', 'test@email.com', '4567897656', 'gg', 'hgsdfsgh', '2025-10-22 13:10:20'),
(3, 'Madhan', 'madhan@thinkaside.com', '9659450818', 'test subject', 'test', '2025-11-02 06:48:10');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `category` varchar(50) DEFAULT 'general',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `title`, `image_url`, `category`, `status`, `created_at`) VALUES
(2, 'Logo', 'http://localhost/api/uploads/691d66500aa4d.png', 'test', 'active', '2025-11-19 06:22:16');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_filters`
--

CREATE TABLE `gallery_filters` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gallery_filters`
--

INSERT INTO `gallery_filters` (`id`, `name`, `status`, `created_at`) VALUES
(1, 'test', 'active', '2025-11-23 05:42:00');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image_url`, `status`, `created_at`) VALUES
(1, 'Custom T Shirts', 'We are best in manufacturing Custom T shirts', 'http://localhost/api/uploads/6922a140dfbc7.png', 'active', '2025-11-23 05:53:15'),
(2, 'Hoddies', 'Hoddies', 'http://localhost/api/uploads/6922a4ac72441.jpg', 'active', '2025-11-23 06:07:43');

-- --------------------------------------------------------

--
-- Table structure for table `product_filters`
--

CREATE TABLE `product_filters` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` enum('category','size','color','material') NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_gallery`
--

CREATE TABLE `product_gallery` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_gallery`
--

INSERT INTO `product_gallery` (`id`, `product_id`, `image_url`, `title`, `created_at`) VALUES
(3, 1, 'http://localhost/api/uploads/6922a45f4f707.png', '', '2025-11-23 06:06:25'),
(4, 1, 'http://localhost/api/uploads/6922a45f4f1dc.jpg', '', '2025-11-23 06:06:25'),
(5, 1, 'http://localhost/api/uploads/6922a45f4f962.png', '', '2025-11-23 06:06:25'),
(6, 2, 'http://localhost/api/uploads/6922a4c872d0f.jpg', '', '2025-11-23 06:08:09'),
(7, 2, 'http://localhost/api/uploads/6922a4c873288.JPG', '', '2025-11-23 06:08:09');

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `company` varchar(100) DEFAULT NULL,
  `product_type` varchar(50) NOT NULL,
  `quantity` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`id`, `name`, `email`, `phone`, `company`, `product_type`, `quantity`, `message`, `created_at`) VALUES
(1, 'Madhan', 'madhan@thinkaside.com', '9659450818', 'ThinkAside Technologies', 'tracksuits', '100', 'test', '2025-10-10 04:46:57'),
(2, 'Madhan', 'madhan@thinkaside.com', '9659450818', 'ThinkAside Technologies', 'tracksuits', '1000', 'dsds', '2025-10-10 15:09:09'),
(3, 'madhan', 'madhan@thinkaside.com', '9659450818', 'ThinkAside Technologies', 'tracksuits', '200', 'jhdfsghjsd', '2025-10-22 13:10:50'),
(4, 'mad', 'madhan@thinkaside.com', '97911 37538', 'ThinkAside Technologies', 'tracksuits', '100', 'test', '2025-11-02 06:49:01');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `company` varchar(100) DEFAULT NULL,
  `message` text NOT NULL,
  `rating` int(11) DEFAULT 5,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `company`, `message`, `rating`, `status`, `created_at`) VALUES
(2, 'Madhan', 'ThinkAside Technologies', '<p>Test content</p>', 3, 'active', '2025-10-12 07:39:52'),
(3, 'Prabhu', 'company', '<p>very good response and good quaity</p>', 4, 'active', '2025-10-12 07:44:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery_filters`
--
ALTER TABLE `gallery_filters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_filters`
--
ALTER TABLE `product_filters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_gallery`
--
ALTER TABLE `product_gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `gallery_filters`
--
ALTER TABLE `gallery_filters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_filters`
--
ALTER TABLE `product_filters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_gallery`
--
ALTER TABLE `product_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_gallery`
--
ALTER TABLE `product_gallery`
  ADD CONSTRAINT `product_gallery_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
