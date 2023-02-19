
-- 5. UPDATES A SICK ANIMAL

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
	appointment_date = CONVERT(appointmentDate, DATETIME)
	WHERE animal_id = animalID;
	
	UPDATE symptom
	SET symptom_name = symptomName
	WHERE disease = diseaseID;
    
END |

DELIMITER ;
