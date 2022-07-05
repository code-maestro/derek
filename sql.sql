CREATE TABLE farma(
  farmer_id int NOT NULL AUTO_INCREMENT,
 first_name varchar(50) NULL,
 last_name varchar(50) NULL,
 number_of_animals int,
 mail  varchar(50) NOT NULL,
 phone varchar(20) NULL,
 password varchar(50) NOT NULL,
 PRIMARY KEY (farmer_id),
);


CREATE TABLE symptoms (
 symptom_id int NOT NULL AUTO_INCREMENT,
 name varchar(50) NOT NULL,
 animal_id  int NOT NULL,
 PRIMARY KEY (symptom_id),
 FOREIGN KEY (animal_id) 
 REFERENCES animal (animal_id)
);

CREATE TABLE animals (
 animals_id  int NOT NULL AUTO_INCREMENT,
 animal_type varchar(40) NOT NULL,
 count varchar(20) NULL,
 PRIMARY KEY(animals_id)
);

CREATE TABLE animal (
 animal_id  int NOT NULL AUTO_INCREMENT,
 animal_name varchar(50) NOT NULL,
 animals_id int NOT NULL,
 is_sick varchar(5),
 PRIMARY KEY (animal_id)
 FOREIGN KEY (animals_id)
 REFERENCES animals (animals_id)
);