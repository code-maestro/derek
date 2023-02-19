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

DELIMITER;