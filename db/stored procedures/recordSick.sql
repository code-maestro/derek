
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
