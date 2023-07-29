create
    definer = derek@localhost procedure update_sick(IN animalID int, IN reportedDate date, IN vetID varchar(100),
                                                    IN appointmentDate varchar(50), IN diseaseID int,
                                                    IN symptomName varchar(200))
BEGIN

	UPDATE sick_animals
	SET disease_id = diseaseID,
	reported_date = reportedDate,
	vet_id = vetID,
	appointment_date = CONVERT(appointmentDate, DATETIME)
	WHERE animal_id = animalID;

END;



create table if not exists farma.product_types
(
    type_id        varchar(60)  not null
        primary key,
    name           varchar(50)  not null,
    animal_type    varchar(50)  not null,
    farma_id       varchar(100) not null,
    price          int          not null,
    price_qnty     varchar(20)  not null,
    currency_code  char(3)      not null,
    production_age int          not null
);


drop trigger schedule_production;

create definer = derek@`%` trigger schedule_production
    after insert
    on product_projections
    for each row
BEGIN

    CALL schedule_production(
            NEW.projection_id,
            NEW.production_qnty * IF(NEW.production_period = 1, NEW.production_period * NEW.production_frequency,
                                     NEW.production_period / NEW.production_frequency),
            NEW.production_measure,
            NEW.product_start_date,
            NEW.product_end_date,
            IF(NEW.production_period = 1, NEW.production_period,
               NEW.production_period / NEW.production_frequency));

END;