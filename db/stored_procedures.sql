/*

	INTRODUCED THE USE OF STORED PROCEDURES FOR OPTIMISATION 
	AND TO REDUCE REDUDANCY

*/


-- 1. CREATES VACCINATION SCHEDULES

DELIMITER $$

CREATE PROCEDURE procesDates (
	IN dates VARCHAR(50), 
	IN animal_kind VARCHAR(50), 
	IN the_id INT, IN the_date DATE,  
	IN animal_type VARCHAR(25), 
	IN animal_id INT
)

BEGIN

	INSERT INTO first_dates (dates, animal_kind, the_id)
	VALUES (the_date, animal_type, animal_id );

END $$

DELIMITER ;


-- 2. RETRIEVES THE COUNT OF ALL ANIMALS

DELIMITER $$

CREATE PROCEDURE getCount (
	IN farmaID VARCHAR(120),
	IN  animalType VARCHAR(20)
)

BEGIN
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

DELIMITER ;


-- 3. TO INSERT INTO SICK ANIMALS AND SYSMPTOMS TABLES

DELIMITER $$

CREATE PROCEDURE recordSick (
	IN animalID INT,
	IN reportedDate DATE,
	IN vetID VARCHAR(100),
	IN appointmentDate DATETIME,
	IN diseaseID INT,
	IN symptomName VARCHAR(200)
)

BEGIN

	INSERT INTO sick_animals 
	(animal_id,disease_id,reported_date,vet_id,appointment_date) 
	VALUES 
	( animalID, diseaseID, reportedDate, vetID, appointmentDate );
	
	INSERT INTO symptom 
	(disease, symptom_name, description) 
	VALUES 
	( diseaseID, symptomName, symptomName);
    
END$$

DELIMITER ;


-- 4. CREATES A FARMA SCHEDULES

DELIMITER |

CREATE PROCEDURE register_farma (
	IN f_id VARCHAR(120),
	IN mail VARCHAR(50),
	IN pwd VARCHAR(200)
)

BEGIN

	INSERT INTO farma (farma_id, mail, password	) 
	VALUES (f_id, mail, TO_BASE64(AES_ENCRYPT(pwd, f_id)));

	INSERT INTO animals_at_farm (farma_id) VALUES (f_id);
	
END |

DELIMITER ;


-- 5. CREATES A FARMA SCHEDULES

DELIMITER |

CREATE PROCEDURE update_sick (
	IN animalID INT,
	IN reportedDate DATE,
	IN vetID VARCHAR(100),
	IN appointmentDate VARCHAR(50),
	IN diseaseID INT,
	IN symptomName VARCHAR(200)
)

BEGIN

	UPDATE sick_animals
	SET disease_id = diseaseID,
	reported_date = reportedDate,
	vet_id = vetID,
	appointment_date = appointmentDate 
	WHERE animal_id = animalID;
	
	UPDATE symptom
	SET symptom_name = symptomName
	WHERE disease = diseaseID;
    
END |

DELIMITER ;


-- 6. FEEDING TIMETABLE

-- DROP PROCEDURE FeedingTimetable;

-- DELIMITER $$

-- CREATE PROCEDURE FeedingTimetable(
-- 	IN ID VARCHAR(120),
-- 	IN ANIMAL_TYPE VARCHAR(20),
-- )

-- BEGIN
	
-- 	SET @feeds_id = (SELECT id FROM feeds WHERE farma_id = ID and animal_type = ANIMAL_TYPE);
-- 	SET @total_qnty = (SELECT quantity*quantity_measure FROM feeds WHERE farma_id = ID);
-- 	SET @qnty_per = (SELECT quantity_per_cycle*quantity_per_cycle_unit FROM feeding_timetable WHERE feeds_id = @feeds_id);
-- 	SET @feeding_freq = (SELECT cycle FROM feeding_timetable WHERE feeds_id = @feeds_id);
-- 	SET @feeding_times = (SELECT period FROM feeding_timetable WHERE feeds_id = @feeds_id);
-- 	SET @period_planned = (SELECT planned_period FROM feeding_timetable WHERE feeds_id = @feeds_id);
-- 	SET @period_planned_time = (SELECT planned_period_time FROM feeding_timetable WHERE feeds_id = @feeds_id);
-- 	SET @first_feed_date = (SELECT first_feed_date FROM feeding_timetable WHERE feeds_id = @feeds_id);


-- 	feeding_timetable:  LOOP
-- 		IF  @total_qnty = 0 THEN
-- 			LEAVE  feeding_timetable;
		
-- 		ELSE      
-- 			SET @total_qnty = @total_qnty - @qnty_per;
-- 			ITERATE  loop_label;


-- 		END  IF;

-- 	END LOOP;
	
-- 	SELECT str;

-- END$$

-- DELIMITER ;


-- -- 4. FEEDING TIMETABLE

-- DROP PROCEDURE IF EXISTS feedingTimetable;

-- DELIMITER $$

-- CREATE PROCEDURE feedingTimetable(
-- 	IN ID VARCHAR(120),
-- 	IN ANIMAL_TYPE VARCHAR(20)
-- )

-- BEGIN

-- 	SET @feeds_id = (SELECT A.id FROM feeds A, feeding_timetable B WHERE B.feeds_id = A.id AND A.farma_id = ID AND  A.animal_type = ANIMAL_TYPE);
-- 	SET @total_qnty = (SELECT A.quantity*A.quantity_measure FROM feeds A, feeding_timetable B WHERE A.farma_id = ID AND A.id = B.feeds_id);
-- 	SET @tt_id = (SELECT id FROM feeding_timetable WHERE feeds_id = @feeds_id);
-- 	SET @qnty_per = (SELECT quantity_per_cycle*quantity_per_cycle_unit FROM feeding_timetable WHERE feeds_id = @feeds_id);
-- 	SET @feeding_freq = (SELECT cycle FROM feeding_timetable WHERE feeds_id = @feeds_id);
-- 	SET @feeding_times = (SELECT period FROM feeding_timetable WHERE feeds_id = @feeds_id);
-- 	SET @period_planned = (SELECT planned_period FROM feeding_timetable WHERE feeds_id = @feeds_id);
-- 	SET @period_planned_time = (SELECT planned_period_time FROM feeding_timetable WHERE feeds_id = @feeds_id);
-- 	SET @first_feed_date = (SELECT first_feed_date FROM feeding_timetable WHERE feeds_id = @feeds_id);

--   	loop2: LOOP

--     	SET @total_qnty = @total_qnty - @qnty_per;

-- 		INSERT feeding_schedule (feeding_tt_id, effective_date, next_date, feeds_qnty_pending)
-- 		VALUES (@tt_id, @first_feed_date, DATE_ADD(@first_feed_date, INTERVAL @feeding_times DAY), @qnty);

--     IF @total_qnty = 0 THEN

--     	LEAVE loop2;

--     END IF;

--  END LOOP loop2;

-- END $$

-- DELIMITER ;
