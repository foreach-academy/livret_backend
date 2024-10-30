CREATE DATABASE  IF NOT EXISTS `livret` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `livret`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: livret
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apprenants_formation`
--

DROP TABLE IF EXISTS `apprenants_formation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apprenants_formation` (
  `apprenant_id` int(11) DEFAULT NULL,
  `formation_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apprenants_formation`
--

LOCK TABLES `apprenants_formation` WRITE;
/*!40000 ALTER TABLE `apprenants_formation` DISABLE KEYS */;
INSERT INTO `apprenants_formation` VALUES (4,2),(21,2),(45,2),(46,2),(24,2),(47,2),(48,2),(49,2),(50,2),(51,2),(52,2),(53,2),(54,4),(55,3),(56,1);
/*!40000 ALTER TABLE `apprenants_formation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation`
--

DROP TABLE IF EXISTS `evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `module_id` int(11) DEFAULT NULL,
  `apprenant_id` int(11) DEFAULT NULL,
  `evaluation_resultat_id` int(11) DEFAULT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `module_id` (`module_id`),
  KEY `user_id` (`apprenant_id`),
  KEY `evaluation_ibfk_4` (`evaluation_resultat_id`),
  CONSTRAINT `evaluation_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`),
  CONSTRAINT `evaluation_ibfk_2` FOREIGN KEY (`apprenant_id`) REFERENCES `user` (`id`),
  CONSTRAINT `evaluation_ibfk_4` FOREIGN KEY (`evaluation_resultat_id`) REFERENCES `evaluation_resultat` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation`
--

LOCK TABLES `evaluation` WRITE;
/*!40000 ALTER TABLE `evaluation` DISABLE KEYS */;
INSERT INTO `evaluation` VALUES (1,'2024-10-01 13:35:41','2024-10-17 12:59:34',25,4,1,'Très bon travail !'),(4,'2024-10-01 13:35:41','2024-10-22 09:08:59',25,21,1,'Très bon travail.'),(8,'2024-10-01 13:35:41','2024-10-23 08:09:25',25,24,1,'Bravo Jane !'),(10,'2024-10-01 13:35:41','2024-10-02 12:38:08',25,25,3,NULL),(13,'2024-10-02 14:38:49','2024-10-02 14:38:49',26,45,1,NULL),(16,'2024-10-03 09:07:16','2024-10-03 09:07:16',26,47,2,NULL),(18,'2024-10-14 12:27:54','2024-10-14 12:27:54',28,4,1,'Progrès impressionnant, bravo !'),(35,'2024-10-15 09:40:05','2024-10-23 07:33:13',25,46,3,'De gros progrès à faire'),(37,'2024-10-15 12:16:11','2024-10-15 12:16:11',28,49,2,'Peut faire beaucoup mieux'),(60,'2024-10-17 08:45:04','2024-10-22 09:07:39',25,53,2,'Peut faire beaucoup mieux en étant plus rigoureux.'),(68,'2024-10-18 07:52:47','2024-10-18 07:52:47',27,4,1,'Très bon niveau sur ce module ! '),(71,'2024-10-21 14:03:21','2024-10-21 14:03:21',2,56,1,'Bravo Élise'),(84,'2024-10-22 09:00:34','2024-10-22 09:00:57',25,52,1,'De très bons résultats'),(85,'2024-10-22 09:07:17','2024-10-22 09:07:17',25,45,1,''),(86,'2024-10-22 09:07:26','2024-10-22 09:07:26',25,51,1,'');
/*!40000 ALTER TABLE `evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation_resultat`
--

DROP TABLE IF EXISTS `evaluation_resultat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation_resultat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation_resultat`
--

LOCK TABLES `evaluation_resultat` WRITE;
/*!40000 ALTER TABLE `evaluation_resultat` DISABLE KEYS */;
INSERT INTO `evaluation_resultat` VALUES (1,'Acquis'),(2,'En cours d’acquisition'),(3,'Non acquis');
/*!40000 ALTER TABLE `evaluation_resultat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation_type`
--

DROP TABLE IF EXISTS `evaluation_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation_type`
--

LOCK TABLES `evaluation_type` WRITE;
/*!40000 ALTER TABLE `evaluation_type` DISABLE KEYS */;
INSERT INTO `evaluation_type` VALUES (1,'QCM'),(2,'Questions à l’oral'),(3,'Exercice pratique'),(4,'Autre');
/*!40000 ALTER TABLE `evaluation_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formation`
--

DROP TABLE IF EXISTS `formation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `promo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formation`
--

LOCK TABLES `formation` WRITE;
/*!40000 ALTER TABLE `formation` DISABLE KEYS */;
INSERT INTO `formation` VALUES (1,'Assistant Ressources Humaines',NULL),(2,'Concepteur Développeur d’Applications','Première année'),(3,'Architecte Web',NULL),(4,'Concepteur Développeur d’Applications','Deuxième année');
/*!40000 ALTER TABLE `formation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formation_module`
--

DROP TABLE IF EXISTS `formation_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formation_module` (
  `formation_id` int(11) DEFAULT NULL,
  `module_id` int(11) DEFAULT NULL,
  KEY `formation_id` (`formation_id`),
  KEY `module_id` (`module_id`),
  CONSTRAINT `formation_module_ibfk_1` FOREIGN KEY (`formation_id`) REFERENCES `formation` (`id`),
  CONSTRAINT `formation_module_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formation_module`
--

LOCK TABLES `formation_module` WRITE;
/*!40000 ALTER TABLE `formation_module` DISABLE KEYS */;
INSERT INTO `formation_module` VALUES (1,1),(1,2),(1,3),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(1,22),(2,25),(2,26),(2,27),(2,28),(2,29),(2,30),(2,31),(2,34),(3,41),(3,42),(3,43),(3,44),(3,45),(3,46),(3,47),(3,48),(3,49),(3,50),(3,51),(3,52),(3,54),(3,55),(3,56),(3,57),(1,4),(2,95),(2,96),(2,97),(4,98),(3,40),(4,34),(4,35),(4,36),(4,37),(4,98),(4,99),(4,100);
/*!40000 ALTER TABLE `formation_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `formateur_id` int(11) DEFAULT NULL,
  `commentary` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`formateur_id`),
  CONSTRAINT `module_ibfk_1` FOREIGN KEY (`formateur_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (
  1,'La production de documents','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),
(2,'DOCS','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),
(3,'SHEET','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),
(4,'SLIDES','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),
(5,'Environnement entreprise et RH','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),
(6,'Gestion, organisation et planification','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),
(7,'Collecte de l’information','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),
(8,'Droit du travail','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),
(9,'Initiation au développement','2024-10-01 12:40:29','2024-09-30 07:53:56',34,NULL),
(10,'Droit informatique','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),
(11,'Informations chiffrées de gestion','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),(12,'Obligations légales','2024-10-01 12:40:29','2024-09-30 07:53:56',NULL,NULL),(13,'Rémunération','2024-10-01 12:40:29','2024-09-30 07:53:56',NULL,NULL),(14,'Rémunération spécifique profils IT','2024-10-01 12:40:29','2024-09-30 07:53:56',NULL,NULL),(15,'Charges et déclarations sociales','2024-10-01 12:40:29','2024-09-30 07:53:56',NULL,NULL),(16,'Rupture de contrat','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),(17,'Recrutement','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),(18,'Réseaux sociaux et sourcing','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),(19,'GEPP','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),(20,'Ingénierie de la formation','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),(21,'Management','2024-10-01 12:40:29','2024-09-30 07:53:56',NULL,NULL),(22,'Communication','2024-10-01 12:40:29','2024-09-30 07:53:56',26,NULL),(25,'Javascript/Typescript','2024-10-01 12:40:29','2024-09-30 08:02:56',35,NULL),(26,'Les bases du langage Java','2024-10-01 12:40:29','2024-09-30 08:02:56',35,NULL),(27,'Front Vue.JS','2024-10-01 12:40:29','2024-09-30 08:02:56',35,NULL),(28,'Devops','2024-10-01 12:40:29','2024-09-30 08:02:56',NULL,NULL),(29,'Qualité logicielle','2024-10-01 12:40:29','2024-09-30 08:02:56',NULL,NULL),(30,'Anglais','2024-10-01 12:40:29','2024-09-30 08:02:56',38,NULL),(31,'Base de données','2024-10-01 12:40:29','2024-09-30 08:02:56',35,NULL),(34,'Mobile Bootcamp','2024-10-01 12:40:29','2024-09-30 08:02:56',34,NULL),(35,'Projet Mobile','2024-10-01 12:40:29','2024-09-30 08:02:56',34,NULL),(36,'Conception avancée','2024-10-01 12:40:29','2024-09-30 08:02:56',61,NULL),(37,'Sécurité','2024-10-01 12:40:29','2024-09-30 08:02:56',NULL,NULL),(40,'Modélisation UML - BPMN','2024-10-01 12:40:29','2024-09-30 08:46:07',40,NULL),(41,'Veille concurrentielle, technologique et réglementaire','2024-10-01 12:40:29','2024-09-30 08:46:07',40,NULL),(42,'Admin système et réseaux','2024-10-01 12:40:29','2024-09-30 08:46:07',39,NULL),(43,'Gestion de projet Agile et DevOps','2024-10-01 12:40:29','2024-09-30 08:46:07',41,NULL),(44,'GRH, Digital Profil et RSE','2024-10-01 12:40:29','2024-09-30 08:46:07',43,NULL),(45,'Accessibilité web','2024-10-01 12:40:29','2024-09-30 08:46:07',43,NULL),(46,'Maitrise de la conduite de projet : Analyse, Management, Méthodologie','2024-10-01 12:40:29','2024-09-30 08:46:07',41,NULL),(47,'Virtualisation et containerisation avec Docker','2024-10-01 12:40:29','2024-09-30 08:46:07',44,NULL),(48,'DevOps - Automatisation système CI/ Monitoring','2024-10-01 12:40:29','2024-09-30 08:46:07',40,NULL),(49,'Stratégies de référencement (SEO, SEA, SMO)','2024-10-01 12:40:29','2024-09-30 08:46:07',43,NULL),(50,'Data Marketing et Analytics','2024-10-01 12:40:29','2024-09-30 08:46:07',43,NULL),(51,'UX Design : processus, recherches utilisateurs et prototypage','2024-10-01 12:40:29','2024-09-30 08:46:07',43,NULL),(52,'MongoDB - Mise en oeuvre d\'une base de données NoSQL','2024-10-01 12:40:29','2024-09-30 08:46:07',57,NULL),(54,'Ansible - Kubernetes','2024-10-01 12:40:29','2024-09-30 08:46:07',44,NULL),(55,'Développement GO','2024-10-01 12:40:29','2024-09-30 08:46:07',58,NULL),(56,'DevOps - Initialisation intégration système','2024-10-01 12:40:29','2024-09-30 08:46:07',40,NULL),(57,'UX design : conception identité de marque & interface gratuit ','2024-10-01 12:40:29','2024-09-30 08:46:07',43,NULL),(95,'API rest spring boot','2024-10-09 08:22:37','2024-10-09 08:22:37',36,NULL),(96,'Gestion projet technique communication','2024-10-09 08:22:49','2024-10-09 08:22:49',NULL,NULL),(97,'Projet fil rouge','2024-10-09 08:24:32','2024-10-09 08:24:32',59,NULL),(98,'Anglais','2024-10-09 08:38:03','2024-10-09 08:38:03',38,NULL),(99,'UX Design','2024-10-01 12:40:29','2024-09-30 08:02:56',NULL,NULL),(100,'Projet fil rouge','2024-10-01 12:40:29','2024-09-30 08:02:56',NULL,NULL);
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module_evaluation_type`
--

DROP TABLE IF EXISTS `module_evaluation_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module_evaluation_type` (
  `module_id` int(11) NOT NULL,
  `evaluation_type_id` int(11) NOT NULL,
  KEY `module_id` (`module_id`),
  KEY `evaluation_type_id` (`evaluation_type_id`),
  CONSTRAINT `module_evaluation_type_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`),
  CONSTRAINT `module_evaluation_type_ibfk_2` FOREIGN KEY (`evaluation_type_id`) REFERENCES `evaluation_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module_evaluation_type`
--

LOCK TABLES `module_evaluation_type` WRITE;
/*!40000 ALTER TABLE `module_evaluation_type` DISABLE KEYS */;
INSERT INTO `module_evaluation_type` VALUES (26,3),(26,4),(28,1),(25,1),(28,4);
/*!40000 ALTER TABLE `module_evaluation_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsables_formation`
--

DROP TABLE IF EXISTS `responsables_formation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsables_formation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `responsable_id` int(11) DEFAULT NULL,
  `formation_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsables_formation`
--

LOCK TABLES `responsables_formation` WRITE;
/*!40000 ALTER TABLE `responsables_formation` DISABLE KEYS */;
INSERT INTO `responsables_formation` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,1),(5,2,2),(6,2,3);
/*!40000 ALTER TABLE `responsables_formation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Apprenant'),(2,'Formateur'),(3,'Admin');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `promo` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role_id` int(11) DEFAULT NULL,
  `company` varchar(50) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `resetPasswordToken` (`resetPasswordToken`),
  UNIQUE KEY `password` (`password`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Flore','Wicart','flore.wicart@gmail.com','1990-01-01','2025','2025-07-23 22:00:00','2024-10-11 09:10:31',3,'Foreach',NULL,NULL,NULL),(2,'Laury','Bossaert','laury. bossaert@gmail.com','1990-01-01','2025','2025-07-23 22:00:00','2024-10-11 09:10:31',3,'Foreach',NULL,NULL,NULL),(4,'Paul','Langevin','paul.langevin@gmail.com','1990-01-01','2025','2025-07-23 22:00:00','2024-10-11 09:10:31',1,'Foreach',NULL,NULL,NULL),(19,'Sophie','Martin','sophie.martin@example.com','1990-01-01','2027','2024-09-24 07:07:36','2024-10-15 08:14:46',3,'Foreach','$2b$10$NvEEr7hR/ZTA8CvhaLUFX.QL/QS6gsNrFqtMF3lmq3W/.gcaZygjm','7cab52cc62c7080b1f06f184fcb79e3a1be2a65efc2da122be2de3f4043d51ef','2024-10-15 11:14:46'),(21,'Jean','Dupont','jean.dupont@example.com','1990-01-01','2027','2024-09-24 08:00:24','2024-10-14 13:36:15',1,'Foreach',NULL,'726080ce0e297748555e62efd42cfad760d4fc500a2ac860d296f62eb5e16e88','2024-10-14 16:36:15'),(24,'Jane','Doe','jane.doe@example.com','1990-01-01','2024','2024-09-25 08:09:48','2024-10-11 09:10:31',1,'Bonduelle',NULL,NULL,NULL),(25,'Eric','Lapierre','eric.lapierre@example.com','1990-01-01','2024','2024-09-25 08:10:43','2024-10-14 08:17:44',1,'Bonduelle',NULL,'cd9b2e82c3c1108aa43453e2c6387aa055a5b2749cee59c16c23faa3558911dd','2024-10-14 11:17:44'),(26,'Mathilde','Decoster','mathilde.decoster@example.com','1990-01-01','2024','2024-09-30 08:52:17','2024-10-11 13:33:09',2,'','$2b$10$egLX5sSb/XauY42HLDiqqOuzwMOV9KYcHyVhzqs17psOar3abLoSK',NULL,NULL),(33,'Orlane','Vanderbecq','email1@example.com','1990-01-01','2024','2024-09-30 09:12:55','2024-10-11 09:10:31',2,'Hexagone-IT',NULL,NULL,NULL),(34,'Noémie','Contant','email2@example.com','1990-01-01','2024','2024-09-30 09:12:55','2024-10-11 09:10:31',2,'Symbol-IT',NULL,NULL,NULL),(35,'Pierre','Stawikowski','pierre.stawikowski@example.com','1990-01-01','2024','2024-09-30 09:21:36','2024-10-11 09:10:31',2,'FC DIGITAL','$2b$10$lBlKa/UPnbdQ2qVLrNJ.6.R.TRwrbyzNO4WDyagIE5QEr1fJbKwXq',NULL,NULL),(36,'Théo','Bialasik','email4@example.com','1990-01-01','2024','2024-09-30 09:21:36','2024-10-11 09:10:31',2,'FC DIGITAL',NULL,NULL,NULL),(37,'Yoann','Vasseur','email5@example.com','1990-01-01','2024','2024-09-30 09:21:36','2024-10-11 09:10:31',2,'',NULL,NULL,NULL),(38,'Samira','Dahmani','email6@example.com','1990-01-01','2024','2024-09-30 09:21:36','2024-10-11 09:10:31',2,'',NULL,NULL,NULL),(39,'Frédéric','Gillard','email7@example.com','1990-01-01','2024','2024-09-30 09:21:36','2024-10-11 09:10:31',2,'FC DIGITAL',NULL,NULL,NULL),(40,'François','Salmon','email8@example.com','1990-01-01','2024','2024-09-30 09:36:41','2024-10-11 09:10:31',2,'',NULL,NULL,NULL),(41,'Luigi','Menez','email9@example.com','1990-01-01','2024','2024-09-30 09:36:41','2024-10-11 09:10:31',2,'',NULL,NULL,NULL),(42,'Lindsay','Chansin','email10@example.com','1990-01-01','2024','2024-09-30 09:36:41','2024-10-11 09:10:31',2,'',NULL,NULL,NULL),(43,'Karinesse','Hammouma','email11@example.com','1990-01-01','2024','2024-09-30 09:36:41','2024-10-11 09:10:31',2,'',NULL,NULL,NULL),(44,'Léo','Dugaugez','email12@example.com','1990-01-01','2024','2024-09-30 09:36:41','2024-10-11 09:10:31',2,'',NULL,NULL,NULL),(45,'Jane','Doe','janedoe@gmail.com','1990-01-01','2024','2024-10-01 11:38:36','2024-10-14 14:00:11',1,'Bonduelle',NULL,'a9f58090b54635ea77adfe0c30b89c1453442b5a7df6e1dafbd968fc2aaeb81f','2024-10-14 17:00:11'),(46,'Julie','Dupont','julie.dupont@gmail.com','1990-01-01','2024','2024-10-01 14:12:47','2024-10-11 09:10:31',1,'Capgemini',NULL,NULL,NULL),(47,'John','Doe','john.doe@example.com','1990-01-01','2025','2024-10-03 08:56:19','2024-10-11 09:10:31',1,'TechCorp',NULL,NULL,NULL),(48,'Jane','Smith','jane.smith@example.com','1990-01-01','2026','2024-10-03 08:56:19','2024-10-11 09:10:31',1,'InnoSoft',NULL,NULL,NULL),(49,'Alice','Brown','alice.brown@example.com','1990-01-01','2024','2024-10-03 08:56:19','2024-10-11 09:10:31',1,'DevSolutions',NULL,NULL,NULL),(50,'Bob','Johnson','bob.johnson@example.com','1990-01-01','2023','2024-10-03 08:56:19','2024-10-11 09:10:31',1,'CodeFactory',NULL,NULL,NULL),(51,'Charlie','Wilson','charlie.wilson@example.com','1990-01-01','2022','2024-10-03 08:56:19','2024-10-11 09:10:31',1,'WebDevCo',NULL,NULL,NULL),(52,'Diana','Evans','diana.evans@example.com','1990-01-01','2025','2024-10-03 08:56:19','2024-10-11 09:10:31',1,'SoftInnov',NULL,NULL,NULL),(53,'Ethan','Clark','ethan.clark@example.com','1990-01-01','2023','2024-10-03 08:56:19','2024-10-11 09:10:31',1,'NextGenTech',NULL,NULL,NULL),(54,'Fiona','Taylor','fiona.taylor@example.com','1990-01-01','2026','2024-10-03 08:56:19','2024-10-11 09:10:31',1,'AlphaTech',NULL,NULL,NULL),(55,'George','Harris','george.harris@example.com','1990-01-01','2024','2024-10-03 08:56:19','2024-10-11 09:10:31',1,'CodeBusters',NULL,NULL,NULL),(56,'Élise','White','hannah.white@example.com','1990-01-01','2022','2024-10-03 08:56:19','2024-10-11 09:10:31',1,'DevMasters',NULL,NULL,NULL),(57,'Romain','vasseur','email13@example.com','1990-01-01','2024','2024-10-08 13:50:42','2024-10-11 09:10:31',2,'',NULL,NULL,NULL),(58,'Gaël','Baldous','email14@example.com','1990-01-01','2024','2024-10-08 13:56:13','2024-10-11 09:10:31',2,'',NULL,NULL,NULL),(59,'Hélène','Lessieux','email15@example.com','1990-01-01','2024','2024-10-09 08:23:43','2024-10-11 09:10:31',2,'',NULL,NULL,NULL),(60,'Anaïs','Lutin','email16@example.com','1990-01-01','2024','2024-10-09 08:24:02','2024-10-11 09:10:31',2,'',NULL,NULL,NULL),(61,'Laurent','Planque','email17@example.com','1990-01-01','2024','2024-10-10 08:25:42','2024-10-11 09:10:31',2,'',NULL,NULL,NULL),(62,'Marie','Potte','marie.potte.62@gmail.com','1990-01-01','2024','2024-10-10 15:08:47','2024-10-11 13:06:53',3,'Nom de l\'entreprise','$2b$10$//ggJKk7/33/xgxfLU5UNew03wQhtiHB.ny2K6DPy0JcA9NvjcrLG','e87e0c6b936b6858820dc3cde3cdbbc890d4277cd77b8534eddda2fd60b95f35','2024-10-11 16:06:53');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'livret'
--

--
-- Dumping routines for database 'livret'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-24 10:12:39
