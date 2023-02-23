DELIMITER $$

CREATE PROCEDURE getNewBorns()

    BEGIN

        DECLARE finished INTEGER DEFAULT 0;
        DECLARE animalID varchar(10);

        -- declare cursor for animal_ids
        DEClARE animalIDs
            CURSOR FOR
                SELECT animal_id FROM breeding WHERE expected_due_date = CURDATE();

        -- declare NOT FOUND handler
        DECLARE CONTINUE HANDLER
            FOR NOT FOUND SET finished = 1;

        OPEN animalIDs;

            getAnimalID: LOOP

                FETCH animalIDs INTO animalID;

                IF finished = 1 THEN

                    LEAVE getAnimalID;

                END IF;

                    SET @parent_tag = (SELECT animal_tag FROM animal WHERE id = animalID);
                    SET @animal_type = (SELECT animal_type FROM animal WHERE id = animalID);
                    SET @farma_id = (SELECT farma_id FROM animal WHERE id = animalID);
                    SET @new_max_id = (SELECT MAX(id) FROM animal WHERE farma_id = @farma_id AND animal_type = @animal_type);
                    SET @new_born_tag = (SELECT CONCAT(UPPER(animal_type),'-000',(@new_max_id +1)) FROM animal WHERE id = animalID);

                SELECT animalID;
                SELECT @parent_tag;
                SELECT @farma_id;
                SELECT @new_max_id;
                SELECT @new_born_tag;

                    -- 3. insert into new_born table
                    INSERT INTO animal(animal_tag,parent_tag,dob,reg_date,animal_type,farma_id,confirmed)
                    VALUES(@new_born_tag, @parent_tag, CURDATE(), CURDATE(), @animal_type, @farma_id, 'N' );

            END LOOP getAnimalID;

	    CLOSE animalIDs;

    END$$

    DELIMITER ;