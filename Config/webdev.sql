/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50730
 Source Host           : localhost:8889
 Source Schema         : webdev

 Target Server Type    : MySQL
 Target Server Version : 50730
 File Encoding         : 65001

 Date: 31/01/2021 20:17:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `content` text,
  `videos` varchar(2048) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_articles_deleted_at` (`deleted_at`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `tag_name` varchar(255) DEFAULT NULL,
  `article_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_tags_deleted_at` (`deleted_at`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
