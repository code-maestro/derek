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