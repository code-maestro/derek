delimiter |
-- NEW BORN ALERT
CREATE EVENT IF NOT EXISTS expectant_tracker

    ON SCHEDULE
        EVERY 1 DAY

    COMMENT 'EXPECTING ANIMALS DELIVERY TRACKER'

    DO
    
        BEGIN
            -- 2. Get the required data
            SET @animal_id = (SELECT animal_id FROM due_dates WHERE delivery_date = CURDATE());
            SET @parent_tag = (SELECT animal_tag FROM animal WHERE id = @animal_id);
            SET @farma_id = (SELECT farma_id FROM animal WHERE id = @animal_id);
            SET @new_max_id = (SELECT MAX(id) FROM animal WHERE farma_id = @farma_id);
            SET @new_born_tag = (SELECT CONCAT(UPPER(animal_type),'-',(@new_max_id +1)) FROM animal WHERE id = @animal_id);

            -- 3. insert into new_born table
            INSERT INTO new_born(new_born_tag, parent_id, dob, reg_date)
            VALUES(@new_born_tag, @animal_id, CURDATE(), CURDATE());

            -- 4. Insert order line items
            INSERT INTO animal(animal_tag,parent_tag, dob, animal_type,farma_id)
            VALUES(@new_born_tag, @parent_tag, CURDATE(), (SELECT animal_type FROM animal WHERE id = @animal_id), @farma_id);

        END |

delimiter ;