
CREATE EVENT SESSION test_event 
ON SCHEDULE EVERY 1 DAY STARTS '2022-10-08 09:03:46' 
ON COMPLETION NOT PRESERVE ENABLE 
DO INSERT INTO new_born( new_born_tag, gender, name, animal_id, dob, reg_date)
   	VALUES('Test', 'ALTER', 'EVENT', 3,GETDATE(), GETDATE());
