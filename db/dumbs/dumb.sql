-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: farma
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `animal_tag` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `parent_tag` varchar(20) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `reg_date` date DEFAULT NULL,
  `animal_type` varchar(20) DEFAULT NULL,
  `farma_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal`
--

LOCK TABLES `animal` WRITE;
/*!40000 ALTER TABLE `animal` DISABLE KEYS */;
INSERT INTO `animal` (`id`, `created_date`, `animal_tag`, `parent_tag`, `gender`, `dob`, `reg_date`, `animal_type`, `farma_id`) VALUES (1,'2022-08-25 09:24:14','COW-0001',NULL,'Male','2019-03-09','2020-03-09','cow','b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),(8,'2022-08-25 14:30:01','RABBIT-0002',NULL,'Male','2014-03-09','2020-03-09','rabbit','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(9,'2022-08-25 14:30:01','SHEEP-0001',NULL,'Male','2013-03-09','2020-03-09','sheep','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(10,'2022-08-25 14:30:01','GOAT-0001',NULL,'Female','2012-03-09','2020-03-09','goat','b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),(11,'2022-08-25 14:30:01','COW-0003',NULL,'Male','2012-03-09','2020-03-09','cow','b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),(12,'2022-08-25 14:30:01','RABBIT-0001',NULL,'Female','2012-03-09','2020-03-09','rabbit','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(13,'2022-08-25 14:30:01','COW-0005',NULL,'Male','2014-03-09','2020-03-09','cow','b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),(14,'2022-08-25 14:30:01','SHEEP-0002',NULL,'Female','2019-03-09','2020-03-09','sheep','b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),(15,'2022-08-25 14:30:01','PIG-0001',NULL,'Female','2022-03-09','2020-03-09','pig','b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),(16,'2022-08-25 14:30:01','PIG-0002',NULL,'Female','2012-03-09','2020-03-09','pig','b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),(17,'2022-08-25 14:30:01','PIG-0001',NULL,'Female','2010-03-09','2020-03-09','pig','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(43,'2022-08-28 20:45:45','COW-00043',NULL,'Female','2021-02-09','2019-03-07','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(48,'2022-08-28 20:58:32','COW-0048',NULL,'Male','2012-01-30','2019-03-08','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(52,'2022-08-30 12:20:49','COW-00049',NULL,'Female','2022-08-11','2022-08-09','null','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(53,'2022-08-30 12:29:35','COW-00040',NULL,'Female','2022-07-02','2019-03-06','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(54,'2022-09-08 16:11:02','COW-00054',NULL,'Female','2020-02-05','2022-09-08','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(56,'2022-09-09 06:53:37','GOAT-00056',NULL,'Male','2022-09-07','2022-09-08','goat','570901e2-6efd-4fb2-b4af-1ccd4d364d3e'),(57,'2022-09-09 06:54:08','GOAT-00057',NULL,'Female','2022-08-04','2022-09-01','goat','570901e2-6efd-4fb2-b4af-1ccd4d364d3e'),(58,'2022-09-09 06:54:37','GOAT-00058',NULL,'Female','2021-04-07','2022-04-06','goat','570901e2-6efd-4fb2-b4af-1ccd4d364d3e'),(62,'2022-10-08 13:55:57','COW-00055',NULL,'Female','2022-10-04','2022-10-04','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(66,'2022-10-13 14:31:05','COW-00065',NULL,'Female','2022-10-12','2022-10-13','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(67,'2022-10-15 08:10:05','COW-00067',NULL,'Male','2022-10-13','2022-10-26','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(69,'2022-10-17 12:03:04','COW-00068',NULL,'Male','2022-10-22','2022-09-30','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(70,'2022-10-17 17:01:18','COW-00070',NULL,'Male','2022-10-14','2022-10-19','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(71,'2022-10-17 18:19:34','COW-00071',NULL,'Female','2022-10-01','2022-10-01','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(72,'2022-10-17 20:24:19','COW-00072',NULL,'Male','2022-10-13','2022-10-06','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(73,'2023-01-25 16:31:15','RABBIT-00013',NULL,'Male','2022-12-30','2022-12-30','rabbit','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(74,'2023-01-25 16:31:46','RABBIT-00074',NULL,'Male','2019-12-31','2023-01-26','rabbit','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(75,'2023-02-19 16:01:05','COW-00073',NULL,'Male','2023-02-17','2023-02-20','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9');
/*!40000 ALTER TABLE `animal` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`derek`@`localhost`*/ /*!50003 TRIGGER `animal_update` BEFORE UPDATE ON `animal` FOR EACH ROW BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.animal_tag, "'s data been updated by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`derek`@`localhost`*/ /*!50003 TRIGGER `before_animal_delete` BEFORE DELETE ON `animal` FOR EACH ROW BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), OLD.farma_id, CONCAT(OLD.animal_tag, " has been deleted by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = OLD.farma_id)));

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `animals_at_farm`
--

DROP TABLE IF EXISTS `animals_at_farm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_at_farm` (
  `id` int NOT NULL AUTO_INCREMENT,
  `list_of_animals` json DEFAULT NULL,
  `farma_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animals_at_farm`
--

LOCK TABLES `animals_at_farm` WRITE;
/*!40000 ALTER TABLE `animals_at_farm` DISABLE KEYS */;
INSERT INTO `animals_at_farm` (`id`, `list_of_animals`, `farma_id`) VALUES (30,'[{\"name\": \"cow\", \"image_url\": \"http://localhost:3000/images/C.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:3000/images/pig.webp\"}]','bcd6dc2d-ceae-429d-aac6-c71aa5e2cda5'),(39,'[{\"name\": \"goat\", \"image_url\": \"http://localhost:3000/images/goat.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:3000/images/sheep.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:3000/images/pig.webp\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:3000/images/bunny.jpg\"}, {\"name\": \"cow\", \"image_url\": \"http://localhost:3000/images/C.jpg\"}, {\"desc\": \"23\", \"name\": \"geese\", \"image_url\": \"http://localhost:3000/images/1660980548807.png\"}]','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(41,'[{\"name\": \"cow\", \"image_url\": \"http://localhost:3000/images/C.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:3000/images/sheep.jpg\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:3000/images/bunny.jpg\"}]','9173f6d8-e9c0-4c7d-8473-b506e0cc258e'),(42,'[{\"name\": \"goat\", \"image_url\": \"http://localhost:3000/images/goat.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:3000/images/pig.webp\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:3000/images/sheep.jpg\"}]','1a47b7eb-d733-432a-a56f-26cb616a6d42'),(43,'[{\"name\": \"goat\", \"image_url\": \"http://localhost:3000/images/goat.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:3000/images/pig.webp\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:3000/images/bunny.jpg\"}, {\"desc\": \"Green and slithers in the grass\", \"name\": \"Snake\", \"image_url\": \"http://localhost:3000/images/1662706994183.png\"}]','570901e2-6efd-4fb2-b4af-1ccd4d364d3e'),(46,'[{\"name\": \"goat\", \"image_url\": \"http://localhost:3000/images/goat.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:3000/images/pig.webp\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:3000/images/bunny.jpg\"}, {\"name\": \"cow\", \"image_url\": \"http://localhost:3000/images/C.jpg\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:3000/images/bunny.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:3000/images/pig.webp\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:3000/images/sheep.jpg\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:3000/images/bunny.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:3000/images/pig.webp\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:3000/images/pig.webp\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:3000/images/pig.webp\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:3000/images/sheep.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:3000/images/sheep.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:3000/images/sheep.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:3000/images/sheep.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:3000/images/sheep.jpg\"}, {\"name\": \"cow\", \"image_url\": \"http://localhost:3000/images/C.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:3000/images/pig.webp\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:3000/images/bunny.jpg\"}]','d0d85e78-02a0-4ddf-a32e-4c1ad7ebf87c'),(47,'[{\"name\": \"pig\", \"image_url\": \"http://localhost:3000/images/pig.webp\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:3000/images/bunny.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:3000/images/sheep.jpg\"}, {\"name\": \"goat\", \"image_url\": \"http://localhost:3000/images/goat.jpg\"}, {\"name\": \"cow\", \"image_url\": \"http://localhost:3000/images/C.jpg\"}]','21c144a0-a1af-42e7-a9c4-a5b28c007b1c');
/*!40000 ALTER TABLE `animals_at_farm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_trail`
--

DROP TABLE IF EXISTS `audit_trail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_trail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(100) DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `action_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_trail`
--

LOCK TABLES `audit_trail` WRITE;
/*!40000 ALTER TABLE `audit_trail` DISABLE KEYS */;
INSERT INTO `audit_trail` (`id`, `uuid`, `user_id`, `action`, `action_date`) VALUES (1,'a790f27c-4e13-11ed-b201-448a5b2c2d83','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00068 has been created by  Amanya Theology','2022-10-17 12:03:04'),(2,'51921a93-4e3d-11ed-b201-448a5b2c2d83','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00070 has been created by  Amanya Theology','2022-10-17 17:01:18'),(3,'aae4b975-4e46-11ed-b201-448a5b2c2d83','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00070\'s data been updated by Amanya Theology','2022-10-17 18:08:14'),(4,'4032d941-4e48-11ed-b201-448a5b2c2d83','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00071 has been created by Amanya Theology','2022-10-17 18:19:34'),(5,'ae1cef12-4e59-11ed-b201-448a5b2c2d83','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00072 has been created byAmanya Theolin','2022-10-17 20:24:19'),(6,'833e2057-4eeb-11ed-b201-448a5b2c2d83','fea8d3cf-d829-4d45-8c89-eb177672e7e9','energy - 34 1000 has been added byAmanya Theolin','2022-10-18 13:48:14'),(7,'9d8c4cba-8cce-11ed-a584-448a5b2c2d83','fea8d3cf-d829-4d45-8c89-eb177672e7e9','energy - 34 1000 has been deleted byAma Theolin','2023-01-05 07:57:35'),(8,'1b230275-8f7d-11ed-a584-448a5b2c2d83','fea8d3cf-d829-4d45-8c89-eb177672e7e9','DSTV BILL - 12 1000 has been deleted byAma Theolin','2023-01-08 17:51:40'),(9,'1c29d883-8f7d-11ed-a584-448a5b2c2d83','fea8d3cf-d829-4d45-8c89-eb177672e7e9','Amanya Theo - 12 1 has been deleted byAma Theolin','2023-01-08 17:51:42'),(10,'a0a561cf-b08b-11ed-927d-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been deleted byAma Theolin','2023-02-19 19:28:46'),(11,'fb8084ca-b094-11ed-927d-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','Rice Straw - 5 1 has been added byAma Theolin','2023-02-19 20:35:43'),(12,'31e475c5-b060-11ed-b3a2-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-19 14:17:51'),(13,'417b1f68-b060-11ed-b3a2-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-19 14:18:18'),(14,'a465f012-b06e-11ed-b3a2-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00043\'s data been updated byAma Theolin','2023-02-19 16:01:16'),(15,'9c919e48-b071-11ed-b3a2-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-0048 has been created byAma Theolin','2023-02-19 16:22:32'),(16,'74ff66ae-b085-11ed-b3a2-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-0048 has been created byAma Theolin','2023-02-19 18:44:35'),(17,'75040832-b085-11ed-b3a2-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-19 18:44:35'),(18,'750536ca-b085-11ed-b3a2-8c1645602325',NULL,NULL,'2023-02-19 18:44:35'),(19,'75069e66-b085-11ed-b3a2-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-19 18:44:35'),(21,'4e5cc4a7-b095-11ed-b3a2-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00068 has been created byAma Theolin','2023-02-19 20:38:02'),(22,'95d975d8-b097-11ed-b3a2-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00055 has been created byAma Theolin','2023-02-19 20:54:21'),(23,'f3621eb7-b099-11ed-b3a2-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00073 has been created byAma Theolin','2023-02-19 21:11:17'),(24,'99831acb-b0e9-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00054 has been created byAma Theolin','2023-02-20 06:41:26'),(25,'072b1931-b0ec-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00070 has been created byAma Theolin','2023-02-20 06:58:49'),(26,'319de582-b12a-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00065 has been created byAma Theolin','2023-02-20 14:23:48'),(27,'41c822f0-b13e-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00065 has been created byAma Theolin','2023-02-20 16:47:26'),(28,'ffe99ecf-b13e-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00065 has been created byAma Theolin','2023-02-20 16:52:45'),(29,'c54b85b6-b143-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00043 has been created byAma Theolin','2023-02-20 17:26:54'),(30,'234c1f41-b144-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-0048 has been created byAma Theolin','2023-02-20 17:29:32'),(31,'8b7a7481-b144-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00071 has been created byAma Theolin','2023-02-20 17:32:27'),(32,'4a0a01e0-b145-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00055 has been created byAma Theolin','2023-02-20 17:37:47'),(33,'94f5dab5-b145-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-20 17:39:52'),(34,'93d78dea-b14a-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00055 has been created byAma Theolin','2023-02-20 18:15:38'),(35,'24c7f148-b14b-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00055 has been created byAma Theolin','2023-02-20 18:19:41'),(36,'9ced3aa3-b155-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-20 19:34:37'),(37,'5cd18b60-b156-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00065 has been created byAma Theolin','2023-02-20 19:40:00'),(38,'a5ec7d4c-b156-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-20 19:42:02'),(39,'f4180c89-b156-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-20 19:44:13'),(40,'0ec213ef-b157-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-20 19:44:58'),(41,'b6f121b7-b213-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-0048 has been created byAma Theolin','2023-02-21 18:15:25'),(42,'001114d8-b216-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00054 has been created byAma Theolin','2023-02-21 18:31:47'),(43,'85f2ecfe-b216-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-0048 has been created byAma Theolin','2023-02-21 18:35:32'),(44,'2c72b42c-b21b-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-21 19:08:49'),(45,'d745a302-b21f-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-0048 has been created byAma Theolin','2023-02-21 19:42:14'),(46,'d7470a03-b21f-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00055 has been created byAma Theolin','2023-02-21 19:42:14'),(47,'d748c397-b21f-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-0048 has been created byAma Theolin','2023-02-21 19:42:14'),(48,'d74a01a3-b21f-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-21 19:42:14'),(49,'d74b4132-b21f-11ed-a65c-8c1645602325',NULL,NULL,'2023-02-21 19:42:14'),(50,'d74d043a-b21f-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00054 has been created byAma Theolin','2023-02-21 19:42:14'),(51,'d7695514-b21f-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00065 has been created byAma Theolin','2023-02-21 19:42:14'),(52,'d76aceae-b21f-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-0048 has been created byAma Theolin','2023-02-21 19:42:14'),(53,'d76bfd75-b21f-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00065 has been created byAma Theolin','2023-02-21 19:42:14'),(54,'d76d7edb-b21f-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-21 19:42:14'),(55,'d76eafc6-b21f-11ed-a65c-8c1645602325','fea8d3cf-d829-4d45-8c89-eb177672e7e9','COW-00040 has been created byAma Theolin','2023-02-21 19:42:14');
/*!40000 ALTER TABLE `audit_trail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `breeding`
--

DROP TABLE IF EXISTS `breeding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `breeding` (
  `id` int NOT NULL AUTO_INCREMENT,
  `animal_id` int DEFAULT NULL,
  `breeding_date` date DEFAULT NULL,
  `expected_due_date` date DEFAULT NULL,
  `breeding_uuid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `breeding`
--

LOCK TABLES `breeding` WRITE;
/*!40000 ALTER TABLE `breeding` DISABLE KEYS */;
INSERT INTO `breeding` (`id`, `animal_id`, `breeding_date`, `expected_due_date`, `breeding_uuid`) VALUES (1,4,'2022-10-07','2023-07-24','38a57545-62f5-49d4-bd8c-3f1b67f6d545'),(2,70,'2022-10-18','2023-07-27','25daee69-35fa-47cc-af1e-7d7bd44acf11'),(3,69,'2022-10-04','2023-07-27','dd610352-c9ef-486d-8130-9e6aac8c502b');
/*!40000 ALTER TABLE `breeding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disease`
--

DROP TABLE IF EXISTS `disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disease` (
  `id` int NOT NULL AUTO_INCREMENT,
  `disease_name` varchar(100) NOT NULL,
  `genre_id` int NOT NULL,
  `animal_type` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disease`
--

LOCK TABLES `disease` WRITE;
/*!40000 ALTER TABLE `disease` DISABLE KEYS */;
INSERT INTO `disease` (`id`, `disease_name`, `genre_id`, `animal_type`) VALUES (1,'Anemia',1,'cow'),(2,'Bloat ',1,'cow'),(3,'Colic',1,'cow'),(4,'Founder',1,'cow'),(5,'Pneumonia',2,'cow'),(6,'Tetanus',2,'cow'),(7,'Atrophic Rhinitis',2,'cow'),(8,'Anthrax',2,'cow'),(9,'Blackleg',2,'cow'),(10,'Brucellosis',2,'cow'),(11,'pullorum',2,'cow'),(12,'Foot Rot',4,'cow'),(13,'Calf Diphtheria',4,'cow'),(14,'Coccidiosis',5,'cow'),(15,'Cholera',3,'cow'),(16,'Equine Encephalomyelitis',3,'cow'),(17,'Hemorrhagic Septicemia',3,'cow'),(18,'Newcastle',3,'cow'),(19,'Warts',3,'cow'),(20,'Cholera',3,'cow'),(21,'Equine Encephalomyelitis',3,'cow'),(22,'Hemorrhagic Septicemia',3,'cow'),(23,'Newcastle',3,'cow'),(24,'Warts',3,'cow'),(25,'Abscesses',1,'rabbit'),(26,'Enteritis: Diarrhea',1,'rabbit'),(27,'Pneumonia',1,'rabbit'),(28,'Ringworm',1,'rabbit'),(29,'Skin Mange',1,'rabbit'),(30,'Sore Hocks',1,'rabbit'),(31,'Warbles',1,'rabbit'),(42,'5000',4,'5000'),(43,'4000',4,'4000'),(44,'3000',4,'3000'),(45,'2000',4,'2000'),(46,'1000',4,'1000');
/*!40000 ALTER TABLE `disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disease_genre`
--

DROP TABLE IF EXISTS `disease_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disease_genre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `genre` varchar(120) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disease_genre`
--

LOCK TABLES `disease_genre` WRITE;
/*!40000 ALTER TABLE `disease_genre` DISABLE KEYS */;
INSERT INTO `disease_genre` (`id`, `genre`) VALUES (1,'Tick-borne Diseases'),(2,'Bacterial Diseases'),(3,'Viral Diseases'),(4,'fungal Diseases'),(5,'Protozoan Diseases'),(6,'Nutritional defects');
/*!40000 ALTER TABLE `disease_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_records`
--

DROP TABLE IF EXISTS `doctor_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `animal_type` varchar(20) DEFAULT NULL,
  `diagnosis` text,
  `disease_id` tinyint DEFAULT NULL,
  `animal_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_records`
--

LOCK TABLES `doctor_records` WRITE;
/*!40000 ALTER TABLE `doctor_records` DISABLE KEYS */;
INSERT INTO `doctor_records` (`id`, `animal_type`, `diagnosis`, `disease_id`, `animal_id`) VALUES (1,'cow','The clinical signs are high fever, the formation of blisters at foot and mouth, loss of appetite, weight loss, reduced milk production, and death of young animals.',2,43);
/*!40000 ALTER TABLE `doctor_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `due_dates`
--

DROP TABLE IF EXISTS `due_dates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `due_dates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vaccination_date` date DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `animal_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `due_dates`
--

LOCK TABLES `due_dates` WRITE;
/*!40000 ALTER TABLE `due_dates` DISABLE KEYS */;
INSERT INTO `due_dates` (`id`, `vaccination_date`, `delivery_date`, `animal_id`) VALUES (1,'2022-09-10','2022-10-08','54');
/*!40000 ALTER TABLE `due_dates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farma`
--

DROP TABLE IF EXISTS `farma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farma` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `farma_id` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `mail` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farma`
--

LOCK TABLES `farma` WRITE;
/*!40000 ALTER TABLE `farma` DISABLE KEYS */;
INSERT INTO `farma` (`id`, `created_date`, `farma_id`, `first_name`, `last_name`, `mail`, `phone`, `password`) VALUES (48,'2022-08-25 08:16:08','fea8d3cf-d829-4d45-8c89-eb177672e7e9','Ama','Theolin','2018bit020@std.must.ac.ug','256780730001','BbZsUOHfcAmw+YR3MsWgfg=='),(53,'2022-10-09 10:01:52','03931a4e-41bf-4929-8b91-392285ebb42f','Co','Draculla','ell889lle@gmail.com',NULL,'ToNW0n/wIAZjak4lDRcBuw=='),(54,'2022-10-13 14:39:25','23513d85-4195-48ef-8a41-43949739bc50','mary','jane','maryjane@gmail.com',NULL,'RJUdrLPXiaeBsezGyvQOFQ=='),(55,'2022-10-13 14:40:22','d0d85e78-02a0-4ddf-a32e-4c1ad7ebf87c',NULL,NULL,'maryjane@gmail.com',NULL,'dqBeVliolOTiLX44BNBTkw=='),(56,'2023-02-18 22:06:33','21c144a0-a1af-42e7-a9c4-a5b28c007b1c','ASIA','NANTAMBI','asiantantambi@neptunesoftwaregroup.com','0751234342','i/V1O2lVZyluSV5HWXXA0g==');
/*!40000 ALTER TABLE `farma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeding_schedule`
--

DROP TABLE IF EXISTS `feeding_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feeding_schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feeding_tt_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `effective_date` date NOT NULL,
  `next_date` date DEFAULT NULL,
  `feeds_quantity` int DEFAULT NULL,
  `feeds_qnty_pending` int DEFAULT NULL,
  `schedule_id` text NOT NULL,
  `qnty_unit` int NOT NULL,
  `qnty_per_cycle_unit` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeding_schedule`
--

LOCK TABLES `feeding_schedule` WRITE;
/*!40000 ALTER TABLE `feeding_schedule` DISABLE KEYS */;
INSERT INTO `feeding_schedule` (`id`, `feeding_tt_id`, `effective_date`, `next_date`, `feeds_quantity`, `feeds_qnty_pending`, `schedule_id`, `qnty_unit`, `qnty_per_cycle_unit`) VALUES (1,'3','2023-03-04','2023-02-05',11,11,'100153061854412807',0,0),(2,'3e770ad3-1ce2-43de-a01c-770b5b3a2157','2023-03-04','2023-02-05',12,12,'100153061854412808',0,0),(3,'c508ac46-ebbc-41cc-b65e-343d5f9bfb60','2023-03-04','2023-02-05',2,2,'100189194189537280',0,0),(4,'5637c6f7-683d-4b9c-b754-e100c9949dcf','2023-03-04','2023-02-05',12,12,'100189194189537281',0,0),(5,'00b76ca2-6fd6-481d-8660-a3ae2db1adc1','2023-02-25','2023-02-26',2,10,'9ab1dcf6-b093-11ed-927d-8c1645602325',1,1),(6,'00b76ca2-6fd6-481d-8660-a3ae2db1adc1','2023-02-26','2023-02-27',2,8,'9ab1ecd6-b093-11ed-927d-8c1645602325',1,1),(7,'00b76ca2-6fd6-481d-8660-a3ae2db1adc1','2023-02-27','2023-02-28',2,6,'9ab1f197-b093-11ed-927d-8c1645602325',1,1),(8,'00b76ca2-6fd6-481d-8660-a3ae2db1adc1','2023-02-28','2023-03-01',2,4,'9ab1fc1f-b093-11ed-927d-8c1645602325',1,1),(9,'00b76ca2-6fd6-481d-8660-a3ae2db1adc1','2023-03-01','2023-03-02',2,2,'9ab200ff-b093-11ed-927d-8c1645602325',1,1),(10,'f19a56b7-1fd7-4bbc-a2e3-69e8465e4507','2023-03-02','2023-03-03',1,10,'fb8047aa-b094-11ed-927d-8c1645602325',1,1),(11,'f19a56b7-1fd7-4bbc-a2e3-69e8465e4507','2023-03-03','2023-03-04',1,9,'fb804e8e-b094-11ed-927d-8c1645602325',1,1),(12,'f19a56b7-1fd7-4bbc-a2e3-69e8465e4507','2023-03-04','2023-03-05',1,8,'fb805232-b094-11ed-927d-8c1645602325',1,1),(13,'f19a56b7-1fd7-4bbc-a2e3-69e8465e4507','2023-03-05','2023-03-06',1,7,'fb805612-b094-11ed-927d-8c1645602325',1,1),(14,'f19a56b7-1fd7-4bbc-a2e3-69e8465e4507','2023-03-06','2023-03-07',1,6,'fb8059d9-b094-11ed-927d-8c1645602325',1,1),(15,'f19a56b7-1fd7-4bbc-a2e3-69e8465e4507','2023-03-07','2023-03-08',1,5,'fb805dab-b094-11ed-927d-8c1645602325',1,1),(16,'f19a56b7-1fd7-4bbc-a2e3-69e8465e4507','2023-03-08','2023-03-09',1,4,'fb80612c-b094-11ed-927d-8c1645602325',1,1),(17,'f19a56b7-1fd7-4bbc-a2e3-69e8465e4507','2023-03-09','2023-03-10',1,3,'fb8064a3-b094-11ed-927d-8c1645602325',1,1),(18,'f19a56b7-1fd7-4bbc-a2e3-69e8465e4507','2023-03-10','2023-03-11',1,2,'fb806866-b094-11ed-927d-8c1645602325',1,1),(19,'f19a56b7-1fd7-4bbc-a2e3-69e8465e4507','2023-03-11','2023-03-12',1,1,'fb806bba-b094-11ed-927d-8c1645602325',1,1);
/*!40000 ALTER TABLE `feeding_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeding_timetable`
--

DROP TABLE IF EXISTS `feeding_timetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feeding_timetable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tt_name` varchar(100) DEFAULT NULL,
  `animal_type` varchar(20) DEFAULT NULL,
  `cycle` int DEFAULT NULL,
  `period` int DEFAULT NULL,
  `quantity_per_cycle` int DEFAULT NULL,
  `quantity_per_cycle_unit` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `quantity_unit` int DEFAULT NULL,
  `first_feed_date` date DEFAULT NULL,
  `feeds_id` int DEFAULT NULL,
  `tt_id` char(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeding_timetable`
--

LOCK TABLES `feeding_timetable` WRITE;
/*!40000 ALTER TABLE `feeding_timetable` DISABLE KEYS */;
INSERT INTO `feeding_timetable` (`id`, `tt_name`, `animal_type`, `cycle`, `period`, `quantity_per_cycle`, `quantity_per_cycle_unit`, `quantity`, `quantity_unit`, `first_feed_date`, `feeds_id`, `tt_id`) VALUES (53,'COW-FEEDING-00052','cow',1,1,2,1,10,1,'2023-02-25',2,'00b76ca2-6fd6-481d-8660-a3ae2db1adc1'),(54,'COW-FEEDING-00054','cow',1,7,1,1,10,1,'2023-03-02',2,'f19a56b7-1fd7-4bbc-a2e3-69e8465e4507');
/*!40000 ALTER TABLE `feeding_timetable` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`derek`@`localhost`*/ /*!50003 TRIGGER `new_tt_insert` AFTER INSERT ON `feeding_timetable` FOR EACH ROW BEGIN

    CALL farma_create_schedule (
        NEW.tt_id,
        NEW.quantity,
        NEW.quantity_unit,
        NEW.first_feed_date,
        NEW.cycle,
        NEW.cycle,
        NEW.quantity_per_cycle,
        NEW.quantity_per_cycle_unit,
        @total);

    UPDATE feeds
    SET quantity = (quantity-NEW.quantity)
    WHERE id = NEW.feeds_id;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `feeds`
--

DROP TABLE IF EXISTS `feeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feeds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(120) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `quantity_measure` int DEFAULT NULL,
  `stock_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expected_restock_date` datetime DEFAULT NULL,
  `animal_type` varchar(20) DEFAULT NULL,
  `farma_id` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeds`
--

LOCK TABLES `feeds` WRITE;
/*!40000 ALTER TABLE `feeds` DISABLE KEYS */;
INSERT INTO `feeds` (`id`, `name`, `description`, `quantity`, `quantity_measure`, `stock_date`, `expected_restock_date`, `animal_type`, `farma_id`) VALUES (1,'Wheat Straw','Wheat Straw Feeds',23,1000,'2022-09-23 19:15:37','2023-09-23 00:00:00','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(2,'Rice Straw','Wheat Straw Feeds 2',5,1,'2022-09-23 19:15:37','2023-09-23 00:00:00','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(3,'Maize Stover','Wheat Straw Feeds 3',3,1000,'2022-09-23 19:15:37','2023-09-23 00:00:00','cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9');
/*!40000 ALTER TABLE `feeds` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`derek`@`localhost`*/ /*!50003 TRIGGER `new_feeds_stock` AFTER INSERT ON `feeds` FOR EACH ROW BEGIN

    -- statements
    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.name, " - ", NEW.quantity, " ", NEW.quantity_measure, " has been added by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`derek`@`localhost`*/ /*!50003 TRIGGER `feeds_update` BEFORE UPDATE ON `feeds` FOR EACH ROW BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.name, " - ", NEW.quantity, " ", NEW.quantity_measure, " has been added by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`derek`@`localhost`*/ /*!50003 TRIGGER `before_feeds_delete` BEFORE DELETE ON `feeds` FOR EACH ROW BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), OLD.farma_id, CONCAT(OLD.name, " - ", OLD.quantity, " ", OLD.quantity_measure, " has been deleted by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = OLD.farma_id)));

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `first_dates`
--

DROP TABLE IF EXISTS `first_dates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `first_dates` (
  `first_dates_id` int NOT NULL AUTO_INCREMENT,
  `vaccination_date` date DEFAULT NULL,
  `feeds_stock` date DEFAULT NULL,
  `insemination_date` date DEFAULT NULL,
  `animal_id` int DEFAULT NULL,
  PRIMARY KEY (`first_dates_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `first_dates`
--

LOCK TABLES `first_dates` WRITE;
/*!40000 ALTER TABLE `first_dates` DISABLE KEYS */;
INSERT INTO `first_dates` (`first_dates_id`, `vaccination_date`, `feeds_stock`, `insemination_date`, `animal_id`) VALUES (1,'2022-09-07','2022-09-07','2022-09-07',54),(2,'2022-09-08','2022-09-08','2022-09-08',40);
/*!40000 ALTER TABLE `first_dates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gestation_periods`
--

DROP TABLE IF EXISTS `gestation_periods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gestation_periods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` int DEFAULT NULL,
  `animal_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gestation_periods`
--

LOCK TABLES `gestation_periods` WRITE;
/*!40000 ALTER TABLE `gestation_periods` DISABLE KEYS */;
INSERT INTO `gestation_periods` (`id`, `period`, `animal_type`) VALUES (1,31,'rabbit'),(2,150,'goat'),(3,147,'sheep'),(4,283,'cow'),(5,125,'pig');
/*!40000 ALTER TABLE `gestation_periods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_born`
--

DROP TABLE IF EXISTS `new_born`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new_born` (
  `id` int NOT NULL AUTO_INCREMENT,
  `new_born_tag` varchar(200) DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `dob` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_born`
--

LOCK TABLES `new_born` WRITE;
/*!40000 ALTER TABLE `new_born` DISABLE KEYS */;
INSERT INTO `new_born` (`id`, `new_born_tag`, `parent_id`, `dob`) VALUES (35,'COW-65',54,'2022-10-08'),(36,'COW-65',54,'2022-10-08'),(39,'COW-65',54,'2022-10-08'),(43,'COW-65',54,'2022-10-08');
/*!40000 ALTER TABLE `new_born` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_schedule`
--

DROP TABLE IF EXISTS `product_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_type_id` int DEFAULT NULL,
  `cycle` int NOT NULL,
  `frequency` int NOT NULL,
  `expected_qnty` int DEFAULT NULL,
  `expected_qnty_measure` int DEFAULT NULL,
  `animal_id` int DEFAULT NULL,
  `extract_date` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_schedule`
--

LOCK TABLES `product_schedule` WRITE;
/*!40000 ALTER TABLE `product_schedule` DISABLE KEYS */;
INSERT INTO `product_schedule` (`id`, `product_type_id`, `cycle`, `frequency`, `expected_qnty`, `expected_qnty_measure`, `animal_id`, `extract_date`) VALUES (1,1,2,1,4,1000,54,'0000-00-00 00:00:00');
/*!40000 ALTER TABLE `product_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) DEFAULT NULL,
  `product_type_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `quantity_measure` int DEFAULT NULL,
  `animal_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `name`, `product_type_id`, `quantity`, `quantity_measure`, `animal_id`) VALUES (1,'wool',3,5,1000,54);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sick_animals`
--

DROP TABLE IF EXISTS `sick_animals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sick_animals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `animal_id` int DEFAULT NULL,
  `disease_id` int DEFAULT NULL,
  `reported_date` date DEFAULT NULL,
  `vet_id` varchar(120) DEFAULT NULL,
  `appointment_date` datetime DEFAULT NULL,
  `confirmed` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'N',
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sick_animals`
--

LOCK TABLES `sick_animals` WRITE;
/*!40000 ALTER TABLE `sick_animals` DISABLE KEYS */;
INSERT INTO `sick_animals` (`id`, `animal_id`, `disease_id`, `reported_date`, `vet_id`, `appointment_date`, `confirmed`, `added_date`) VALUES (7,53,8,'2022-10-14','520349f6-6594-4f2c-a30a-348cf70e9f82','2022-10-12 00:00:00','Y','2022-10-02 17:51:43'),(9,64,2,'2022-09-28','70282288-af13-449f-b270-240f56b45b77','2022-10-15 18:57:00','N','2022-10-14 15:57:43'),(10,67,6,'2022-10-12','70282288-af13-449f-b270-240f56b45b77','2022-10-30 19:12:00','Y','2022-10-15 12:08:46'),(11,54,7,'2022-10-14','ad74b397-436d-403e-bca4-332c3fe925d9','2022-10-22 18:09:00','N','2022-10-19 15:09:45');
/*!40000 ALTER TABLE `sick_animals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symptom`
--

DROP TABLE IF EXISTS `symptom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `symptom` (
  `id` int NOT NULL AUTO_INCREMENT,
  `disease` varchar(200) NOT NULL,
  `symptom_name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptom`
--

LOCK TABLES `symptom` WRITE;
/*!40000 ALTER TABLE `symptom` DISABLE KEYS */;
INSERT INTO `symptom` (`id`, `disease`, `symptom_name`, `description`) VALUES (1,'1','Characterized by general \r\nweakness and a lack of \r\nvigor.','All farm animals are \r\nsusceptible. Iron deficiency \r\nprevents the formation of \r\nhemoglobin, a red ironcontaining pigment in the red \r\nblood cells responsible for \r\ncarrying oxygen to the cells.'),(2,'4','occurs when Cows graze on highly productive pastures during the wet season','\r\nSwollen abdomen on the left \r\nside, labored breathing, \r\nprofuse salivation, groaning, \r\nlack of appetite, & stiffness.'),(3,'2','Improper feeding. Pain, sweating, & \r\nconstipation, kicking, & \r\ngroaning.\r\nCareful feeding.','\r\nEnterotoxemia Bacteria & overeating. Constipation is an early \r\nsymptom & sometimes \r\nfollowed by diarrhea.'),(4,'8','dsds','dsds'),(5,'5','1122','1122'),(6,'2','desease','desease'),(7,'6','First time weak bones','First time weak bones'),(8,'7','enter ','enter ');
/*!40000 ALTER TABLE `symptom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_history`
--

DROP TABLE IF EXISTS `treatment_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatment_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `animal_id` int DEFAULT NULL,
  `animal_tag` varchar(20) DEFAULT NULL,
  `first_treatment_date` datetime DEFAULT NULL,
  `scheduled_treatment_date` datetime DEFAULT NULL,
  `vet_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_history`
--

LOCK TABLES `treatment_history` WRITE;
/*!40000 ALTER TABLE `treatment_history` DISABLE KEYS */;
INSERT INTO `treatment_history` (`id`, `animal_id`, `animal_tag`, `first_treatment_date`, `scheduled_treatment_date`, `vet_id`) VALUES (1,54,'COW-00054',NULL,'2022-09-17 12:21:55','1');
/*!40000 ALTER TABLE `treatment_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `triggered_emails`
--

DROP TABLE IF EXISTS `triggered_emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `triggered_emails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email_address` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `status` char(1) NOT NULL,
  `subject` varchar(50) DEFAULT NULL,
  `farma_name` varchar(45) NOT NULL,
  `body` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `animal_tag` varchar(10) NOT NULL,
  `confirmation_id` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `triggered_emails`
--

LOCK TABLES `triggered_emails` WRITE;
/*!40000 ALTER TABLE `triggered_emails` DISABLE KEYS */;
INSERT INTO `triggered_emails` (`id`, `user_name`, `email_address`, `status`, `subject`, `farma_name`, `body`, `animal_tag`, `confirmation_id`) VALUES (1,'Amanya Theo','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-00043','Ama Theolin','Ama Theolinhas scheduled a vaccination of their COW-00043against Colicon the 2023-02-28 for details call256780730001','COW-00043','c555e2fc-b143-11ed-a65c-8c1645602325'),(2,'ssebabi martin','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-0048','Ama Theolin','Ama Theolinhas scheduled a vaccination of their COW-0048against Colicon the 2023-02-20 for details call256780730001','COW-0048','234c599e-b144-11ed-a65c-8c1645602325'),(3,'Amanya Theo','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-00071','Ama Theolin','Ama Theolinhas scheduled a vaccination of their COW-00071against Colicon the 2023-03-01 for details call256780730001','COW-00071','8b7aa396-b144-11ed-a65c-8c1645602325'),(4,'ssebabi martin','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-00055','Ama Theolin','Ama Theolin has scheduled a vaccination of their COW-00055 against Colic on the 2023-03-01 for details call 256780730001','COW-00055','4a0a81bb-b145-11ed-a65c-8c1645602325'),(5,'Amanya Theo','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-00040','Ama Theolin','Ama Theolin has scheduled a vaccination of their COW-00040 against Colic on the 2023-02-25 for details call 256780730001','COW-00040','94f60d8d-b145-11ed-a65c-8c1645602325'),(6,'Amanya Theo','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-00055','Ama Theolin','Ama Theolin has scheduled a vaccination of their COW-00055 against Colic on the 2023-02-11 for details call 256780730001','COW-00055','93d7bfcf-b14a-11ed-a65c-8c1645602325'),(7,'ssebabi martin','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-00055','Ama Theolin','Ama Theolin has scheduled a vaccination of their COW-00055 against Colic on the 2023-03-01 for details call 256780730001','COW-00055','24c81807-b14b-11ed-a65c-8c1645602325'),(8,'Amanya Theo','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-00040','Ama Theolin','Ama Theolin has scheduled a vaccination of their COW-00040 against Colic on the 2023-02-09 for details call 256780730001','COW-00040','9cf15624-b155-11ed-a65c-8c1645602325'),(9,'ssebabi martin','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-00065','Ama Theolin','Ama Theolin has scheduled <br> a vaccination of their COW-00065 against Colic on the 2023-02-05 <br>  for details call 256780730001','COW-00065','5cd1af38-b156-11ed-a65c-8c1645602325'),(10,'Amanya Theo','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-00040','Ama Theolin','Ama Theolin has scheduled a vaccination of their COW-00040 against Colic on the 2023-03-05  for details call 256780730001','COW-00040','a5ec9ca4-b156-11ed-a65c-8c1645602325'),(11,'ssebabi martin','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-00040','Ama Theolin','Ama Theolin has scheduled a vaccination of their COW-00040 against Colic on the 2023-02-09  for details call 256780730001','COW-00040','f418231e-b156-11ed-a65c-8c1645602325'),(12,'Craig David','derek.barigye@gmail.com','Y','SCHEDULED VACCINATION OF COW-00040','Ama Theolin','Ama Theolin has scheduled a vaccination of their COW-00040 against Colic on the 2023-03-02  for details call 256780730001','COW-00040','0ec23768-b157-11ed-a65c-8c1645602325'),(13,'ssebabi martin','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-0048','Ama Theolin','Ama Theolin has scheduled a vaccination of their COW-0048 against Colic on the 2023-02-25  for details call 256780730001','COW-0048','b721f3e4-b213-11ed-a65c-8c1645602325'),(14,'ssebabi martin','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-00054','Ama Theolin','Ama Theolin has scheduled a vaccination of their COW-00054 against Colic on the 2023-02-17  for details call 256780730001','COW-00054','0011a02c-b216-11ed-a65c-8c1645602325'),(15,'ssebabi martin','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-0048','Ama Theolin','Ama Theolin has scheduled a vaccination of their COW-0048 against Colic on the 2023-02-10  for details call 256780730001','COW-0048','85f3165b-b216-11ed-a65c-8c1645602325'),(16,'ssebabi martin','2018bit020@std.must.ac.ug','Y','SCHEDULED VACCINATION OF COW-00040','Ama Theolin','Ama Theolin has scheduled a vaccination of their COW-00040 against Colic on the 2023-02-23  for details call 256780730001','COW-00040','2c755353-b21b-11ed-a65c-8c1645602325');
/*!40000 ALTER TABLE `triggered_emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccination_details`
--

DROP TABLE IF EXISTS `vaccination_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccination_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vaccine_id` int DEFAULT NULL,
  `first_date` date DEFAULT NULL,
  `next_date` date DEFAULT NULL,
  `last_date` date DEFAULT NULL,
  `no_pending` int DEFAULT NULL,
  `animal_id` int DEFAULT NULL,
  `vet_id` varchar(120) DEFAULT NULL,
  `confirmed` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccination_details`
--

LOCK TABLES `vaccination_details` WRITE;
/*!40000 ALTER TABLE `vaccination_details` DISABLE KEYS */;
INSERT INTO `vaccination_details` (`id`, `vaccine_id`, `first_date`, `next_date`, `last_date`, `no_pending`, `animal_id`, `vet_id`, `confirmed`) VALUES (4,3,'2022-09-06','2022-10-14','2022-10-20',3,44,'520349f6-6594-4f2c-a30a-348cf70e9f82','Y'),(10,3,'2023-03-04',NULL,NULL,NULL,69,'70282288-af13-449f-b270-240f56b45b77','N'),(11,3,'2023-03-02',NULL,NULL,NULL,62,'70282288-af13-449f-b270-240f56b45b77','N'),(12,3,'2023-02-26',NULL,NULL,NULL,75,'30b74029-e57f-4a85-a984-8e6608b784cb','N'),(13,5,'2023-02-25',NULL,NULL,NULL,54,'520349f6-6594-4f2c-a30a-348cf70e9f82','Y'),(14,3,'2023-02-14',NULL,NULL,NULL,70,'30b74029-e57f-4a85-a984-8e6608b784cb','N'),(15,4,'2023-02-24',NULL,NULL,NULL,66,'520349f6-6594-4f2c-a30a-348cf70e9f82','N'),(16,4,'2023-02-10',NULL,NULL,NULL,66,'520349f6-6594-4f2c-a30a-348cf70e9f82','Y'),(17,2,'2023-02-17',NULL,NULL,NULL,66,'520349f6-6594-4f2c-a30a-348cf70e9f82','N'),(18,3,'2023-02-28',NULL,NULL,NULL,43,'520349f6-6594-4f2c-a30a-348cf70e9f82','N'),(19,3,'2023-02-20',NULL,NULL,NULL,48,'ad74b397-436d-403e-bca4-332c3fe925d9','Y'),(20,3,'2023-03-01',NULL,NULL,NULL,71,'520349f6-6594-4f2c-a30a-348cf70e9f82','N'),(21,3,'2023-03-01',NULL,NULL,NULL,62,'ad74b397-436d-403e-bca4-332c3fe925d9','Y'),(22,4,'2023-02-25',NULL,NULL,NULL,53,'520349f6-6594-4f2c-a30a-348cf70e9f82','N'),(23,4,'2023-02-11',NULL,NULL,NULL,62,'520349f6-6594-4f2c-a30a-348cf70e9f82','N'),(24,3,'2023-03-01',NULL,NULL,NULL,62,'ad74b397-436d-403e-bca4-332c3fe925d9','N'),(25,4,'2023-02-09',NULL,NULL,NULL,53,'520349f6-6594-4f2c-a30a-348cf70e9f82','N'),(26,5,'2023-02-05',NULL,NULL,NULL,66,'ad74b397-436d-403e-bca4-332c3fe925d9','Y'),(27,2,'2023-03-05',NULL,NULL,NULL,53,'520349f6-6594-4f2c-a30a-348cf70e9f82','N'),(28,4,'2023-02-09',NULL,NULL,NULL,53,'ad74b397-436d-403e-bca4-332c3fe925d9','Y'),(29,3,'2023-03-02',NULL,NULL,NULL,53,'70282288-af13-449f-b270-240f56b45b77','Y'),(30,3,'2023-02-25',NULL,NULL,NULL,48,'ad74b397-436d-403e-bca4-332c3fe925d9','Y'),(31,3,'2023-02-17',NULL,NULL,NULL,54,'ad74b397-436d-403e-bca4-332c3fe925d9','N'),(32,3,'2023-02-10',NULL,NULL,NULL,48,'ad74b397-436d-403e-bca4-332c3fe925d9','Y'),(33,4,'2023-02-23',NULL,NULL,NULL,53,'ad74b397-436d-403e-bca4-332c3fe925d9','Y');
/*!40000 ALTER TABLE `vaccination_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`derek`@`localhost`*/ /*!50003 TRIGGER `new_animal_vaccination_schedule` AFTER INSERT ON `vaccination_details` FOR EACH ROW BEGIN
    -- statements
    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(),
           (SELECT farma_id FROM animal WHERE id = NEW.animal_id),
           CONCAT( (SELECT animal_tag FROM animal WHERE id = NEW.animal_id), ' has been created by',
               (SELECT CONCAT(first_name, ' ', last_name)
                FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))));

    INSERT INTO triggered_emails (user_name,email_address,status,subject,farma_name,body,animal_tag,confirmation_id)
    VALUES ((SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = NEW.vet_id),
            (SELECT email FROM vets WHERE vet_id = NEW.vet_id),
            'N',
            CONCAT('SCHEDULED VACCINATION OF ', (SELECT animal_tag FROM animal WHERE id = NEW.animal_id)),
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id)),
            CONCAT((SELECT CONCAT(first_name, ' ', last_name) FROM farma
                        WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id)),
                ' has scheduled a vaccination of their ',
                (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
                ' against ', (SELECT disease_name FROM disease WHERE id IN (SELECT disease_id FROM vaccines WHERE id = NEW.vaccine_id )),
                ' on the ',  NEW.first_date, '  for details call ',
                (SELECT phone FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))),
            (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
            UUID());

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`derek`@`localhost`*/ /*!50003 TRIGGER `animal_vaccination_schedule_update` BEFORE UPDATE ON `vaccination_details` FOR EACH ROW BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
        VALUES(UUID(),(SELECT farma_id FROM animal WHERE id = NEW.animal_id), CONCAT( (SELECT animal_tag FROM animal WHERE id = NEW.animal_id), " has been created by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))));

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `vaccination_schedule`
--

DROP TABLE IF EXISTS `vaccination_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccination_schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cycle_no` int DEFAULT NULL,
  `vaccination_details_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `vaccination_date` date DEFAULT NULL,
  `next_vaccination_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccination_schedule`
--

LOCK TABLES `vaccination_schedule` WRITE;
/*!40000 ALTER TABLE `vaccination_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `vaccination_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccines`
--

DROP TABLE IF EXISTS `vaccines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `quantity_measure` bigint DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `cycle` int DEFAULT NULL,
  `period` int DEFAULT NULL,
  `injection_area` varchar(100) DEFAULT NULL,
  `disease_id` int DEFAULT NULL,
  `animal_type` varchar(100) DEFAULT NULL,
  `farma_id` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccines`
--

LOCK TABLES `vaccines` WRITE;
/*!40000 ALTER TABLE `vaccines` DISABLE KEYS */;
INSERT INTO `vaccines` (`id`, `name`, `quantity`, `quantity_measure`, `description`, `cycle`, `period`, `injection_area`, `disease_id`, `animal_type`, `farma_id`) VALUES (2,'One Shot Ultra 8',10,1,'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous',1,4,'behind left ear',3,'cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(3,'Piliguard Pinkeye + 7',10,1,'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous',2,4,'behind left ear',3,'cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(4,'Alpha-7/MB-1',10,1,'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous',4,4,'behind left ear',3,'cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9'),(5,'SolidBac Pinkeye IR/PR Implants',10,1,'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous',1,1,'behind left ear',3,'cow','fea8d3cf-d829-4d45-8c89-eb177672e7e9');
/*!40000 ALTER TABLE `vaccines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vets`
--

DROP TABLE IF EXISTS `vets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `email` varchar(69) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `station` varchar(50) DEFAULT NULL,
  `vet_id` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vets`
--

LOCK TABLES `vets` WRITE;
/*!40000 ALTER TABLE `vets` DISABLE KEYS */;
INSERT INTO `vets` (`id`, `fname`, `lname`, `email`, `phone`, `station`, `vet_id`) VALUES (3,'Amanya','Theo','2018bit020@std.must.ac.ug','+256758341871','ASA 2323','520349f6-6594-4f2c-a30a-348cf70e9f82'),(5,'ssebabi','BILL','michaelajnew@gmail.com','+256758341871','ssww','30b74029-e57f-4a85-a984-8e6608b784cb'),(6,'Craig','David','derek.barigye@gmail.com','+256703781554','Kabale','70282288-af13-449f-b270-240f56b45b77'),(7,'ssebabi','martin','2018bit020@std.must.ac.ug','+256758341871','kakyeka','ad74b397-436d-403e-bca4-332c3fe925d9');
/*!40000 ALTER TABLE `vets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-21 23:01:49
