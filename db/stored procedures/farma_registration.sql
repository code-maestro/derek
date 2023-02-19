-- 4. CREATES A FARMA

DELIMITER |

CREATE PROCEDURE farma_registration (
	IN f_id VARCHAR(120),
	IN fname VARCHAR(100),
	IN lname VARCHAR(100),
	IN mail VARCHAR(50),
	IN pwd VARCHAR(200)
)

BEGIN

	INSERT INTO farma (farma_id, first_name, last_name, mail, password	) 
	VALUES (f_id, fname, lname, mail, TO_BASE64(AES_ENCRYPT(pwd, f_id)));

	INSERT INTO animals_at_farm (farma_id) VALUES (f_id);
	
END |

DELIMITER ;
