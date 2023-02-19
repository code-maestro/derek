drop trigger new_animal_vaccination_schedule;

create definer = derek@localhost trigger new_animal_vaccination_schedule
    after insert
    on vaccination_details
    for each row
BEGIN
    -- statements
    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(),
           (SELECT farma_id FROM animal WHERE id = NEW.animal_id),
           CONCAT( (SELECT animal_tag FROM animal WHERE id = NEW.animal_id), ' has been created by',
               (SELECT CONCAT(first_name, ' ', last_name)
                FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))));

    INSERT INTO triggered_emails (user_name,email_address,status,subject,farma_name)
    VALUES ((SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = NEW.vet_id),
            (SELECT email FROM vets WHERE vet_id = NEW.vet_id),
            'N',
            CONCAT('SCHEDULED VACCINATION OF ', (SELECT animal_tag FROM animal WHERE id = NEW.animal_id)),
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id)));

END;

