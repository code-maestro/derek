
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `farma_2022`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`derek_2022`@`%` PROCEDURE `calculate_total` (IN `p1` INT, IN `p2` INT, IN `p3` INT, IN `p4` INT, OUT `total` INT)   BEGIN

SET total = p1 + p2 + p3 + p4;

SELECT total;

END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `farma_create_schedule` (IN `tt_id` VARCHAR(64), IN `quantity` INT, IN `start_dt` DATE, IN `cycle` INT, IN `peroid` INT, IN `qty_per_cycle` INT, OUT `total` INT)   BEGIN

DECLARE quantity_in_db INT;
DECLARE effective_dt DATE;

SET @schedule_id = UUID_SHORT();
SET effective_dt = start_dt;

SET quantity_in_db = (SELECT (quantity*quantity_measure) FROM feeds WHERE farma_id = 'fea8d3cf-d829-4d45-8c89-eb177672e7e9' AND id = 1);

IF quantity_in_db > quantity THEN

    SET total = 0;

    WHILE quantity > 0 DO

				INSERT INTO feeding_schedule ( feeding_tt_id, effective_date, next_date, feeds_quantity, feeds_qnty_pending, schedule_id)
				VALUES (tt_id, '2023-03-04', DATE_ADD(effective_dt, INTERVAL peroid DAY), quantity, quantity, @schedule_id );
 
        SET quantity = (quantity - (qty_per_cycle*1000));

				SET effective_dt = DATE_ADD(effective_dt, INTERVAL peroid DAY);
    END WHILE;

ELSE

    SET total = 1;

END IF;

END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `farma_registration` (IN `f_id` VARCHAR(120), IN `fname` VARCHAR(100), IN `lname` VARCHAR(100), IN `mail` VARCHAR(50), IN `pwd` VARCHAR(200))   BEGIN

	INSERT INTO farma (farma_id, first_name, last_name, mail, password	) 
	VALUES (f_id, fname, lname, mail, TO_BASE64(AES_ENCRYPT(pwd, f_id)));

	INSERT INTO animals_at_farm (farma_id) VALUES (f_id);
	
END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `feedingTimetable` (IN `ID` VARCHAR(120), IN `ANIMAL_TYPE` VARCHAR(20))   BEGIN

	SET @feeds_id = (SELECT A.id FROM feeds A, feeding_timetable B WHERE B.feeds_id = A.id AND A.farma_id = ID AND  A.animal_type = ANIMAL_TYPE);
	SET @total_qnty = (SELECT A.quantity*A.quantity_measure FROM feeds A, feeding_timetable B WHERE A.farma_id = ID AND A.id = B.feeds_id);
	SET @tt_id = (SELECT id FROM feeding_timetable WHERE feeds_id = @feeds_id);
	SET @qnty_per = (SELECT quantity_per_cycle*quantity_per_cycle_unit FROM feeding_timetable WHERE feeds_id = @feeds_id);
	SET @feeding_freq = (SELECT cycle FROM feeding_timetable WHERE feeds_id = @feeds_id);
	SET @feeding_times = (SELECT period FROM feeding_timetable WHERE feeds_id = @feeds_id);
	SET @period_planned = (SELECT planned_period FROM feeding_timetable WHERE feeds_id = @feeds_id);
	SET @period_planned_time = (SELECT planned_period_time FROM feeding_timetable WHERE feeds_id = @feeds_id);
	SET @first_feed_date = (SELECT first_feed_date FROM feeding_timetable WHERE feeds_id = @feeds_id);

  	loop2: LOOP

    	SET @total_qnty = @total_qnty - @qnty_per;

		INSERT feeding_schedule (feeding_tt_id, effective_date, next_date, feeds_qnty_pending)
		VALUES (@tt_id, IFNULL(@first_feed_date, NOW()), DATE_ADD(@first_feed_date, INTERVAL @feeding_times DAY), @qnty);

    IF @total_qnty = 0 THEN

    	LEAVE loop2;

    END IF;

 END LOOP loop2;

END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `findAll` ()   BEGIN
    SELECT * FROM vets;
    SELECT * FROM animal LIMIT 10;
END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `GetAll` ()  DETERMINISTIC BEGIN
    SELECT 
		*
    FROM vets;
    
    SELECT 
		animal_tag
    FROM animal
    WHERE id = 43;
    
END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `getCount` (IN `farmaID` VARCHAR(120), IN `animalType` VARCHAR(20))   BEGIN
	SELECT COUNT(id) AS COUNT 
    	FROM animal 
			WHERE animal_type= animalType
        	AND farma_id= farmaID;
    SELECT COUNT(A.id) as COUNT 
    	FROM animal A, treatment_history B 
        	WHERE A.id = B.animal_id 
        	AND A.animal_type= animalType 
        	AND A.animal_tag = B.animal_tag
        	AND A.farma_id= farmaID;
	SELECT COUNT(parent_tag) as COUNT 
        FROM animal 
        	WHERE farma_id =  farmaID 
        	AND animal_type= animalType;
	SELECT COUNT(B.id) as COUNT 
    	FROM animal A, due_dates B 
			WHERE A.id = B.animal_id 
        	AND A.animal_type =  animalType 
			AND A.farma_id= farmaID 
			AND B.vaccination_date IS NOT NULL 
			AND B.vaccination_date < CURDATE();
	SELECT COUNT(*) as COUNT 
    	FROM animal A, due_dates B 
        	WHERE A.id = B.animal_id 
        	AND A.animal_type= animalType 
        	AND A.farma_id = B.farma_id 
        	AND B.farma_id= farmaID;
	SELECT COUNT(B.vaccination_date) AS COUNT 
    	FROM animal A, due_dates B 
        	WHERE A.animal_type= animalType 
        	AND A.farma_id = B.farma_id 
        	AND B.farma_id = farmaID 
        	AND B.vaccination_date IS NOT NULL;
	SELECT COUNT(*) as COUNT 
    	FROM feeds 
    		WHERE animal_type= animalType 
    		AND farma_id= farmaID;
	SELECT COUNT(B.id) as COUNT 
    	FROM animal A, products B 
    		WHERE B.animal_id = A.id 
    		AND A.farma_id =  farmaID
    		AND A.animal_type= animalType;
    
END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `GetData` ()   BEGIN
    SELECT * FROM vets;
    SELECT * FROM animal LIMIT 10;
END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `insert_new_record` (IN `var` INT)   BEGIN
    DECLARE temp INT;
    SET temp = var;
    WHILE temp > 0 DO
         INSERT INTO disease (disease_name, genre_id, animal_type) 
        VALUES ("ss", 12, 'ss');
        SET temp = temp - 1;
    END WHILE;
END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `procesDates` (IN `dates` VARCHAR(50), IN `animal_kind` VARCHAR(50), IN `the_id` INT, IN `the_date` DATE, IN `animal_type` VARCHAR(25), IN `animal_id` INT)   BEGIN

	INSERT INTO first_dates (dates, animal_kind, the_id)
	VALUES (the_date, animal_type, animal_id );

END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `recordSick` (IN `animalID` INT, IN `reportedDate` DATE, IN `vetID` VARCHAR(100), IN `appointmentDate` DATETIME, IN `diseaseID` INT, IN `symptomName` VARCHAR(200))   BEGIN

	INSERT INTO sick_animals 
	(animal_id,disease_id,reported_date,vet_id,appointment_date) 
	VALUES 
	( animalID, diseaseID, reportedDate, vetID, appointmentDate );
	
	INSERT INTO symptom 
	(disease, symptom_name, description) 
	VALUES 
	( diseaseID, symptomName, symptomName);
    
END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `register_farma` (IN `f_id` VARCHAR(120), IN `mail` VARCHAR(50), IN `pwd` VARCHAR(200))   BEGIN

	INSERT INTO farma (farma_id, mail, password	) 
	VALUES (f_id, mail, TO_BASE64(AES_ENCRYPT(pwd, f_id)));

	INSERT INTO animals_at_farm (farma_id) VALUES (f_id);
	
END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `reschedule` (IN `quantity` INT, OUT `total` INT)   BEGIN

DECLARE quantity_in_db INT;

SET quantity_in_db = (SELECT (quantity*quantity_measure) FROM feeds WHERE farma_id = 'fea8d3cf-d829-4d45-8c89-eb177672e7e9' AND id = 1);

IF quantity_in_db > quantity THEN

    SET total = 0;

    WHILE quantity > 0 DO

INSERT INTO disease (disease_name,
genre_id,
animal_type)
VALUES (quantity, 4, quantity);

        SET quantity = (quantity - 1000);

    END WHILE;

ELSE

    SET total = 1;

END IF;

END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `tat` (IN `FID` VARCHAR(120), IN `ANIMAL_TYPE` VARCHAR(20), IN `TT_NAME` VARCHAR(50))   BEGIN

		SET @feeds_id = (SELECT A.id FROM feeds A, feeding_timetable B WHERE B.feeds_id = A.id AND A.farma_id = FID AND A.animal_type = ANIMAL_TYPE);
		SET @total_qnty = (SELECT A.quantity*A.quantity_measure FROM feeds A, feeding_timetable B WHERE A.farma_id = FID AND A.id = B.feeds_id);
		SET @tt_id = (SELECT id FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @qnty_per = (SELECT quantity_per_cycle*quantity_per_cycle_unit FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @feeding_freq = (SELECT cycle FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @feeding_times = (SELECT period FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @period_planned = (SELECT planned_period FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @period_planned_time = (SELECT planned_period_time FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @first_feed_date = (SELECT first_feed_date FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @next_feed_date = (SELECT next_feed_date FROM feeding_timetable WHERE feeds_id = @feeds_id );

		WHILE @total_qnty >= 0 DO

			INSERT INTO feeding_schedule 
			(feeding_tt_id, tt_name, effective_date, next_date, pending, feeds_qnty_pending)
			VALUES
			(UUID(), TT_NAME, @first_feed_date, @next_feed_date, @qnty_per, @total_qnty);


			SET @total_qnty = @total_qnty - @qnty_per;

			SET @first_feed_date = DATE_ADD(@first_feed_date, INTERVAL @feeding_freq DAY);
			
			SET @next_feed_date = TIMESTAMPADD(DAY, @feeding_freq, @next_feed_date);

		END WHILE;

	END$$

CREATE DEFINER=`derek_2022`@`%` PROCEDURE `update_sick` (IN `animalID` INT, IN `reportedDate` DATE, IN `vetID` VARCHAR(100), IN `appointmentDate` VARCHAR(50), IN `diseaseID` INT, IN `symptomName` VARCHAR(200))   BEGIN

	UPDATE sick_animals
	SET disease_id = diseaseID,
	reported_date = reportedDate,
	vet_id = vetID,
	appointment_date = CONVERT(appointmentDate, DATETIME)
	WHERE animal_id = animalID;
	
	UPDATE symptom
	SET symptom_name = symptomName
	WHERE disease = diseaseID;
    
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `animal`
--

CREATE TABLE `animal` (
  `id` int NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `animal_tag` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `parent_tag` varchar(20) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `reg_date` date DEFAULT NULL,
  `animal_type` varchar(20) DEFAULT NULL,
  `farma_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `animal`
--

INSERT INTO `animal` (`id`, `created_date`, `animal_tag`, `parent_tag`, `gender`, `dob`, `reg_date`, `animal_type`, `farma_id`) VALUES
(1, '2022-08-25 09:24:14', 'COW-0001', NULL, 'Male', '2019-03-09', '2020-03-09', 'cow', 'b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),
(8, '2022-08-25 14:30:01', 'RABBIT-0002', NULL, 'Male', '2014-03-09', '2020-03-09', 'rabbit', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(9, '2022-08-25 14:30:01', 'SHEEP-0001', NULL, 'Male', '2013-03-09', '2020-03-09', 'sheep', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(10, '2022-08-25 14:30:01', 'GOAT-0001', NULL, 'Female', '2012-03-09', '2020-03-09', 'goat', 'b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),
(11, '2022-08-25 14:30:01', 'COW-0003', NULL, 'Male', '2012-03-09', '2020-03-09', 'cow', 'b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),
(12, '2022-08-25 14:30:01', 'RABBIT-0001', NULL, 'Female', '2012-03-09', '2020-03-09', 'rabbit', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(13, '2022-08-25 14:30:01', 'COW-0005', NULL, 'Male', '2014-03-09', '2020-03-09', 'cow', 'b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),
(14, '2022-08-25 14:30:01', 'SHEEP-0002', NULL, 'Female', '2019-03-09', '2020-03-09', 'sheep', 'b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),
(15, '2022-08-25 14:30:01', 'PIG-0001', NULL, 'Female', '2022-03-09', '2020-03-09', 'pig', 'b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),
(16, '2022-08-25 14:30:01', 'PIG-0002', NULL, 'Female', '2012-03-09', '2020-03-09', 'pig', 'b6d1f6f3-b48a-4771-84eb-ad1dad3edce8'),
(17, '2022-08-25 14:30:01', 'PIG-0001', NULL, 'Female', '2010-03-09', '2020-03-09', 'pig', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(43, '2022-08-28 20:45:45', 'COW-00043', NULL, 'Male', '2021-02-09', '2019-03-07', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(44, '2022-08-28 20:57:57', 'COW-00040', NULL, 'Male', '2012-01-30', '2019-03-08', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(48, '2022-08-28 20:58:32', 'COW-0048', NULL, 'Male', '2012-01-30', '2019-03-08', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(52, '2022-08-30 12:20:49', 'COW-00049', NULL, 'Female', '2022-08-11', '2022-08-09', 'null', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(53, '2022-08-30 12:29:35', 'COW-00040', NULL, 'Female', '2022-07-02', '2019-03-06', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(54, '2022-09-08 16:11:02', 'COW-00054', NULL, 'Female', '2020-02-05', '2022-09-08', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(56, '2022-09-09 06:53:37', 'GOAT-00056', NULL, 'Male', '2022-09-07', '2022-09-08', 'goat', '570901e2-6efd-4fb2-b4af-1ccd4d364d3e'),
(57, '2022-09-09 06:54:08', 'GOAT-00057', NULL, 'Female', '2022-08-04', '2022-09-01', 'goat', '570901e2-6efd-4fb2-b4af-1ccd4d364d3e'),
(58, '2022-09-09 06:54:37', 'GOAT-00058', NULL, 'Female', '2021-04-07', '2022-04-06', 'goat', '570901e2-6efd-4fb2-b4af-1ccd4d364d3e'),
(62, '2022-10-08 13:55:57', 'COW-00055', NULL, 'Female', '2022-10-04', '2022-10-04', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(66, '2022-10-13 14:31:05', 'COW-00065', NULL, 'Female', '2022-10-12', '2022-10-13', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(67, '2022-10-15 08:10:05', 'COW-00067', NULL, 'Male', '2022-10-13', '2022-10-26', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(69, '2022-10-17 12:03:04', 'COW-00068', NULL, 'Male', '2022-10-22', '2022-09-30', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(70, '2022-10-17 17:01:18', 'COW-00070', NULL, 'Male', '2022-10-14', '2022-10-19', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(71, '2022-10-17 18:19:34', 'COW-00071', NULL, 'Female', '2022-10-01', '2022-10-01', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(72, '2022-10-17 20:24:19', 'COW-00072', NULL, 'Male', '2022-10-13', '2022-10-06', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(73, '2023-01-25 16:31:15', 'RABBIT-00013', NULL, 'Male', '2022-12-30', '2022-12-30', 'rabbit', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(74, '2023-01-25 16:31:46', 'RABBIT-00074', NULL, 'Male', '2019-12-31', '2023-01-26', 'rabbit', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9');

--
-- Triggers `animal`
--
DELIMITER $$
CREATE TRIGGER `animal_update` BEFORE UPDATE ON `animal` FOR EACH ROW BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.animal_tag, "'s data been updated by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_animal_delete` BEFORE DELETE ON `animal` FOR EACH ROW BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), OLD.farma_id, CONCAT(OLD.animal_tag, " has been deleted by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = OLD.farma_id)));

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `animals_at_farm`
--

CREATE TABLE `animals_at_farm` (
  `id` int NOT NULL,
  `list_of_animals` json DEFAULT NULL,
  `farma_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `animals_at_farm`
--

INSERT INTO `animals_at_farm` (`id`, `list_of_animals`, `farma_id`) VALUES
(30, '[{\"name\": \"cow\", \"image_url\": \"http://localhost:4200/images/C.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:4200/images/pig.webp\"}]', 'bcd6dc2d-ceae-429d-aac6-c71aa5e2cda5'),
(39, '[{\"name\": \"goat\", \"image_url\": \"http://localhost:4200/images/goat.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:4200/images/sheep.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:4200/images/pig.webp\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:4200/images/bunny.jpg\"}, {\"name\": \"cow\", \"image_url\": \"http://localhost:4200/images/C.jpg\"}, {\"desc\": \"23\", \"name\": \"geese\", \"image_url\": \"http://localhost:4200/images/1660980548807.png\"}, {\"desc\": \"werqerqwrqwerqwerq\", \"name\": \"dog\", \"image_url\": \"http://localhost:4200/images/1662654544149.png\"}, {\"desc\": \"lorem\", \"name\": \"foldes\", \"image_url\": \"http://localhost:4200/images/1662655630173.png\"}]', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(40, NULL, '9b111b16-91ed-4119-9e43-7d8791dd45dd'),
(41, '[{\"name\": \"cow\", \"image_url\": \"http://localhost:4200/images/C.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:4200/images/sheep.jpg\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:4200/images/bunny.jpg\"}]', '9173f6d8-e9c0-4c7d-8473-b506e0cc258e'),
(42, '[{\"name\": \"goat\", \"image_url\": \"http://localhost:4200/images/goat.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:4200/images/pig.webp\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:4200/images/sheep.jpg\"}]', '1a47b7eb-d733-432a-a56f-26cb616a6d42'),
(43, '[{\"name\": \"goat\", \"image_url\": \"http://localhost:4200/images/goat.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:4200/images/pig.webp\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:4200/images/bunny.jpg\"}, {\"desc\": \"Green and slithers in the grass\", \"name\": \"Snake\", \"image_url\": \"http://localhost:4200/images/1662706994183.png\"}]', '570901e2-6efd-4fb2-b4af-1ccd4d364d3e'),
(44, NULL, '03931a4e-41bf-4929-8b91-392285ebb42f'),
(45, NULL, '23513d85-4195-48ef-8a41-43949739bc50'),
(46, '[{\"name\": \"goat\", \"image_url\": \"http://localhost:4200/images/goat.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:4200/images/pig.webp\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:4200/images/bunny.jpg\"}, {\"name\": \"cow\", \"image_url\": \"http://localhost:4200/images/C.jpg\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:4200/images/bunny.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:4200/images/pig.webp\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:4200/images/sheep.jpg\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:4200/images/bunny.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:4200/images/pig.webp\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:4200/images/pig.webp\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:4200/images/pig.webp\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:4200/images/sheep.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:4200/images/sheep.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:4200/images/sheep.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:4200/images/sheep.jpg\"}, {\"name\": \"sheep\", \"image_url\": \"http://localhost:4200/images/sheep.jpg\"}, {\"name\": \"cow\", \"image_url\": \"http://localhost:4200/images/C.jpg\"}, {\"name\": \"pig\", \"image_url\": \"http://localhost:4200/images/pig.webp\"}, {\"name\": \"rabbit\", \"image_url\": \"http://localhost:4200/images/bunny.jpg\"}]', 'd0d85e78-02a0-4ddf-a32e-4c1ad7ebf87c');

-- --------------------------------------------------------

--
-- Table structure for table `audit_trail`
--

CREATE TABLE `audit_trail` (
  `id` int NOT NULL,
  `uuid` varchar(100) DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `action_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `audit_trail`
--

INSERT INTO `audit_trail` (`id`, `uuid`, `user_id`, `action`, `action_date`) VALUES
(1, 'a790f27c-4e13-11ed-b201-448a5b2c2d83', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9', 'COW-00068 has been created by  Amanya Theology', '2022-10-17 12:03:04'),
(2, '51921a93-4e3d-11ed-b201-448a5b2c2d83', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9', 'COW-00070 has been created by  Amanya Theology', '2022-10-17 17:01:18'),
(3, 'aae4b975-4e46-11ed-b201-448a5b2c2d83', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9', 'COW-00070\'s data been updated by Amanya Theology', '2022-10-17 18:08:14'),
(4, '4032d941-4e48-11ed-b201-448a5b2c2d83', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9', 'COW-00071 has been created by Amanya Theology', '2022-10-17 18:19:34'),
(5, 'ae1cef12-4e59-11ed-b201-448a5b2c2d83', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9', 'COW-00072 has been created byAmanya Theolin', '2022-10-17 20:24:19'),
(6, '833e2057-4eeb-11ed-b201-448a5b2c2d83', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9', 'energy - 34 1000 has been added byAmanya Theolin', '2022-10-18 13:48:14'),
(7, '9d8c4cba-8cce-11ed-a584-448a5b2c2d83', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9', 'energy - 34 1000 has been deleted byAma Theolin', '2023-01-05 07:57:35'),
(8, '1b230275-8f7d-11ed-a584-448a5b2c2d83', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9', 'DSTV BILL - 12 1000 has been deleted byAma Theolin', '2023-01-08 17:51:40'),
(9, '1c29d883-8f7d-11ed-a584-448a5b2c2d83', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9', 'Amanya Theo - 12 1 has been deleted byAma Theolin', '2023-01-08 17:51:42');

-- --------------------------------------------------------

--
-- Table structure for table `breeding`
--

CREATE TABLE `breeding` (
  `id` int NOT NULL,
  `animal_id` int DEFAULT NULL,
  `breeding_date` date DEFAULT NULL,
  `expected_due_date` date DEFAULT NULL,
  `breeding_uuid` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `breeding`
--

INSERT INTO `breeding` (`id`, `animal_id`, `breeding_date`, `expected_due_date`, `breeding_uuid`) VALUES
(1, 4, '2022-10-07', '2023-07-24', '38a57545-62f5-49d4-bd8c-3f1b67f6d545'),
(2, 70, '2022-10-18', '2023-07-27', '25daee69-35fa-47cc-af1e-7d7bd44acf11'),
(3, 69, '2022-10-04', '2023-07-27', 'dd610352-c9ef-486d-8130-9e6aac8c502b');

-- --------------------------------------------------------

--
-- Table structure for table `disease`
--

CREATE TABLE `disease` (
  `id` int NOT NULL,
  `disease_name` varchar(100) NOT NULL,
  `genre_id` int NOT NULL,
  `animal_type` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `disease`
--

INSERT INTO `disease` (`id`, `disease_name`, `genre_id`, `animal_type`) VALUES
(1, 'Anemia', 1, 'cow'),
(2, 'Bloat ', 1, 'cow'),
(3, 'Colic', 1, 'cow'),
(4, 'Founder', 1, 'cow'),
(5, 'Pneumonia', 2, 'cow'),
(6, 'Tetanus', 2, 'cow'),
(7, 'Atrophic Rhinitis', 2, 'cow'),
(8, 'Anthrax', 2, 'cow'),
(9, 'Blackleg', 2, 'cow'),
(10, 'Brucellosis', 2, 'cow'),
(11, 'pullorum', 2, 'cow'),
(12, 'Foot Rot', 4, 'cow'),
(13, 'Calf Diphtheria', 4, 'cow'),
(14, 'Coccidiosis', 5, 'cow'),
(15, 'Cholera', 3, 'cow'),
(16, 'Equine Encephalomyelitis', 3, 'cow'),
(17, 'Hemorrhagic Septicemia', 3, 'cow'),
(18, 'Newcastle', 3, 'cow'),
(19, 'Warts', 3, 'cow'),
(20, 'Cholera', 3, 'cow'),
(21, 'Equine Encephalomyelitis', 3, 'cow'),
(22, 'Hemorrhagic Septicemia', 3, 'cow'),
(23, 'Newcastle', 3, 'cow'),
(24, 'Warts', 3, 'cow'),
(25, 'Abscesses', 1, 'rabbit'),
(26, 'Enteritis: Diarrhea', 1, 'rabbit'),
(27, 'Pneumonia', 1, 'rabbit'),
(28, 'Ringworm', 1, 'rabbit'),
(29, 'Skin Mange', 1, 'rabbit'),
(30, 'Sore Hocks', 1, 'rabbit'),
(31, 'Warbles', 1, 'rabbit'),
(42, '5000', 4, '5000'),
(43, '4000', 4, '4000'),
(44, '4200', 4, '4200'),
(45, '2000', 4, '2000'),
(46, '1000', 4, '1000');

-- --------------------------------------------------------

--
-- Table structure for table `disease_genre`
--

CREATE TABLE `disease_genre` (
  `id` int NOT NULL,
  `genre` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `disease_genre`
--

INSERT INTO `disease_genre` (`id`, `genre`) VALUES
(1, 'Tick-borne Diseases'),
(2, 'Bacterial Diseases'),
(3, 'Viral Diseases'),
(4, 'fungal Diseases'),
(5, 'Protozoan Diseases'),
(6, 'Nutritional defects');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_records`
--

CREATE TABLE `doctor_records` (
  `id` int NOT NULL,
  `animal_type` varchar(20) DEFAULT NULL,
  `diagnosis` text,
  `disease_id` tinyint DEFAULT NULL,
  `animal_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `doctor_records`
--

INSERT INTO `doctor_records` (`id`, `animal_type`, `diagnosis`, `disease_id`, `animal_id`) VALUES
(1, 'cow', 'The clinical signs are high fever, the formation of blisters at foot and mouth, loss of appetite, weight loss, reduced milk production, and death of young animals.', 2, 43);

-- --------------------------------------------------------

--
-- Table structure for table `due_dates`
--

CREATE TABLE `due_dates` (
  `id` int NOT NULL,
  `vaccination_date` date DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `animal_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `due_dates`
--

INSERT INTO `due_dates` (`id`, `vaccination_date`, `delivery_date`, `animal_id`) VALUES
(1, '2022-09-10', '2022-10-08', '54');

-- --------------------------------------------------------

--
-- Table structure for table `farma`
--

CREATE TABLE `farma` (
  `id` int NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `farma_id` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `mail` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `farma`
--

INSERT INTO `farma` (`id`, `created_date`, `farma_id`, `first_name`, `last_name`, `mail`, `phone`, `password`) VALUES
(48, '2022-08-25 08:16:08', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9', 'Ama', 'Theolin', '2018bit020@std.must.ac.ug', '256780742001', 'BbZsUOHfcAmw+YR3MsWgfg=='),
(53, '2022-10-09 10:01:52', '03931a4e-41bf-4929-8b91-392285ebb42f', 'Co', 'Draculla', 'ell889lle@gmail.com', NULL, 'ToNW0n/wIAZjak4lDRcBuw=='),
(54, '2022-10-13 14:39:25', '23513d85-4195-48ef-8a41-43949739bc50', 'mary', 'jane', 'maryjane@gmail.com', NULL, 'RJUdrLPXiaeBsezGyvQOFQ=='),
(55, '2022-10-13 14:40:22', 'd0d85e78-02a0-4ddf-a32e-4c1ad7ebf87c', NULL, NULL, 'maryjane@gmail.com', NULL, 'dqBeVliolOTiLX44BNBTkw==');

-- --------------------------------------------------------

--
-- Table structure for table `feeding_schedule`
--

CREATE TABLE `feeding_schedule` (
  `id` int NOT NULL,
  `feeding_tt_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `effective_date` date NOT NULL,
  `next_date` date DEFAULT NULL,
  `feeds_quantity` int DEFAULT NULL,
  `feeds_qnty_pending` int DEFAULT NULL,
  `schedule_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `feeding_schedule`
--

INSERT INTO `feeding_schedule` (`id`, `feeding_tt_id`, `effective_date`, `next_date`, `feeds_quantity`, `feeds_qnty_pending`, `schedule_id`) VALUES
(1, '3', '2023-03-04', '2023-02-05', 11, 11, '100153061854412807'),
(2, '3e770ad3-1ce2-43de-a01c-770b5b3a2157', '2023-03-04', '2023-02-05', 12, 12, '100153061854412808');

-- --------------------------------------------------------

--
-- Table structure for table `feeding_timetable`
--

CREATE TABLE `feeding_timetable` (
  `id` int NOT NULL,
  `tt_name` varchar(100) DEFAULT NULL,
  `animal_type` varchar(20) DEFAULT NULL,
  `cycle` int DEFAULT NULL,
  `period` int DEFAULT NULL,
  `quantity_per_cycle` int DEFAULT NULL,
  `quantity_per_cycle_unit` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `quantity_unit` int DEFAULT NULL,
  `planned_period` int DEFAULT NULL,
  `planned_period_time` int DEFAULT NULL,
  `first_feed_date` date DEFAULT NULL,
  `next_feed_date` date DEFAULT NULL,
  `last_feed_date` date DEFAULT NULL,
  `feeds_id` int DEFAULT NULL,
  `tt_id` char(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `feeding_timetable`
--

INSERT INTO `feeding_timetable` (`id`, `tt_name`, `animal_type`, `cycle`, `period`, `quantity_per_cycle`, `quantity_per_cycle_unit`, `quantity`, `quantity_unit`, `planned_period`, `planned_period_time`, `first_feed_date`, `next_feed_date`, `last_feed_date`, `feeds_id`, `tt_id`) VALUES
(1, 'COW-FEEDING-0001', 'cow', 2, 1, 12, 1000, 24, 10000, 2, 14, '2022-09-01', '2022-09-02', '2022-09-17', 1, ''),
(2, 'COW-FEEDING-0002', 'cow', 4, 360, 4, 1000, 12, 1000, 7, 1, '2022-09-15', '2022-10-17', '2022-09-17', 2, ''),
(41, 'COW-FEEDING-0003', 'cow', 1, 1, 1, 1000, 1, 1000, 1, 1, '2023-01-31', '2023-02-01', '2023-02-05', 1, '1'),
(42, 'COW-FEEDING-00042', 'cow', 1, 1, 12, 1000, 12, 1000, 2, 1, '2023-02-01', '2023-02-02', '2023-02-05', 1, '1'),
(44, 'COW-FEEDING-00043', 'cow', 1, 1, 11, 1000, 11, 1000, 1, 1, '2023-02-03', '2023-02-04', '2023-02-04', 3, '3'),
(49, 'COW-FEEDING-00045', 'cow', 1, 1, 12, 1000, 12, 1, 12, 30, '2023-02-04', '2023-02-05', '2023-02-05', 1, '3e770ad3-1ce2-43de-a01c-770b5b3a2157');

--
-- Triggers `feeding_timetable`
--
DELIMITER $$
CREATE TRIGGER `new_tt_insert` AFTER INSERT ON `feeding_timetable` FOR EACH ROW BEGIN
CALL farma_create_schedule ( NEW.tt_id, NEW.quantity, '2023-02-04', NEW.cycle, NEW.cycle, NEW.quantity_per_cycle, @total); 
            
        END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `feeds`
--

CREATE TABLE `feeds` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(120) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `quantity_measure` int DEFAULT NULL,
  `stock_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expected_restock_date` datetime DEFAULT NULL,
  `animal_type` varchar(20) DEFAULT NULL,
  `farma_id` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `feeds`
--

INSERT INTO `feeds` (`id`, `name`, `description`, `quantity`, `quantity_measure`, `stock_date`, `expected_restock_date`, `animal_type`, `farma_id`) VALUES
(1, 'Wheat Straw', 'Wheat Straw Feeds', 23, 1000, '2022-09-23 19:15:37', '2023-09-23 00:00:00', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(2, 'Rice Straw', 'Wheat Straw Feeds 2', 15, 1, '2022-09-23 19:15:37', '2023-09-23 00:00:00', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(3, 'Maize Stover', 'Wheat Straw Feeds 3', 3, 1000, '2022-09-23 19:15:37', '2023-09-23 00:00:00', 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9');

--
-- Triggers `feeds`
--
DELIMITER $$
CREATE TRIGGER `before_feeds_delete` BEFORE DELETE ON `feeds` FOR EACH ROW BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), OLD.farma_id, CONCAT(OLD.name, " - ", OLD.quantity, " ", OLD.quantity_measure, " has been deleted by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = OLD.farma_id)));

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `feeds_update` BEFORE UPDATE ON `feeds` FOR EACH ROW BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.name, " - ", NEW.quantity, " ", NEW.quantity_measure, " has been added by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `new_feeds_stock` AFTER INSERT ON `feeds` FOR EACH ROW BEGIN

    -- statements
    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.name, " - ", NEW.quantity, " ", NEW.quantity_measure, " has been added by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `first_dates`
--

CREATE TABLE `first_dates` (
  `first_dates_id` int NOT NULL,
  `vaccination_date` date DEFAULT NULL,
  `feeds_stock` date DEFAULT NULL,
  `insemination_date` date DEFAULT NULL,
  `animal_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `first_dates`
--

INSERT INTO `first_dates` (`first_dates_id`, `vaccination_date`, `feeds_stock`, `insemination_date`, `animal_id`) VALUES
(1, '2022-09-07', '2022-09-07', '2022-09-07', 54),
(2, '2022-09-08', '2022-09-08', '2022-09-08', 40);

-- --------------------------------------------------------

--
-- Table structure for table `gestation_periods`
--

CREATE TABLE `gestation_periods` (
  `id` int NOT NULL,
  `period` int DEFAULT NULL,
  `animal_type` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gestation_periods`
--

INSERT INTO `gestation_periods` (`id`, `period`, `animal_type`) VALUES
(1, 31, 'rabbit'),
(2, 150, 'goat'),
(3, 147, 'sheep'),
(4, 283, 'cow'),
(5, 125, 'pig');

-- --------------------------------------------------------

--
-- Table structure for table `new_born`
--

CREATE TABLE `new_born` (
  `id` int NOT NULL,
  `new_born_tag` varchar(200) DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `dob` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `new_born`
--

INSERT INTO `new_born` (`id`, `new_born_tag`, `parent_id`, `dob`) VALUES
(35, 'COW-65', 54, '2022-10-08'),
(36, 'COW-65', 54, '2022-10-08'),
(39, 'COW-65', 54, '2022-10-08'),
(43, 'COW-65', 54, '2022-10-08');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(120) DEFAULT NULL,
  `product_type_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `quantity_measure` int DEFAULT NULL,
  `animal_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `product_type_id`, `quantity`, `quantity_measure`, `animal_id`) VALUES
(1, 'wool', 3, 5, 1000, 54);

-- --------------------------------------------------------

--
-- Table structure for table `product_schedule`
--

CREATE TABLE `product_schedule` (
  `id` int NOT NULL,
  `product_type_id` int DEFAULT NULL,
  `cycle` int NOT NULL,
  `frequency` int NOT NULL,
  `expected_qnty` int DEFAULT NULL,
  `expected_qnty_measure` int DEFAULT NULL,
  `animal_id` int DEFAULT NULL,
  `extract_date` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_schedule`
--

INSERT INTO `product_schedule` (`id`, `product_type_id`, `cycle`, `frequency`, `expected_qnty`, `expected_qnty_measure`, `animal_id`, `extract_date`) VALUES
(1, 1, 2, 1, 4, 1000, 54, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Stand-in structure for view `SickAnimals`
-- (See below for the actual view)
--
CREATE TABLE `SickAnimals` (
);

-- --------------------------------------------------------

--
-- Table structure for table `sick_animals`
--

CREATE TABLE `sick_animals` (
  `id` int NOT NULL,
  `animal_id` int DEFAULT NULL,
  `disease_id` int DEFAULT NULL,
  `reported_date` date DEFAULT NULL,
  `vet_id` varchar(120) DEFAULT NULL,
  `appointment_date` datetime DEFAULT NULL,
  `confirmed` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'N',
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sick_animals`
--

INSERT INTO `sick_animals` (`id`, `animal_id`, `disease_id`, `reported_date`, `vet_id`, `appointment_date`, `confirmed`, `added_date`) VALUES
(7, 53, 8, '2022-10-14', '520349f6-6594-4f2c-a30a-348cf70e9f82', '2022-10-12 00:00:00', 'Y', '2022-10-02 17:51:43'),
(9, 64, 2, '2022-09-28', '70282288-af13-449f-b270-240f56b45b77', '2022-10-15 18:57:00', 'N', '2022-10-14 15:57:43'),
(10, 67, 6, '2022-10-12', '70282288-af13-449f-b270-240f56b45b77', '2022-10-30 19:12:00', 'Y', '2022-10-15 12:08:46'),
(11, 54, 7, '2022-10-14', 'ad74b397-436d-403e-bca4-332c3fe925d9', '2022-10-22 18:09:00', 'N', '2022-10-19 15:09:45');

-- --------------------------------------------------------

--
-- Table structure for table `symptom`
--

CREATE TABLE `symptom` (
  `id` int NOT NULL,
  `disease` varchar(200) NOT NULL,
  `symptom_name` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `symptom`
--

INSERT INTO `symptom` (`id`, `disease`, `symptom_name`, `description`) VALUES
(1, '1', 'Characterized by general \r\nweakness and a lack of \r\nvigor.', 'All farm animals are \r\nsusceptible. Iron deficiency \r\nprevents the formation of \r\nhemoglobin, a red ironcontaining pigment in the red \r\nblood cells responsible for \r\ncarrying oxygen to the cells.'),
(2, '4', 'occurs when Cows graze on highly productive pastures during the wet season', '\r\nSwollen abdomen on the left \r\nside, labored breathing, \r\nprofuse salivation, groaning, \r\nlack of appetite, & stiffness.'),
(3, '2', 'Improper feeding. Pain, sweating, & \r\nconstipation, kicking, & \r\ngroaning.\r\nCareful feeding.', '\r\nEnterotoxemia Bacteria & overeating. Constipation is an early \r\nsymptom & sometimes \r\nfollowed by diarrhea.'),
(4, '8', 'dsds', 'dsds'),
(5, '5', '1122', '1122'),
(6, '2', 'desease', 'desease'),
(7, '6', 'First time weak bones', 'First time weak bones'),
(8, '7', 'enter ', 'enter ');

-- --------------------------------------------------------

--
-- Table structure for table `treatment_history`
--

CREATE TABLE `treatment_history` (
  `id` int NOT NULL,
  `animal_id` int DEFAULT NULL,
  `animal_tag` varchar(20) DEFAULT NULL,
  `first_treatment_date` datetime DEFAULT NULL,
  `scheduled_treatment_date` datetime DEFAULT NULL,
  `vet_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `treatment_history`
--

INSERT INTO `treatment_history` (`id`, `animal_id`, `animal_tag`, `first_treatment_date`, `scheduled_treatment_date`, `vet_id`) VALUES
(1, 54, 'COW-00054', NULL, '2022-09-17 12:21:55', '1');

-- --------------------------------------------------------

--
-- Table structure for table `vaccination_details`
--

CREATE TABLE `vaccination_details` (
  `id` int NOT NULL,
  `vaccine_id` int DEFAULT NULL,
  `first_date` date DEFAULT NULL,
  `next_date` date DEFAULT NULL,
  `last_date` date DEFAULT NULL,
  `no_pending` int DEFAULT NULL,
  `animal_id` int DEFAULT NULL,
  `vet_id` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vaccination_details`
--

INSERT INTO `vaccination_details` (`id`, `vaccine_id`, `first_date`, `next_date`, `last_date`, `no_pending`, `animal_id`, `vet_id`) VALUES
(4, 3, '2022-09-06', '2022-10-14', '2022-10-20', 3, 44, '520349f6-6594-4f2c-a30a-348cf70e9f82');

--
-- Triggers `vaccination_details`
--
DELIMITER $$
CREATE TRIGGER `animal_vaccination_schedule_update` BEFORE UPDATE ON `vaccination_details` FOR EACH ROW BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
        VALUES(UUID(),(SELECT farma_id FROM animal WHERE id = NEW.animal_id), CONCAT( (SELECT animal_tag FROM animal WHERE id = NEW.animal_id), " has been created by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))));

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `new_animal_vaccination_schedule` AFTER INSERT ON `vaccination_details` FOR EACH ROW BEGIN

    -- statements
    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(),(SELECT farma_id FROM animal WHERE id = NEW.animal_id), CONCAT( (SELECT animal_tag FROM animal WHERE id = NEW.animal_id), " has been created by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))));

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `vaccination_schedule`
--

CREATE TABLE `vaccination_schedule` (
  `id` int NOT NULL,
  `cycle_no` int DEFAULT NULL,
  `vaccination_details_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `vaccination_date` date DEFAULT NULL,
  `next_vaccination_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vaccines`
--

CREATE TABLE `vaccines` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `quantity_measure` bigint DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `no_of_vaccinations` int DEFAULT NULL,
  `cycle` int DEFAULT NULL,
  `period` int DEFAULT NULL,
  `injection_area` varchar(100) DEFAULT NULL,
  `disease_id` int DEFAULT NULL,
  `animal_type` varchar(100) DEFAULT NULL,
  `farma_id` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vaccines`
--

INSERT INTO `vaccines` (`id`, `name`, `quantity`, `quantity_measure`, `description`, `no_of_vaccinations`, `cycle`, `period`, `injection_area`, `disease_id`, `animal_type`, `farma_id`) VALUES
(2, 'One Shot Ultra 8', 10, 1, 'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous', 2, 1, 4, 'behind left ear', 3, 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(3, 'Piliguard Pinkeye + 7', 10, 1, 'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous', 1, 2, 4, 'behind left ear', 3, 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(4, 'Alpha-7/MB-1', 10, 1, 'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous', 4, 4, 4, 'behind left ear', 3, 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(5, 'SolidBac Pinkeye IR/PR Implants', 10, 1, 'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous', 1, 1, 1, 'behind left ear', 3, 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9'),
(13, '123', 12, 1000, '12', 12, 21, 1, '12', NULL, 'cow', 'fea8d3cf-d829-4d45-8c89-eb177672e7e9');

-- --------------------------------------------------------

--
-- Table structure for table `vets`
--

CREATE TABLE `vets` (
  `id` int NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `email` varchar(69) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `station` varchar(50) DEFAULT NULL,
  `vet_id` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vets`
--

INSERT INTO `vets` (`id`, `fname`, `lname`, `email`, `phone`, `station`, `vet_id`) VALUES
(3, 'Amanya', 'Theo', '2018bit020@std.must.ac.ug', '+256758341871', 'ASA 2323', '520349f6-6594-4f2c-a30a-348cf70e9f82'),
(5, 'ssebabi', 'BILL', 'michaelajnew@gmail.com', '+256758341871', 'ssww', '30b74029-e57f-4a85-a984-8e6608b784cb'),
(6, 'Craig', 'David', 'derek.barigye@gmail.com', '+256703781554', 'Kabale', '70282288-af13-449f-b270-240f56b45b77'),
(7, 'ssebabi', 'martin', '2018bit020@std.must.ac.ug', '+256758341871', 'kakyeka', 'ad74b397-436d-403e-bca4-332c3fe925d9');

-- --------------------------------------------------------

--
-- Structure for view `SickAnimals`
--
DROP TABLE IF EXISTS `SickAnimals`;

CREATE ALGORITHM=UNDEFINED DEFINER=`derek_2022`@`%` SQL SECURITY DEFINER VIEW `SickAnimals`  AS SELECT `animal`.`animal_tag` AS `animal_tag` FROM `animal` WHERE ((0 <> `animal`.`is_sick`) is true)  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `animals_at_farm`
--
ALTER TABLE `animals_at_farm`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_trail`
--
ALTER TABLE `audit_trail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `breeding`
--
ALTER TABLE `breeding`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disease`
--
ALTER TABLE `disease`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disease_genre`
--
ALTER TABLE `disease_genre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_records`
--
ALTER TABLE `doctor_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `due_dates`
--
ALTER TABLE `due_dates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farma`
--
ALTER TABLE `farma`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feeding_schedule`
--
ALTER TABLE `feeding_schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feeding_timetable`
--
ALTER TABLE `feeding_timetable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feeds`
--
ALTER TABLE `feeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `first_dates`
--
ALTER TABLE `first_dates`
  ADD PRIMARY KEY (`first_dates_id`);

--
-- Indexes for table `gestation_periods`
--
ALTER TABLE `gestation_periods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `new_born`
--
ALTER TABLE `new_born`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_schedule`
--
ALTER TABLE `product_schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sick_animals`
--
ALTER TABLE `sick_animals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `symptom`
--
ALTER TABLE `symptom`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `treatment_history`
--
ALTER TABLE `treatment_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccination_details`
--
ALTER TABLE `vaccination_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccination_schedule`
--
ALTER TABLE `vaccination_schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccines`
--
ALTER TABLE `vaccines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vets`
--
ALTER TABLE `vets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animal`
--
ALTER TABLE `animal`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `animals_at_farm`
--
ALTER TABLE `animals_at_farm`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `audit_trail`
--
ALTER TABLE `audit_trail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `breeding`
--
ALTER TABLE `breeding`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `disease`
--
ALTER TABLE `disease`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `disease_genre`
--
ALTER TABLE `disease_genre`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `doctor_records`
--
ALTER TABLE `doctor_records`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `due_dates`
--
ALTER TABLE `due_dates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `farma`
--
ALTER TABLE `farma`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `feeding_schedule`
--
ALTER TABLE `feeding_schedule`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `feeding_timetable`
--
ALTER TABLE `feeding_timetable`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `feeds`
--
ALTER TABLE `feeds`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `first_dates`
--
ALTER TABLE `first_dates`
  MODIFY `first_dates_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `gestation_periods`
--
ALTER TABLE `gestation_periods`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `new_born`
--
ALTER TABLE `new_born`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product_schedule`
--
ALTER TABLE `product_schedule`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sick_animals`
--
ALTER TABLE `sick_animals`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `symptom`
--
ALTER TABLE `symptom`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `treatment_history`
--
ALTER TABLE `treatment_history`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vaccination_details`
--
ALTER TABLE `vaccination_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vaccination_schedule`
--
ALTER TABLE `vaccination_schedule`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vaccines`
--
ALTER TABLE `vaccines`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `vets`
--
ALTER TABLE `vets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`derek_2022`@`%` EVENT `animals_due_tracker` ON SCHEDULE EVERY 1 DAY STARTS '2022-10-15 09:05:37' ON COMPLETION NOT PRESERVE ENABLE COMMENT 'EXPECTED NEW BORNS' DO BEGIN
            -- 2. Get the required data
            SET @animal_id = (SELECT animal_id FROM breeding WHERE delivery_date = CURDATE());
            SET @parent_tag = (SELECT animal_tag FROM animal WHERE id = @animal_id);
            SET @farma_id = (SELECT farma_id FROM animal WHERE id = @animal_id);
            SET @new_max_id = (SELECT MAX(id) FROM animal WHERE farma_id = @farma_id);
            SET @new_born_tag = (SELECT CONCAT(UPPER(animal_type),'-000',(@new_max_id +1)) FROM animal WHERE id = @animal_id);

            -- 3. insert into new_born table
            INSERT INTO new_born(new_born_tag, parent_id, dob)
            VALUES(@new_born_tag, @animal_id, CURDATE());

        END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
