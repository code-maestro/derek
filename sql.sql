INSERT INTO disease_genre (genre)
VALUES ('Nutrional Defects'),
('Bacterial Diseases'),
('Viral Diseases'),
('fungal Diseases'),
('Protozoan Diseases')


INSERT INTO disease
(disease_name, genre_id)
VALUES 
('Pneumonia', 2),
('Tetanus', 2),
('Atrophic Rhinitis', 2),
('Anthrax', 2),
('Blackleg', 2),
('Brucellosis', 2),
('pullorum', 2)


-- FUNGAL
INSERT INTO disease
(disease_name, genre_id)
VALUES ('Foot Rot', 4), ('Calf Diphtheria', 4)


-- ROTOZOAN DISEASE 
INSERT INTO disease
(disease_name, genre_id)
VALUES ('Coccidiosis', 5)


-- VIRAL DISEASES
INSERT INTO disease
(disease_name, genre_id)
VALUES
('Cholera', 3),
('Equine Encephalomyelitis', 3),
('Hemorrhagic Septicemia', 3),
('Newcastle', 3),
('Warts', 3)
