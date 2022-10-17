-- SYSTEM TRIGGERS

-- ANIMAL
-- 1. new animal - depolyed

DELIMITER $$

CREATE TRIGGER new_animal

    AFTER INSERT

    ON animal FOR EACH ROW

BEGIN

    -- statements
    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.animal_tag, " has been created by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END$$    

DELIMITER ;


-- 2. Update animal -deployed

DELIMITER $$

CREATE TRIGGER animal_update

    BEFORE UPDATE

    ON animal FOR EACH ROW

BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.animal_tag, "'s data been updated by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END$$

DELIMITER ;


-- 3. Before animal delete
-- TODO add implentation to prevent deletion of expecting animals

DELIMITER $$

CREATE TRIGGER before_animal_delete

    BEFORE DELETE

    ON animal FOR EACH ROW

BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), OLD.farma_id, CONCAT(OLD.animal_tag, " has been deleted by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = OLD.farma_id)));

END$$    

DELIMITER ;



-- FEEDS
-- 4. new feed stock - depolyed

DELIMITER $$

CREATE TRIGGER new_feeds_stock

    AFTER INSERT

    ON feeds FOR EACH ROW

BEGIN

    -- statements
    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.name, " - ", NEW.quantity, " ", NEW.quantity_measure, " has been added by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END$$    

DELIMITER ;


-- 5. Update feeds -deployed

DELIMITER $$

CREATE TRIGGER feeds_update

    BEFORE UPDATE

    ON feeds FOR EACH ROW

BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.name, " - ", NEW.quantity, " ", NEW.quantity_measure, " has been added by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END$$

DELIMITER ;


-- 6. Before feeds delete
-- TODO add implentation to prevent deletion of feeds with running schedules and time tables

DELIMITER $$

CREATE TRIGGER before_feeds_delete

    BEFORE DELETE

    ON feeds FOR EACH ROW

BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), OLD.farma_id, CONCAT(OLD.name, " - ", OLD.quantity, " ", OLD.quantity_measure, " has been deleted by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = OLD.farma_id)));

END$$    

DELIMITER ;



-- 7. new feed schedule - depolyed

DELIMITER $$

CREATE TRIGGER new_feeding_timetable

    AFTER INSERT

    ON feeding_timetable FOR EACH ROW

BEGIN

    -- statements
    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), (SELECT farma_id FROM feeds WHERE id = NEW.feeds_id), CONCAT(NEW.tt_name, " - ", NEW.quantity, " ", NEW.quantity_measure, " has been added by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM feeds WHERE id = NEW.feeds_id))));

END$$    

DELIMITER ;



-- 8. Update feeding_schedule -deployed

DELIMITER $$

CREATE TRIGGER feeding_timetable_update

    BEFORE UPDATE

    ON feeding_timetable FOR EACH ROW

BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), (SELECT farma_id FROM feeds WHERE id = NEW.feeds_id), CONCAT(NEW.tt_name, " - ", NEW.quantity, " ", NEW.quantity_measure, " has been added by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM feeds WHERE id = NEW.feeds_id))));

END$$

DELIMITER ;


-- 9. Before Feeding schedule delete
-- TODO add implentation to prevent deletion of feeds with running schedules and time tables

DELIMITER $$

CREATE TRIGGER before_feeding_timetable_delete

    BEFORE DELETE

    ON feeding_timetable FOR EACH ROW

BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), (SELECT farma_id FROM feeds WHERE id = NEW.feeds_id), CONCAT(NEW.tt_name, " - ", NEW.quantity, " ", NEW.quantity_measure, " has been added by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM feeds WHERE id = NEW.feeds_id))));

END$$    

DELIMITER ;




-- 10. new animal vaccination schedule - depolyed

DELIMITER $$

CREATE TRIGGER new_animal_vaccination_schedule

    AFTER INSERT

    ON vaccination_details FOR EACH ROW

BEGIN

    -- statements
    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(),(SELECT farma_id FROM animal WHERE id = NEW.animal_id), CONCAT( (SELECT animal_tag FROM animal WHERE id = NEW.animal_id), " has been created by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))));

END$$    

DELIMITER ;



-- 11. Update animal vaccination schedule - deployed

DELIMITER $$

CREATE TRIGGER animal_vaccination_schedule_update

    BEFORE UPDATE

    ON vaccination_details FOR EACH ROW

BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
        VALUES(UUID(),(SELECT farma_id FROM animal WHERE id = NEW.animal_id), CONCAT( (SELECT animal_tag FROM animal WHERE id = NEW.animal_id), " has been created by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))));

END$$

DELIMITER ;


-- 6. Before Delete animal vaccination schedule - deployed
-- TODO add implentation to prevent deletion of vaccination schedule with running schedules and time tables

DELIMITER $$

CREATE TRIGGER before_vaccination_schedule_delete

    BEFORE DELETE

    ON vaccination_details FOR EACH ROW

BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(),(SELECT farma_id FROM animal WHERE id = NEW.animal_id), CONCAT( (SELECT animal_tag FROM animal WHERE id = NEW.animal_id), " has been created by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))));


END$$

DELIMITER ;