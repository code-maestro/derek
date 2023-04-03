create table animal
(
    id           int auto_increment
        primary key,
    created_date timestamp default CURRENT_TIMESTAMP not null,
    animal_tag   varchar(20)                         null,
    parent_tag   varchar(20)                         null,
    gender       varchar(6)                          null,
    dob          date                                null,
    reg_date     date                                null,
    animal_type  varchar(20)                         null,
    farma_id     varchar(50)                         null,
    confirmed    char                                not null
);

create definer = derek@localhost trigger animal_update
    before update
    on animal
    for each row
BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.animal_tag, "'s data been updated by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END;

create definer = derek@localhost trigger before_animal_delete
    before delete
    on animal
    for each row
BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), OLD.farma_id, CONCAT(OLD.animal_tag, " has been deleted by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = OLD.farma_id)));

END;

create definer = derek@localhost trigger delete_audit_mail
    after delete
    on animal
    for each row
BEGIN

     INSERT INTO triggered_emails (email_address,status,subject,farma_name,body,animal_tag,confirmation_id, template_name)
    VALUES ((SELECT mail FROM farma WHERE farma_id = OLD.farma_id),'N',
            CONCAT('DELETION OF ', OLD.animal_tag, ' ON ', DATE_FORMAT(NOW(), '%W, %M, %Y')),
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = OLD.farma_id),
            CONCAT(OLD.animal_tag, ' has been deleted from the Farma web application today the ', DATE_FORMAT(NOW(), '%W, %M, %Y')),
            OLD.animal_tag, uuid(), 'reminder');

END;

create definer = derek@localhost trigger new_born_confirm
    after update
    on animal
    for each row
BEGIN

     INSERT INTO triggered_emails (email_address,status,subject,farma_name,body,animal_tag,confirmation_id, template_name)
    VALUES ((SELECT mail FROM farma WHERE farma_id = NEW.farma_id),'N',
            CONCAT('REGISTRATION OF NEW BORN ', NEW.animal_tag, ' ON ', DATE_FORMAT(NOW(), '%W, %M, %Y')),
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id),
            CONCAT(NEW.animal_tag, ' has been confirmed and registered today the ', DATE_FORMAT(NOW(), '%W, %M, %Y')),
            NEW.animal_tag,
            UUID(), 'reminder');

END;

create table animals_at_farm
(
    id              int auto_increment
        primary key,
    list_of_animals json        null,
    farma_id        varchar(50) not null
);

create table audit_trail
(
    id          int auto_increment
        primary key,
    uuid        varchar(100)                        null,
    user_id     varchar(100)                        null,
    action      varchar(50)                         null,
    action_date timestamp default CURRENT_TIMESTAMP not null
);

create table breeding
(
    id                int auto_increment
        primary key,
    animal_id         int          null,
    breeding_date     date         null,
    expected_due_date date         null,
    breeding_uuid     varchar(100) null
);

create table disease
(
    id           int auto_increment
        primary key,
    disease_name varchar(100) not null,
    genre_id     int          not null,
    animal_type  varchar(25)  null
);

create table disease_genre
(
    id    int auto_increment
        primary key,
    genre varchar(120) not null
);

create table doctor_records
(
    id          int auto_increment
        primary key,
    animal_type varchar(20) null,
    diagnosis   text        null,
    disease_id  tinyint     null,
    animal_id   int         null
);

create table due_dates
(
    id               int auto_increment
        primary key,
    vaccination_date date        null,
    delivery_date    date        null,
    animal_id        varchar(50) null
);

create table farma
(
    id           int auto_increment
        primary key,
    created_date timestamp default CURRENT_TIMESTAMP not null,
    farma_id     varchar(120)                        null,
    first_name   varchar(50)                         null,
    last_name    varchar(50)                         null,
    mail         varchar(50)                         not null,
    phone        varchar(20)                         null,
    password     varchar(200)                        not null
);

create table feeding_schedule
(
    id                  int auto_increment
        primary key,
    feeding_tt_id       varchar(64) null,
    effective_date      date        not null,
    next_date           date        null,
    feeds_quantity      int         null,
    feeds_qnty_pending  int         null,
    schedule_id         text        not null,
    qnty_unit           int         not null,
    qnty_per_cycle_unit int         not null
);

create table feeding_timetable
(
    id                      int auto_increment
        primary key,
    tt_name                 varchar(100) null,
    animal_type             varchar(20)  null,
    cycle                   int          null,
    period int null,
    quantity_per_cycle      int          null,
    quantity_per_cycle_unit int          null,
    quantity                int          null,
    quantity_unit           int          null,
    first_feed_date         date         null,
    feeds_id                int          null,
    tt_id                   char(254)    not null
);

create definer = derek@localhost trigger new_tt_insert
    after insert
    on feeding_timetable
    for each row
BEGIN

    CALL farma_create_schedule (
        NEW.tt_id,
        NEW.quantity,
        NEW.quantity_unit,
        NEW.first_feed_date,
        NEW.cycle,
        NEW.cycle,
        NEW.quantity_per_cycle,
        NEW.quantity_per_cycle_unit,
        @total);

    UPDATE feeds
    SET quantity = (quantity-NEW.quantity)
    WHERE id = NEW.feeds_id;

END;

create table feeds
(
    id                    int auto_increment
        primary key,
    name                  varchar(50)                         not null,
    description           varchar(120)                        null,
    quantity              int                                 null,
    quantity_measure      int                                 null,
    stock_date            timestamp default CURRENT_TIMESTAMP null,
    expected_restock_date datetime                            null,
    animal_type           varchar(20)                         null,
    farma_id              varchar(120)                        null
);

create definer = derek@localhost trigger before_feeds_delete
    before delete
    on feeds
    for each row
BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), OLD.farma_id, CONCAT(OLD.name, " - ", OLD.quantity, " ", OLD.quantity_measure, " has been deleted by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = OLD.farma_id)));

END;

create definer = derek@localhost trigger feeds_update
    before update
    on feeds
    for each row
BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.name, " - ", NEW.quantity, " ", NEW.quantity_measure, " has been added by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END;

create definer = derek@localhost trigger new_feeds_stock
    after insert
    on feeds
    for each row
BEGIN

    -- statements
    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(), NEW.farma_id, CONCAT(NEW.name, " - ", NEW.quantity, " ", NEW.quantity_measure, " has been added by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = NEW.farma_id)));

END;

create table first_dates
(
    first_dates_id    int auto_increment
        primary key,
    vaccination_date  date null,
    feeds_stock       date null,
    insemination_date date null,
    animal_id         int  null
);

create table gestation_periods
(
    id          int auto_increment
        primary key,
    period int null,
    animal_type varchar(20) null
);

create table new_born
(
    id           int auto_increment
        primary key,
    new_born_tag varchar(200)                       null,
    parent_id    int                                null,
    dob          date                               not null,
    created_at   datetime default CURRENT_TIMESTAMP not null
);

create definer = derek@localhost trigger new_born_trigger
    after insert
    on new_born
    for each row
BEGIN

    INSERT INTO triggered_emails (email_address,status,subject,farma_name,body,animal_tag,confirmation_id, template_name)
    VALUES ((SELECT mail FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.parent_id)),'N',
            CONCAT(NEW.new_born_tag, ' IS EXPECTED TO HAVE BEEN BORN TODAY ', DATE_FORMAT(NOW(), '%W, %M, %Y')),
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id =(SELECT animal.farma_id FROM animal WHERE id = NEW.parent_id)),
            CONCAT((SELECT animal_tag FROM animal WHERE id = NEW.parent_id), ' is expected to have delivered a ', NEW.new_born_tag, ' ',DATE_FORMAT(NOW(), '%W, %M, %Y'),
                 '.','  Kindly log into the portal and confirm and register the new born - ', NEW.new_born_tag),
            (SELECT animal_tag FROM animal WHERE id = NEW.parent_id),
            UUID(), 'reminder');

END;

create table pending_farma
(
    id           int auto_increment
        primary key,
    created_date timestamp default CURRENT_TIMESTAMP not null,
    farma_id     varchar(120)                        null,
    first_name   varchar(50)                         null,
    last_name    varchar(50)                         null,
    mail         varchar(50)                         not null,
    phone        varchar(20)                         null,
    password     varchar(200)                        not null
);

create definer = derek@localhost trigger pending_farma_confirmation
    after insert
    on pending_farma
    for each row
BEGIN

    INSERT INTO otp (otp, otp_id, pending_id, status, expiry_timestamp)
	VALUES (TO_BASE64(AES_ENCRYPT((SELECT LEFT(CAST(RAND()*1000000000+999999 AS UNSIGNED),6)), NEW.farma_id)), UUID(), NEW.farma_id, 'A', DATE_ADD(NOW(), INTERVAL 5 MINUTE));

    INSERT INTO triggered_emails (email_address,status,subject,farma_name,body,confirmation_id,template_name)
    VALUES (NEW.mail, 'N','CONFIRMATION OTP CODE', CONCAT(NEW.first_name, ' ', NEW.last_name),
            CONCAT('Please Enter this single-use OTP code : ', (SELECT (AES_DECRYPT(FROM_BASE64(otp), pending_id)) FROM otp WHERE pending_id = NEW.farma_id)),  (SELECT otp_id FROM otp WHERE pending_id = NEW.farma_id), 'reminder');

END;

create table product_schedule
(
    id                    int auto_increment
        primary key,
    product_type_id       int       null,
    cycle                 int       not null,
    frequency             int       not null,
    expected_qnty         int       null,
    expected_qnty_measure int       null,
    animal_id             int       null,
    extract_date          timestamp not null
);

create table products
(
    id               int auto_increment
        primary key,
    name             varchar(120) null,
    product_type_id  int          null,
    quantity         int          null,
    quantity_measure int          null,
    animal_id        int          null
);

create table sick_animals
(
    id               int auto_increment
        primary key,
    animal_id        int                                  null,
    disease_id       int                                  null,
    reported_date    date                                 null,
    vet_id           varchar(120)                         null,
    appointment_date datetime                             null,
    confirmed        varchar(5) default 'N'               null,
    added_date       timestamp  default CURRENT_TIMESTAMP null,
    confirmed_id     varchar(60)                          not null
);

create definer = derek@localhost trigger new_sick_animal
    after insert
    on sick_animals
    for each row
BEGIN
    -- statements
    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(),
           (SELECT farma_id FROM animal WHERE id = NEW.animal_id),
           CONCAT( (SELECT animal_tag FROM animal WHERE id = NEW.animal_id), ' has been reported by',
               (SELECT CONCAT(first_name, ' ', last_name)
                FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))));

    INSERT INTO triggered_emails (user_name,email_address,status,subject,farma_name,body,animal_tag,confirmation_id, template_name, type)
    VALUES ((SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = NEW.vet_id),
            (SELECT email FROM vets WHERE vet_id = NEW.vet_id),
            'N',
            CONCAT('TREATMENT APPOINTMENT FOR ', (SELECT animal_tag FROM animal WHERE id = NEW.animal_id)),
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id)),
            CONCAT((SELECT CONCAT(first_name, ' ', last_name) FROM farma
                        WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id)),
                ' has scheduled an appointment for treatment of their ',
                (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
                ' against ', (SELECT disease_name FROM disease WHERE id = NEW.disease_id),
                ' on the ',  NEW.appointment_date, '  for details call ',
                (SELECT phone FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))),
            (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
            NEW.confirmed_id, 'confirmation', 'treatment');

END;

create definer = derek@localhost trigger treatment_appointment
    after update
    on sick_animals
    for each row
BEGIN

    INSERT INTO triggered_emails (user_name,email_address,status,subject,farma_name,body,animal_tag,confirmation_id, template_name)
    VALUES ((SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = NEW.vet_id),
            (SELECT email FROM vets WHERE vet_id = NEW.vet_id),
            'N',
            CONCAT('TREATMENT APPOINTMENT CONFIRMATION FOR ', (SELECT animal_tag FROM animal WHERE id = NEW.animal_id)),
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id)),
            CONCAT((SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = NEW.vet_id),
                ' has just confirmed an appointment for treatment of your ',
                (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
                ' against ', (SELECT disease_name FROM disease WHERE id = NEW.disease_id),
                ' on the ',  NEW.appointment_date, '  for details call ',
                (SELECT phone FROM vets WHERE vets.vet_id = NEW.vet_id)),
            (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
            NEW.confirmed_id, 'reminder');

END;

create table otp
(
    otp              varchar(60) not null
        primary key,
    otp_id           varchar(60) not null,
    pending_id       varchar(60) not null,
    status           char        not null,
    expiry_timestamp timestamp   not null,
    column_name      int         null
);

create definer = derek@localhost trigger verified_farma
    after update
    on otp
    for each row
BEGIN

        CALL farma_registration(
            NEW.pending_id,
            (SELECT first_name FROM pending_farma WHERE farma_id = NEW.pending_id),
            (SELECT last_name FROM pending_farma WHERE farma_id = NEW.pending_id),
            (SELECT mail FROM pending_farma WHERE farma_id = NEW.pending_id),
            (SELECT phone FROM pending_farma WHERE farma_id = NEW.pending_id),
            (SELECT password FROM pending_farma WHERE farma_id = NEW.pending_id));

    END;

create table symptom
(
    id           int auto_increment
        primary key,
    disease      varchar(200) not null,
    symptom_name varchar(100) not null,
    description  text         not null
);

create table treatment_history
(
    id                       int auto_increment
        primary key,
    animal_id                int         null,
    animal_tag               varchar(20) null,
    first_treatment_date     datetime    null,
    scheduled_treatment_date datetime    null,
    vet_id                   varchar(20) null
);

create table triggered_emails
(
    id              int auto_increment
        primary key,
    user_name       varchar(100) charset utf8mb3 null,
    email_address   varchar(100) charset utf8mb3 null,
    status          char                         not null,
    subject         varchar(100)                 null,
    farma_name      varchar(45)                  null,
    body            varchar(200) charset utf8mb3 not null,
    animal_tag      varchar(10)                  null,
    confirmation_id varchar(60)                  null,
    template_name   varchar(50)                  null,
    type            varchar(20)                  null
);

create table vaccination_details
(
    id           int auto_increment
        primary key,
    vaccine_id   int          null,
    first_date   date         null,
    next_date    date         null,
    last_date    date         null,
    no_pending   int          null,
    animal_id    int          null,
    vet_id       varchar(120) null,
    confirmed    char         not null,
    confirmed_id varchar(60)  not null
);

create definer = derek@localhost trigger animal_vaccination_schedule_update
    before update
    on vaccination_details
    for each row
BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
        VALUES(UUID(),(SELECT farma_id FROM animal WHERE id = NEW.animal_id), CONCAT( (SELECT animal_tag FROM animal WHERE id = NEW.animal_id), " has been created by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))));

END;

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
                ' against ', (SELECT disease_name FROM disease WHERE id IN (SELECT disease_id FROM vaccines WHERE id = NEW.vaccine_id )),
                ' on the ',  NEW.first_date, '  for details call ',
                (SELECT phone FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))),
            (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
            NEW.confirmed_id, 'confirmation', 'vaccination');

END;

create table vaccination_schedule
(
    id                     int auto_increment
        primary key,
    cycle_no               int         null,
    vaccination_details_id varchar(10) null,
    vaccination_date       date        null,
    next_vaccination_date  date        null
);

create table vaccines
(
    id               int auto_increment
        primary key,
    name             varchar(100) null,
    quantity         int          null,
    quantity_measure bigint       null,
    description      varchar(250) null,
    cycle            int          null,
    period int null,
    injection_area   varchar(100) null,
    disease_id       int          null,
    animal_type      varchar(100) null,
    farma_id         varchar(120) null
);

create table vets
(
    id      int auto_increment
        primary key,
    fname   varchar(50)  null,
    lname   varchar(50)  null,
    email   varchar(69)  null,
    phone   varchar(13)  null,
    station varchar(50)  null,
    vet_id  varchar(120) null
);


create
    definer = derek@localhost procedure farma_create_schedule(IN tt_id varchar(64), IN quantity int,
                                                              IN quantity_unit int, IN start_dt date, IN cycle int,
                                                              IN period int, IN qty_per_cycle int,
                                                              IN qty_per_cycle_unit int, OUT total int)
BEGIN

DECLARE effective_dt DATE;

SET effective_dt = start_dt;

    WHILE quantity > 0

        DO

			INSERT INTO feeding_schedule (feeding_tt_id, 
			                              effective_date, 
			                              next_date, 
			                              feeds_quantity, 
			                              feeds_qnty_pending, 
			                              schedule_id,
			                              qnty_per_cycle_unit,
			                              qnty_unit)
			VALUES (tt_id, 
			        effective_dt, 
			        DATE_ADD(effective_dt, INTERVAL period DAY), 
			        qty_per_cycle, 
			        quantity, 
			        UUID(),
			        qty_per_cycle_unit,
			        quantity_unit
			        );
 
            SET quantity = (quantity - (qty_per_cycle*cycle));

			SET effective_dt = DATE_ADD(effective_dt, INTERVAL period DAY);

	END WHILE;

    SET total = 1;

END;

create
    definer = derek@localhost procedure farma_registration(IN f_id varchar(120), IN fname varchar(100),
                                                           IN lname varchar(100), IN email varchar(50),
                                                           IN phone_number varchar(13), IN pwd varchar(200))
BEGIN

	INSERT INTO farma (farma_id, first_name, last_name, mail, phone, password)
	VALUES (f_id, fname, lname, email, phone_number, TO_BASE64(AES_ENCRYPT(pwd, f_id)));

	INSERT INTO animals_at_farm (farma_id) VALUES (f_id);

END;


create
    definer = derek@localhost procedure getNewBorns()
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
                    SET @new_born_tag = (SELECT CONCAT(UPPER(animal_type),'-000',(@new_max_id + 1)) FROM animal WHERE id = animalID);

                    -- 3. insert into new_born table
                    INSERT INTO animal(animal_tag,parent_tag,dob,reg_date,animal_type,farma_id,confirmed)
                    VALUES(@new_born_tag, @parent_tag, CURDATE(), CURDATE(), @animal_type, @farma_id, 'N' );

                    -- insert into new_born table
                    INSERT INTO new_born(new_born_tag,parent_id,dob)
                    VALUES(@new_born_tag, animalID, CURDATE());

            END LOOP getAnimalID;

	    CLOSE animalIDs;

    END;

create
    definer = derek@localhost procedure pending_farma_registration(IN f_id varchar(120), IN fname varchar(100),
                                                                   IN lname varchar(100), IN email varchar(50),
                                                                   IN phone_number varchar(13), IN pwd varchar(200))
BEGIN

	INSERT INTO pending_farma (farma_id, first_name, last_name, mail, phone, password)
	VALUES (f_id, fname, lname, email, phone_number, TO_BASE64(AES_ENCRYPT(pwd, f_id)));

END;

create
    definer =derek@localhost procedure procesDates(IN dates varchar(50), IN animal_kind varchar(50), IN the_id int,
                                              IN the_date date, IN animal_type varchar(25), IN animal_id int)
BEGIN

	INSERT INTO first_dates (dates, animal_kind, the_id)
	VALUES (the_date, animal_type, animal_id );

END;

create
    definer = derek@localhost procedure recordSick(IN animalID int, IN reportedDate date, IN vetID varchar(100),
                                                   IN appointmentDate datetime, IN diseaseID int,
                                                   IN symptomName varchar(200))
BEGIN

	INSERT INTO sick_animals
	(animal_id,disease_id,reported_date,vet_id,appointment_date, confirmed_id)
	VALUES
	( animalID, diseaseID, reportedDate, vetID, appointmentDate, UUID());

	INSERT INTO symptom
	(disease, symptom_name, description)
	VALUES ( diseaseID, symptomName, symptomName);

END;

create
    definer =derek@localhost procedure reschedule(IN quantity int, OUT total int)
BEGIN

DECLARE quantity_in_db INT;

SET quantity_in_db = (SELECT (quantity*quantity_measure) FROM feeds WHERE farma_id = 'fea8d3cf-d829-4d45-8c89-eb177672e7e9' AND id = 1);

IF quantity_in_db > quantity THEN

    SET total = 0;

    WHILE quantity > 0 DO

INSERT INTO disease (disease_name,
genre_id,
animal_type)
VALUES (quantity, 4, quantity);

        SET quantity = (quantity - 1000);

    END WHILE;

ELSE

    SET total = 1;

END IF;

END;

create
    definer = derek@localhost procedure select_expired_otp()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE otpid VARCHAR(60);
    DECLARE expiry_time DATETIME;
    DECLARE cur CURSOR FOR SELECT otp_id, expiry_timestamp FROM otp WHERE expiry_timestamp <= NOW() AND status = 'A';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO otpid, expiry_time;
        IF done THEN
            LEAVE read_loop;
        END IF;

        DELETE FROM otp WHERE otp_id = otpid;

    END LOOP;

    CLOSE cur;

END;

create
    definer = derek@localhost procedure testing_output(OUT tess int)
BEGIN

    SET tess = (SELECT COUNT(*) FROM otp);

    SELECT tess;

END;

create
    definer =derek@localhost procedure update_sick(IN animalID int, IN reportedDate date, IN vetID varchar(100),
                                              IN appointmentDate varchar(50), IN diseaseID int,
                                              IN symptomName varchar(200))
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

END;

create
    definer = derek@localhost procedure verify_otp(IN FARMA_ID varchar(120), IN SINGLE_OTP varchar(100),
                                                   OUT VERIFIED varchar(60))
BEGIN

        SET VERIFIED = IFNULL((SELECT pending_id FROM otp WHERE status = 'A' AND (AES_DECRYPT(FROM_BASE64(otp), FARMA_ID)) = SINGLE_OTP), 'FAILED');

        IF VERIFIED != 'FAILED' THEN
            SELECT VERIFIED;
            UPDATE otp SET status = 'I' WHERE pending_id = VERIFIED AND status= 'A';
        END IF;

        SELECT VERIFIED;

    END;

create definer = derek@localhost event evently on schedule
    every '1' DAY
        starts '2023-02-23 21:25:10'
    enable
    do
    BEGIN
    CALL getNewBorns();

    END;

create definer = derek@localhost event tested on schedule
    every '1' MINUTE
        starts '2023-03-11 16:45:24'
    enable
    do
    BEGIN
        CALL select_expired_otp();
    END;

