-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.6.35-log - MySQL Community Server (GPL)
-- Операционная система:         Win64
-- HeidiSQL Версия:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных bpm-repo
DROP DATABASE IF EXISTS `bpm-repo`;
CREATE DATABASE IF NOT EXISTS `bpm-repo` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bpm-repo`;

-- Дамп структуры для таблица bpm-repo.activity
DROP TABLE IF EXISTS `activity`;
CREATE TABLE IF NOT EXISTS `activity` (
  `Activity_ID` int(11) NOT NULL,
  `Activity_Name` text,
  PRIMARY KEY (`Activity_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы bpm-repo.activity: ~1 rows (приблизительно)
DELETE FROM `activity`;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` (`Activity_ID`, `Activity_Name`) VALUES
	(1, 'Store'),
	(2, 'Update');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;

-- Дамп структуры для таблица bpm-repo.event
DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `Event_ID` varchar(13) NOT NULL,
  `Process_Model_ID` varchar(13) NOT NULL,
  `Activity_ID` int(11) NOT NULL,
  `Event_Timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Event_ID`),
  KEY `R_9` (`Process_Model_ID`),
  KEY `R_10` (`Activity_ID`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`Process_Model_ID`) REFERENCES `process_model` (`Process_Model_ID`),
  CONSTRAINT `event_ibfk_2` FOREIGN KEY (`Activity_ID`) REFERENCES `activity` (`Activity_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп структуры для таблица bpm-repo.model_metric
DROP TABLE IF EXISTS `model_metric`;
CREATE TABLE IF NOT EXISTS `model_metric` (
  `Model_Metric_ID` int(11) NOT NULL,
  `Model_Type_ID` int(11) NOT NULL,
  `Model_Metric_Name` text,
  PRIMARY KEY (`Model_Metric_ID`),
  KEY `R_6` (`Model_Type_ID`),
  CONSTRAINT `model_metric_ibfk_1` FOREIGN KEY (`Model_Type_ID`) REFERENCES `model_type` (`Model_Type_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы bpm-repo.model_metric: ~7 rows (приблизительно)
DELETE FROM `model_metric`;
/*!40000 ALTER TABLE `model_metric` DISABLE KEYS */;
INSERT INTO `model_metric` (`Model_Metric_ID`, `Model_Type_ID`, `Model_Metric_Name`) VALUES
	(1, 1, 'Tasks / Subprocesses'),
	(2, 1, 'Gateways'),
	(3, 1, 'Start events'),
	(4, 1, 'Intermediate events'),
	(5, 1, 'End events'),
	(6, 1, 'Design shortcomings'),
	(7, 1, 'Coefficient of structure conformity');
/*!40000 ALTER TABLE `model_metric` ENABLE KEYS */;

-- Дамп структуры для таблица bpm-repo.model_type
DROP TABLE IF EXISTS `model_type`;
CREATE TABLE IF NOT EXISTS `model_type` (
  `Model_Type_ID` int(11) NOT NULL,
  `Model_Type_Name` text,
  PRIMARY KEY (`Model_Type_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы bpm-repo.model_type: ~0 rows (приблизительно)
DELETE FROM `model_type`;
/*!40000 ALTER TABLE `model_type` DISABLE KEYS */;
INSERT INTO `model_type` (`Model_Type_ID`, `Model_Type_Name`) VALUES
	(1, 'BPMN');
/*!40000 ALTER TABLE `model_type` ENABLE KEYS */;

-- Дамп структуры для таблица bpm-repo.process
DROP TABLE IF EXISTS `process`;
CREATE TABLE IF NOT EXISTS `process` (
  `Process_ID` varchar(13) NOT NULL,
  `Process_Name` text,
  `Process_Industry_ID` int(11) NOT NULL,
  `Process_Source` text,
  `Process_Description` text,
  PRIMARY KEY (`Process_ID`),
  KEY `R_13` (`Process_Industry_ID`),
  CONSTRAINT `process_ibfk_1` FOREIGN KEY (`Process_Industry_ID`) REFERENCES `process_industry` (`Process_Industry_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп структуры для таблица bpm-repo.process_hierarchy
DROP TABLE IF EXISTS `process_hierarchy`;
CREATE TABLE IF NOT EXISTS `process_hierarchy` (
  `Process_ID` varchar(13) NOT NULL,
  `Parent_Process_ID` varchar(13) NOT NULL,
  PRIMARY KEY (`Process_ID`),
  KEY `R_28` (`Parent_Process_ID`),
  CONSTRAINT `process_hierarchy_ibfk_1` FOREIGN KEY (`Process_ID`) REFERENCES `process` (`Process_ID`),
  CONSTRAINT `process_hierarchy_ibfk_2` FOREIGN KEY (`Parent_Process_ID`) REFERENCES `process` (`Process_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы bpm-repo.process_hierarchy: ~1 rows (приблизительно)
DELETE FROM `process_hierarchy`;
/*!40000 ALTER TABLE `process_hierarchy` DISABLE KEYS */;
/*!40000 ALTER TABLE `process_hierarchy` ENABLE KEYS */;

-- Дамп структуры для таблица bpm-repo.process_industry
DROP TABLE IF EXISTS `process_industry`;
CREATE TABLE IF NOT EXISTS `process_industry` (
  `Process_Industry_ID` int(11) NOT NULL,
  `Process_Industry_Name` text,
  PRIMARY KEY (`Process_Industry_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы bpm-repo.process_industry: ~6 rows (приблизительно)
DELETE FROM `process_industry`;
/*!40000 ALTER TABLE `process_industry` DISABLE KEYS */;
INSERT INTO `process_industry` (`Process_Industry_ID`, `Process_Industry_Name`) VALUES
	(0, 'Generic'),
	(1, 'Information Technology'),
	(2, 'Software & Services'),
	(3, 'Technology Hardware & Equipment'),
	(4, 'Semiconductors & Semiconductor Equipment'),
	(5, 'Internet Software & Services'),
	(6, 'IT Services'),
	(7, 'Software'),
	(8, 'IT Consulting & Other Services'),
	(9, 'Data Processing & Outsourced Services'),
	(10, 'Application Software'),
	(11, 'Systems Software'),
	(12, 'Home Entertainment Software');
/*!40000 ALTER TABLE `process_industry` ENABLE KEYS */;

-- Дамп структуры для таблица bpm-repo.process_industry_hierarchy
DROP TABLE IF EXISTS `process_industry_hierarchy`;
CREATE TABLE IF NOT EXISTS `process_industry_hierarchy` (
  `Process_Industry_ID` int(11) NOT NULL,
  `Parent_Category_ID` int(11) NOT NULL,
  PRIMARY KEY (`Process_Industry_ID`),
  KEY `R_26` (`Parent_Category_ID`),
  CONSTRAINT `process_industry_hierarchy_ibfk_1` FOREIGN KEY (`Process_Industry_ID`) REFERENCES `process_industry` (`Process_Industry_ID`),
  CONSTRAINT `process_industry_hierarchy_ibfk_2` FOREIGN KEY (`Parent_Category_ID`) REFERENCES `process_industry` (`Process_Industry_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы bpm-repo.process_industry_hierarchy: ~3 rows (приблизительно)
DELETE FROM `process_industry_hierarchy`;
/*!40000 ALTER TABLE `process_industry_hierarchy` DISABLE KEYS */;
INSERT INTO `process_industry_hierarchy` (`Process_Industry_ID`, `Parent_Category_ID`) VALUES
	(1, 0),
	(2, 1),
	(3, 1),
	(4, 1),
	(5, 2),
	(6, 2),
	(7, 2),
	(8, 6),
	(9, 6),
	(10, 7),
	(11, 7),
	(12, 7);
/*!40000 ALTER TABLE `process_industry_hierarchy` ENABLE KEYS */;

-- Дамп структуры для таблица bpm-repo.process_model
DROP TABLE IF EXISTS `process_model`;
CREATE TABLE IF NOT EXISTS `process_model` (
  `Process_Model_ID` varchar(13) NOT NULL,
  `Process_ID` varchar(13) NOT NULL,
  `Model_Type_ID` int(11) NOT NULL,
  `Process_Model_File_URL` text,
  `Process_Model_Image_URL` text,
  `Process_Model_Report_URL` text,
  PRIMARY KEY (`Process_Model_ID`),
  KEY `R_1` (`Process_ID`),
  KEY `R_4` (`Model_Type_ID`),
  CONSTRAINT `process_model_ibfk_1` FOREIGN KEY (`Process_ID`) REFERENCES `process` (`Process_ID`),
  CONSTRAINT `process_model_ibfk_2` FOREIGN KEY (`Model_Type_ID`) REFERENCES `model_type` (`Model_Type_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп структуры для таблица bpm-repo.process_model_event_metric
DROP TABLE IF EXISTS `process_model_event_metric`;
CREATE TABLE IF NOT EXISTS `process_model_event_metric` (
  `Event_ID` varchar(13) NOT NULL,
  `Model_Metric_ID` int(11) NOT NULL,
  `Metric_Value` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`Event_ID`,`Model_Metric_ID`),
  KEY `R_12` (`Model_Metric_ID`),
  CONSTRAINT `process_model_event_metric_ibfk_1` FOREIGN KEY (`Event_ID`) REFERENCES `event` (`Event_ID`),
  CONSTRAINT `process_model_event_metric_ibfk_2` FOREIGN KEY (`Model_Metric_ID`) REFERENCES `model_metric` (`Model_Metric_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп структуры для таблица bpm-repo.process_model_similarity
DROP TABLE IF EXISTS `process_model_similarity`;
CREATE TABLE IF NOT EXISTS `process_model_similarity` (
  `Subject_Process_Model_ID` varchar(13) NOT NULL,
  `Object_Process_Model_ID` varchar(13) NOT NULL,
  `Process_Model_Similarity_Value` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`Subject_Process_Model_ID`,`Object_Process_Model_ID`),
  KEY `R_15` (`Object_Process_Model_ID`),
  CONSTRAINT `process_model_similarity_ibfk_1` FOREIGN KEY (`Subject_Process_Model_ID`) REFERENCES `process_model` (`Process_Model_ID`),
  CONSTRAINT `process_model_similarity_ibfk_2` FOREIGN KEY (`Object_Process_Model_ID`) REFERENCES `process_model` (`Process_Model_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
