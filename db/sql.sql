-- INSERT INTO disease_genre (genre)
-- VALUES 
-- ('Nutrional Defects'),
-- ('Bacterial Diseases'),
-- ('Viral Diseases'),
-- ('fungal Diseases'),
-- ('Protozoan Diseases')


-- INSERT INTO disease
-- (disease_name, genre_id)
-- VALUES 
-- ('Pneumonia', 2),
-- ('Tetanus', 2),
-- ('Atrophic Rhinitis', 2),
-- ('Anthrax', 2),
-- ('Blackleg', 2),
-- ('Brucellosis', 2),
-- ('pullorum', 2)


-- -- FUNGAL
-- INSERT INTO disease
-- (disease_name, genre_id)
-- VALUES ('Foot Rot', 4), ('Calf Diphtheria', 4)


-- -- ROTOZOAN DISEASE 
-- INSERT INTO disease
-- (disease_name, genre_id)
-- VALUES ('Coccidiosis', 5)


-- -- VIRAL DISEASES
-- INSERT INTO disease
-- (disease_name, genre_id)
-- VALUES
-- ('Cholera', 3),
-- ('Equine Encephalomyelitis', 3),
-- ('Hemorrhagic Septicemia', 3),
-- ('Newcastle', 3),
-- ('Warts', 3)


-- ALTER TABLE `new_born` ADD `reg_date` DATE NULL DEFAULT NULL AFTER `dob`;
-- ALTER TABLE `at_farm` ADD `3` VARCHAR(20) NULL DEFAULT NULL AFTER `2`, ADD `4` VARCHAR(20) NULL DEFAULT NULL AFTER `3`, ADD `5` VARCHAR(20) NULL DEFAULT NULL AFTER `4`, ADD `6` VARCHAR(20) NULL DEFAULT NULL AFTER `5`, ADD `7` VARCHAR(20) NULL DEFAULT NULL AFTER `6`, ADD `8` TEXT NULL DEFAULT NULL AFTER `7`;

--  SELECT id, list_of_animals 
--  FROM at_farm 
--  WHERE list_of_animals IS NOT NULL;

-- UPDATE y SET x=JSON_ARRAY_APPEND(x,"$","#");

-- DEREK DATA
INSERT INTO vaccines
(name, description, number_of_vaccinations, cycle, period, injection_area, animal_type)
VALUES
('One Shot Ultra 7', 'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous', 3, 1, 4, 'behind left ear', 'cow'),
('One Shot Ultra 8', 'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous', 2, 1, 4, 'behind left ear', 'cow'),
('Piliguard Pinkeye + 7', 'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous', 1, 2, 4, 'behind left ear', 'cow'),
('Alpha-7/MB-1', 'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous', 4, 4, 4, 'behind left ear', 'cow'),
('SolidBac Pinkeye IR/PR Implants', 'contains leukotoxoid to neutralize lung-damaging leukotoxins. Give 2 ml subcutaneous',1, 1, 1, 'behind left ear', 'cow')


-- QUERY TO EXECUTE FOE PENDING VACCINATION ANIMALS
SELECT C.animal_tag, A.first_date, A.next_date, A.last_date, B.no_of_vaccinations, A.no_pending
FROM vaccination_details A, 
vaccines B, 
animal C, 
vets D 
WHERE A.vet_id = D.vet_id 
AND A.no_pending > 0 
AND A.no_pending IS NOT NULL
AND B.id = A.vaccine_id 
AND A.last_date > CURDATE();



-- GESTATION PERIODS FOR ANIMALS
INSERT INTO 
gestation_period (period,animal_type)
VALUES 
(31, 'rabbit'),
(150, 'goat'),
(147, 'sheep'),
(283, 'cow'),
(125, 'pig')


