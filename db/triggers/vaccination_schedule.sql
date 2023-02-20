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

    INSERT INTO triggered_emails (user_name,email_address,status,subject,farma_name,body,animal_tag,confirmation_id)
    VALUES ((SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = NEW.vet_id),
            (SELECT email FROM vets WHERE vet_id = NEW.vet_id),
            'N',
            CONCAT('SCHEDULED VACCINATION OF ', (SELECT animal_tag FROM animal WHERE id = NEW.animal_id)),
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id)),
            CONCAT((SELECT CONCAT(first_name, ' ', last_name) FROM farma
                        WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id)),
                'has scheduled a vaccination of their ',
                (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
                'against ', (SELECT disease_name FROM disease WHERE id IN (SELECT disease_id FROM vaccines WHERE id = NEW.vaccine_id )),
                'on the ', NEW.first_date, ' for details call',
                (SELECT phone FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))),
            (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
            UUID());

END;

