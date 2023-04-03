  
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




