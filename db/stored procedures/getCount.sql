

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
