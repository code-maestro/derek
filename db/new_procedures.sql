  
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

    SELECT mail INTO email FROM farma WHERE mail = gmail;

    SELECT farma_id INTO f_id FROM farma WHERE mail = gmail;

    IF email = gmail THEN

        INSERT INTO otp (otp,otp_id,pending_id,status,expiry_timestamp)
        VALUES (TO_BASE64(AES_ENCRYPT((SELECT LEFT(CAST(RAND()*1000000000+999999 AS UNSIGNED),6)), f_id)), UUID(),
                   f_id, 'A', DATE_ADD(NOW(), INTERVAL 5 MINUTE));

            INSERT INTO triggered_emails (email_address,status,subject,farma_name,body,confirmation_id, template_name, type)
    VALUES ( email, 'N', 'PASSWORD RESET SINGLE-USE OTP', 
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = f_id),
                ' Please Enter this single-use OTP code :  ', f_id,'otp',
            (SELECT (AES_DECRYPT(FROM_BASE64(otp), pending_id)) FROM otp WHERE id = LAST_INSERT_ID()));

    END IF;

END;

