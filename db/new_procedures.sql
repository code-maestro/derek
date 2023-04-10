  
 CREATE PROCEDURE addUser(email VARCHAR(255), name VARCHAR(255))
BEGIN
    DECLARE user_count INT DEFAULT 0;
    SELECT COUNT(*) INTO user_count FROM users WHERE email = email;
    IF user_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User with email already exists.', MYSQL_ERRNO = 1001;
    ELSE
        INSERT INTO users (email, name) VALUES (email, name);
    END IF;
END;

 
 
 
create
    definer = derek@localhost procedure seedOTP(IN gmail varchar(120))
BEGIN

    DECLARE email VARCHAR(120);
    DECLARE f_id VARCHAR(120);
    SELECT @OTP_ID := UUID();

    SELECT mail INTO email FROM farma WHERE mail = gmail;

    SELECT farma_id INTO f_id FROM farma WHERE mail = gmail;

    IF email = gmail THEN

        INSERT INTO otp (otp,otp_id,pending_id,status,expiry_timestamp)
        VALUES (TO_BASE64(AES_ENCRYPT((SELECT LEFT(CAST(RAND()*1000000000+999999 AS UNSIGNED),6)), f_id)), @OTP_ID,
                   f_id, 'A', DATE_ADD(NOW(), INTERVAL 5 MINUTE));

        INSERT INTO triggered_emails (email_address,status,subject,farma_name,body,confirmation_id, template_name, type)
        VALUES ( email, 'N', 'PASSWORD RESET SINGLE-USE OTP',
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = f_id),
                ' Please Enter this single-use OTP code :  ', f_id,'otp',
            (SELECT (AES_DECRYPT(FROM_BASE64(otp), pending_id)) FROM otp WHERE otp_id = @OTP_ID));

    END IF;

END;



-- NEW TABLE FOR PASSWORD MANAGEMENT

create table pwd
(
    id       int auto_increment
        primary key,
    farma_id varchar(60)  not null,
    status   char         not null,
    password varchar(200) not null
);



-- ALTERED PROCEDURES
--pending_farma_registration
drop procedure pending_farma_registration;

create
    definer = derek@localhost procedure pending_farma_registration(IN f_id varchar(120), IN fname varchar(100),
                                                                   IN lname varchar(100), IN email varchar(50),
                                                                   IN phone_number varchar(13), IN pwd varchar(200))
BEGIN
    
    DECLARE user_count INT DEFAULT 0;
    SELECT COUNT(*) INTO user_count FROM pending_farma WHERE mail = email;
    
    IF user_count > 0 THEN
        
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User with email already exists.', MYSQL_ERRNO = 1001;
    
    ELSE

        INSERT INTO pending_farma (farma_id, first_name, last_name, mail, phone)
        VALUES (f_id, fname, lname, email, phone_number);
    
        INSERT INTO pwd (farma_id, status, password)
        VALUES (f_id, 'I', TO_BASE64(AES_ENCRYPT(pwd, f_id)));
    
    END IF;
    
END;


-- FARMA REGISTRATION
drop procedure farma_registration;

create
    definer = derek@localhost procedure farma_registration(IN f_id varchar(120), IN fname varchar(100),
                                                           IN lname varchar(100), IN email varchar(50),
                                                           IN phone_number varchar(13))
BEGIN

	INSERT INTO farma (farma_id, first_name, last_name, mail, phone)
	VALUES (f_id, fname, lname, email, phone_number);

	INSERT INTO animals_at_farm (farma_id) VALUES (f_id);

	UPDATE pwd SET status = 'A'
    WHERE farma_id = f_id;

END;


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

    INSERT INTO triggered_emails (user_name,email_address,status,subject,farma_name,body,animal_tag,confirmation_id, template_name, type)
    VALUES ((SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = NEW.vet_id),
            (SELECT email FROM vets WHERE vet_id = NEW.vet_id),
            'N',
            CONCAT('SCHEDULED VACCINATION OF ', (SELECT animal_tag FROM animal WHERE id = NEW.animal_id)),
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id)),
            CONCAT((SELECT CONCAT(first_name, ' ', last_name) FROM farma
                        WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id)),
                ' has scheduled a vaccination of their ',
                (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
                ' against ', IFNULL((SELECT disease_name FROM disease WHERE id IN (SELECT disease_id FROM vaccines WHERE id = NEW.vaccine_id )), 'not specified'),
                ' on the ',  NEW.first_date, '  for details call ',
                (SELECT phone FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))),
            (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
            NEW.confirmed_id, 'confirmation', 'vaccination');

END;


drop trigger new_born_confirm;

create definer = derek@localhost trigger new_born_confirm
    after update
    on animal
    for each row
BEGIN
    
    IF OLD.confirmed = 'N' THEN

        INSERT INTO triggered_emails (email_address,status,subject,farma_name,body,animal_tag,confirmation_id, template_name) 
        VALUES ((SELECT mail FROM farma WHERE farma_id = NEW.farma_id),'N',
            CONCAT('REGISTRATION OF NEW BORN ', NEW.animal_tag, ' ON ', DATE_FORMAT(NOW(), '%W, %M, %Y')),
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id),
            CONCAT(NEW.animal_tag, ' has been confirmed and registered today the ', DATE_FORMAT(NOW(), '%W, %M, %Y')),
            NEW.animal_tag,
            UUID(), 'reminder');

    END IF;

END;


-- auto-generated definition
create table schedule_vaccination
(
    id                   int auto_increment
        primary key,
    vaccination_id       varchar(64) null,
    effective_date       date        not null,
    next_date            date        null,
    vaccine_quantity     int         null,
    vaccine_qnty_pending int         null,
    schedule_id          text        not null,
    qnty_unit            int         not null,
    qnty_per_cycle_unit  int         not null
);


drop procedure schedule_vaccination;

create
    definer = derek@localhost procedure schedule_vaccination(IN vaccination_details_id varchar(64), IN qnty int,
                                                             IN quantity_unit int, IN start_dt date, IN cycle int,
                                                             IN period int, IN qty_per_cycle int,
                                                             IN qty_per_cycle_unit int, OUT total int)
BEGIN

DECLARE effective_dt DATE;

SET effective_dt = start_dt;

    WHILE qnty > 0

        DO

			INSERT INTO schedule_vaccination (vaccination_id,
			                              effective_date,
			                              next_date,
			                              vaccine_quantity,
			                              vaccine_qnty_pending,
			                              schedule_id,
			                              qnty_per_cycle_unit,
			                              qnty_unit)
			VALUES (vaccination_details_id,
			        effective_dt,
			        DATE_ADD(effective_dt, INTERVAL period DAY),
			        qty_per_cycle,
			        qnty,
			        UUID(),
			        qty_per_cycle_unit,
			        quantity_unit );

            SET qnty = (qnty - (qty_per_cycle*cycle));

			SET effective_dt = DATE_ADD(effective_dt, INTERVAL period DAY);

			    UPDATE vaccines SET quantity = qnty WHERE id  = (SELECT vaccine_id
                                                         FROM vaccination_details
                                                         WHERE vaccination_details.id = vaccination_details_id);


	END WHILE;

    SET total = 1;

END;

