
CREATE TABLE `first_dates` (
  `first_dates_id` int(11) NOT NULL,
  `vaccination_date` date DEFAULT NULL,
  `feeds_stock` date DEFAULT NULL,
  `insemination_date` date DEFAULT NULL,
  `animal_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `gestation_periods`
--

CREATE TABLE `gestation_periods` (
  `id` int(11) NOT NULL,
  `period` int(11) DEFAULT NULL,
  `animal_type` varchar(20) DEFAULT NULL,
  `ready_after` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gestation_periods`
--

INSERT INTO `gestation_periods` (`id`, `period`, `animal_type`, `ready_after`) VALUES
(1, 150, 'goat', 0),
(2, 152, 'sheep', 0),
(3, 283, 'cow', 0),
(4, 115, 'pig', 0);

-- --------------------------------------------------------

--
-- Table structure for table `new_born`
--

CREATE TABLE `new_born` (
  `id` int(11) NOT NULL,
  `new_born_tag` varchar(200) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `dob` date NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `new_born`
--
DELIMITER $$
CREATE TRIGGER `new_born_trigger` AFTER INSERT ON `new_born` FOR EACH ROW BEGIN

    INSERT INTO triggered_emails (email_address,status,subject,farma_name,body,animal_tag,confirmation_id, template_name)
    VALUES ((SELECT mail FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.parent_id)),'N',
            CONCAT(NEW.new_born_tag, ' IS EXPECTED TO HAVE BEEN BORN TODAY ', DATE_FORMAT(NOW(), '%W, %M, %Y')),
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id =(SELECT animal.farma_id FROM animal WHERE id = NEW.parent_id)),
            CONCAT((SELECT animal_tag FROM animal WHERE id = NEW.parent_id), ' is expected to have delivered a ', NEW.new_born_tag, ' ',DATE_FORMAT(NOW(), '%W, %M, %Y'),
                 '.','  Kindly log into the portal and confirm and register the new born - ', NEW.new_born_tag),
            (SELECT animal_tag FROM animal WHERE id = NEW.parent_id),
            UUID(), 'reminder');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `otp` varchar(60) NOT NULL,
  `otp_id` varchar(60) NOT NULL,
  `pending_id` varchar(60) NOT NULL,
  `status` char(1) NOT NULL,
  `expiry_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`otp`, `otp_id`, `pending_id`, `status`, `expiry_timestamp`) VALUES
('+e+jEnIbCysQ4gEWqbln+A==', 'f0d3ec13-e35c-11ed-ae52-8c1645602325', 'cb3189b5-d60e-47dd-8cda-4eb2d6a17f52', 'I', '2023-04-25 11:36:02'),
('+iV+6JyLAO8fWbE842bOnA==', '12719bd6-e382-11ed-ae52-8c1645602325', '258631d8-9576-42a3-ad74-9cffe2ab0e3a', 'I', '2023-04-25 15:59:22'),
('/QfZQpVwt11t1eC6OrWTeg==', 'f2ecd3e9-e523-11ed-b6f2-8c1645602325', '8044e855-838c-4bde-a9d4-663422d3bae1', 'I', '2023-04-27 17:52:07'),
('4cPhS+ZUzUzjhdpQVvd4vw==', 'd8e48e23-e366-11ed-ae52-8c1645602325', 'a44adda2-a41d-4cd9-a50c-0ec31728819b', 'I', '2023-04-25 12:44:13'),
('4RcYeI40V6zorrXq9yY9fg==', 'b239c4f4-e381-11ed-ae52-8c1645602325', '529a37c9-5d4d-4df7-b31b-0c1108918218', 'I', '2023-04-25 15:56:23'),
('9m/35fP7148v6tmTjKUTkg==', '923405b4-e37b-11ed-ae52-8c1645602325', 'daed7719-8ca5-4be8-ab53-525477991a5a', 'I', '2023-04-25 15:12:37'),
('9OtjpuGxUaGSTG7rejJWMA==', '752c1ca0-e383-11ed-ae52-8c1645602325', 'bf439c83-f4c0-4533-be09-9aa750135576', 'I', '2023-04-25 16:09:09'),
('ddPy/072WHDVYIYQaeEPKQ==', '57bc0894-e37c-11ed-ae52-8c1645602325', 'dd0dba0a-92fb-45f7-abff-80fbccaefbcc', 'I', '2023-04-25 15:18:20'),
('EmAdoEDh1QyJsZx4tooAfg==', '75fac5d0-e7ec-11ed-9901-8c1645602325', '0896d44f-70a4-48ec-ab51-a1dfd4417c16', 'A', '2023-05-01 06:55:30'),
('fYW845mcCqQpT4BlHYk2ig==', '2db576ac-e381-11ed-ae52-8c1645602325', 'df8bd5cb-fb4c-4bb6-ba19-bfb8c9edc3be', 'I', '2023-04-25 15:52:42'),
('heDbJokYcI2xlCZ4IHH1Bw==', '33d03878-e365-11ed-ae52-8c1645602325', 'a9a0eb04-bcda-4b50-bb24-8d6014fadbbe', 'I', '2023-04-25 12:32:43'),
('nnAykTl7dTJVLHGOdGOGoQ==', 'a58424a4-e37e-11ed-ae52-8c1645602325', '6d085003-b496-4490-8f10-3e3f9559679b', 'I', '2023-04-25 15:34:34'),
('O6V+5NfbiwJx70GNOUoxJA==', '5ea8b500-e3f0-11ed-8fd6-8c1645602325', '78d1e821-1bf3-4442-98b0-55bba5991f0f', 'I', '2023-04-26 05:08:46'),
('RK4KlOvYn7Q3llm/4AzuIg==', '3f308b49-e37d-11ed-ae52-8c1645602325', '035793ed-c2d4-406f-93c7-cb4554378fa2', 'I', '2023-04-25 15:24:32'),
('RK5TNAYmPsgH15ljU4FEKg==', '461cc3af-e693-11ed-9622-8c1645602325', '6f5e0d74-52c2-4150-b886-c53a0e7d0349', 'A', '2023-04-29 13:41:32'),
('rLfOAnc1vYnme9cnVmHH5g==', '4b3318a0-e37b-11ed-ae52-8c1645602325', '93f74a31-b67d-4300-8fec-3cd5c2806210', 'I', '2023-04-25 15:10:35'),
('sk0RYNmeXvXxKwjs0jpm5g==', '39fc76ca-e366-11ed-ae52-8c1645602325', 'f17065c7-b11c-45f9-a9e2-d2280aaaa28a', 'I', '2023-04-25 12:39:56'),
('Wb5wa7XT2T/rQ5HPrwh/RQ==', 'a9cc2fa5-e366-11ed-ae52-8c1645602325', 'f762ee7d-54dc-4b95-be2a-2a3a735d2b3a', 'I', '2023-04-25 12:42:56'),
('wgFPTcGjspAS8ooIN36ZMw==', 'c5aad30e-e37b-11ed-ae52-8c1645602325', '71b81e80-d026-4211-8392-27b3d525231c', 'I', '2023-04-25 15:14:06');

--
-- Triggers `otp`
--
DELIMITER $$
CREATE TRIGGER `verified_farma` AFTER UPDATE ON `otp` FOR EACH ROW BEGIN

        SET @VERIFIED = IFNULL((SELECT farma_id FROM farma WHERE farma_id = OLD.pending_id), 'NOTHING');

        IF @VERIFIED = 'NOTHING' THEN

             CALL farma_registration(
                    NEW.pending_id,
                    (SELECT first_name FROM pending_farma WHERE farma_id = NEW.pending_id),
                    (SELECT last_name FROM pending_farma WHERE farma_id = NEW.pending_id),
                    (SELECT mail FROM pending_farma WHERE farma_id = NEW.pending_id),
                    (SELECT phone FROM pending_farma WHERE farma_id = NEW.pending_id));

        END IF;

    END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pending_farma`
--

CREATE TABLE `pending_farma` (
  `id` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `farma_id` varchar(120) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `mail` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pending_farma`
--

INSERT INTO `pending_farma` (`id`, `created_date`, `farma_id`, `first_name`, `last_name`, `mail`, `phone`) VALUES
(1, '2023-04-25 11:33:03', 'cb3189b5-d60e-47dd-8cda-4eb2d6a17f52', 'jimmy', 'sse', 'ell889lle+kikks+@gmail.com', '345678'),
(2, '2023-04-25 12:28:04', 'cc60aed8-fa4a-4ead-a44c-a2d4f9ea8fd3', 'jimmy', 'sse', 'ell889lle+kisekks+@gmail', '345678'),
(3, '2023-04-25 12:32:11', 'a9a0eb04-bcda-4b50-bb24-8d6014fadbbe', 'jimmy', 'sse', 'ell889lle+ks+@gmail.com', '345678'),
(4, '2023-04-25 12:39:31', 'f17065c7-b11c-45f9-a9e2-d2280aaaa28a', 'martin', 'KIZITO', 'ell889lle+uouio+@gmail.com', '345678'),
(5, '2023-04-25 12:42:39', 'f762ee7d-54dc-4b95-be2a-2a3a735d2b3a', 'jimmy', 'sse', 'ell889lle+kks+@gmail.com', '345678'),
(6, '2023-04-25 12:43:58', 'a44adda2-a41d-4cd9-a50c-0ec31728819b', 'equiweb', 'sse', 'ell889lle+kk+@gmail.com', '345678'),
(7, '2023-04-25 15:10:20', '93f74a31-b67d-4300-8fec-3cd5c2806210', 'jimmy', 'sse', 'ell889lle+kik+@gmail.com', '345678'),
(8, '2023-04-25 15:12:19', 'daed7719-8ca5-4be8-ab53-525477991a5a', 'jimmy', 'sse', 'ell889lle+kis+@gmail.com', '345678'),
(9, '2023-04-25 15:13:45', '71b81e80-d026-4211-8392-27b3d525231c', 'martin', '65', 'ell889lle+uou6io+@gmail.com', '345678'),
(10, '2023-04-25 15:17:50', 'dd0dba0a-92fb-45f7-abff-80fbccaefbcc', 'jimmy', 'sse', 'ell889lle+uo===uio+@gmail.com', '345678'),
(11, '2023-04-25 15:24:18', '035793ed-c2d4-406f-93c7-cb4554378fa2', 'martin', '6', 'ell889lle+uo66uio+@gmail.com', '345678'),
(12, '2023-04-25 15:34:20', '6d085003-b496-4490-8f10-3e3f9559679b', 'jimmy', 'sse', 'ell889lle+kik435ks+@gmail.com', '345678'),
(13, '2023-04-25 15:52:27', 'df8bd5cb-fb4c-4bb6-ba19-bfb8c9edc3be', 'jimmy', 'sse', 'ell889lle+ki584676657kks+@gmail.com', '345678'),
(14, '2023-04-25 15:56:09', '529a37c9-5d4d-4df7-b31b-0c1108918218', 'equiweb', 'ew', 'ell889lle+22erwetro+@gmail.com', '123134134'),
(15, '2023-04-25 15:58:51', '258631d8-9576-42a3-ad74-9cffe2ab0e3a', 'jimmy', 'sse', 'ell889lle+ki435435kks+@gmail.com', '345678'),
(16, '2023-04-25 16:01:44', 'a5b97ea8-f924-4432-80ca-cc1e55320f8a', 'jimmy', 'sse', 'ell889lle+ki456456kks+@gmail.com', '345678'),
(17, '2023-04-25 16:02:32', '7b7fab85-3675-4d7c-808c-69b8542796bb', 'jimmy', 'sse', 'ell889lle+ki45rty6456kks+@gmail.com', '345678'),
(18, '2023-04-25 16:02:42', 'e8eb5133-56c0-4caf-a779-db51b72b3949', 'jimmy', 'sse', 'ell889lle+kik45625wregks+@gmail.com', '345678'),
(19, '2023-04-25 16:03:52', '2992966c-63ff-44a8-9ed5-944560be79a6', 'martin', '34', 'ell889lle+43uouio+@gmail.com', '345678'),
(20, '2023-04-25 16:08:46', 'bf439c83-f4c0-4533-be09-9aa750135576', 'jimmy', 'sse', 'ell889lle+kik2345435ks+@gmail.com', '345678'),
(21, '2023-04-26 05:08:23', '78d1e821-1bf3-4442-98b0-55bba5991f0f', 'jimmy', 'sse', 'ell889lle+ki32kks+@gmail.com', '345678'),
(22, '2023-04-27 17:50:08', '8044e855-838c-4bde-a9d4-663422d3bae1', 'damal', 'jhkhkjhk', 'ell889lle+22e09tro+@gmail.com', '+256726168888'),
(23, '2023-04-29 13:03:00', 'fc97b123-b86d-45ba-88b6-4a4261aa6492', 'damal', 'kamuli', 'ell889lle+22e12309tro+@gmail.com', '+256726168888'),
(24, '2023-04-29 13:05:39', 'b4f85101-edb8-4ac6-8809-6e80c154ea2f', 'damal', 'kamuli', 'ell889lle+22e1212309tro+@gmail.com', '+256726168888'),
(25, '2023-04-29 13:39:32', '6f5e0d74-52c2-4150-b886-c53a0e7d0349', 'damal', 'kamuli', 'ell889lle+2222192e09tro+@gmail.com', '+256726168888'),
(26, '2023-05-01 06:50:30', '0896d44f-70a4-48ec-ab51-a1dfd4417c16', 'damal', 'kamuli', 'ell889lle+343409tro+@gmail.com', '+256726168888');

--
-- Triggers `pending_farma`
--
DELIMITER $$
CREATE TRIGGER `pending_farma_confirmation` AFTER INSERT ON `pending_farma` FOR EACH ROW BEGIN

    INSERT INTO otp (otp, otp_id, pending_id, status, expiry_timestamp)
	VALUES (TO_BASE64(AES_ENCRYPT((SELECT LEFT(CAST(RAND()*1000000000+999999 AS UNSIGNED),6)), NEW.farma_id)), UUID(), NEW.farma_id, 'A', DATE_ADD(NOW(), INTERVAL 5 MINUTE));

    INSERT INTO triggered_emails (email_address,status,subject,farma_name,body,confirmation_id,template_name, type)
    VALUES (NEW.mail, 'N','CONFIRMATION OTP CODE', CONCAT(NEW.first_name, ' ', NEW.last_name),
            'Please Enter this single-use OTP code : ', (SELECT otp_id FROM otp WHERE pending_id = NEW.farma_id), 'otp',
            (SELECT otp FROM otp WHERE pending_id = NEW.farma_id));

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(120) DEFAULT NULL,
  `product_type_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `quantity_measure` int(11) DEFAULT NULL,
  `animal_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_schedule`
--

CREATE TABLE `product_schedule` (
  `id` int(11) NOT NULL,
  `product_type_id` int(11) DEFAULT NULL,
  `cycle` int(11) NOT NULL,
  `frequency` int(11) NOT NULL,
  `expected_qnty` int(11) DEFAULT NULL,
  `expected_qnty_measure` int(11) DEFAULT NULL,
  `animal_id` int(11) DEFAULT NULL,
  `extract_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pwd`
--

CREATE TABLE `pwd` (
  `id` int(11) NOT NULL,
  `farma_id` varchar(60) NOT NULL,
  `status` char(1) NOT NULL,
  `password` varchar(200) NOT NULL,
  `date_created` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pwd`
--

INSERT INTO `pwd` (`id`, `farma_id`, `status`, `password`, `date_created`) VALUES
(1, 'cb3189b5-d60e-47dd-8cda-4eb2d6a17f52', 'A', 'PeezuRzVGdno7mNmQREaeQ==', NULL),
(2, 'cc60aed8-fa4a-4ead-a44c-a2d4f9ea8fd3', 'I', 'Kwf7rQMfmzPN9BfdFlewTA==', NULL),
(3, 'a9a0eb04-bcda-4b50-bb24-8d6014fadbbe', 'A', 'qfynXERmUpZ9NRP435KBFg==', NULL),
(4, 'f17065c7-b11c-45f9-a9e2-d2280aaaa28a', 'A', '8AE3EzRWJjzX3VnlZV2L6A==', NULL),
(5, 'f762ee7d-54dc-4b95-be2a-2a3a735d2b3a', 'A', 'kk79LRAmTSoSLqb90PQiqg==', NULL),
(6, 'a44adda2-a41d-4cd9-a50c-0ec31728819b', 'A', '//UsZoKXXTj8lUTLQ3pmmw==', NULL),
(7, '93f74a31-b67d-4300-8fec-3cd5c2806210', 'A', 'BNRUQ2CPbsBkmvt2rmiWCA==', NULL),
(8, 'daed7719-8ca5-4be8-ab53-525477991a5a', 'A', 'qdnj7/AcAIj2z+5w9pBAsQ==', NULL),
(9, '71b81e80-d026-4211-8392-27b3d525231c', 'A', 'o9ky2yUBdJsCNgEv5QA5AA==', NULL),
(10, 'dd0dba0a-92fb-45f7-abff-80fbccaefbcc', 'A', 'FbRYsNLWQ/dmzkkIXggWqw==', NULL),
(11, '035793ed-c2d4-406f-93c7-cb4554378fa2', 'A', 'JTSKRACKRxw05IWEg3sIfA==', NULL),
(12, '6d085003-b496-4490-8f10-3e3f9559679b', 'A', 'wiFat5ZTdlXnfPVZVdrtPw==', NULL),
(13, 'df8bd5cb-fb4c-4bb6-ba19-bfb8c9edc3be', 'A', '6x70sRGGkOtE5ejBFPobOQ==', NULL),
(14, '529a37c9-5d4d-4df7-b31b-0c1108918218', 'A', '4o0GFTqrvm5l0GmsKCPD2w==', NULL),
(15, '258631d8-9576-42a3-ad74-9cffe2ab0e3a', 'A', 'XfyhKBZu1iyXZTwOBkfigg==', NULL),
(16, 'a5b97ea8-f924-4432-80ca-cc1e55320f8a', 'I', 'F9mBRFoiSashSp5juCs3nA==', NULL),
(17, '7b7fab85-3675-4d7c-808c-69b8542796bb', 'I', 'qNozfjSzMAi2N6vayy0Wig==', NULL),
(18, 'e8eb5133-56c0-4caf-a779-db51b72b3949', 'I', 'F9Dznp7KvvIRTVojqv9DUQ==', NULL),
(19, '2992966c-63ff-44a8-9ed5-944560be79a6', 'I', 'ZAQoqXrD3L4Xc1DL5OcN0g==', NULL),
(20, 'bf439c83-f4c0-4533-be09-9aa750135576', 'A', 'RwsNwVAIrDds/w+jwO1PAg==', NULL),
(21, '78d1e821-1bf3-4442-98b0-55bba5991f0f', 'A', 'IKHYtU9E0HyR5Mmoh+EwuQ==', NULL),
(22, '8044e855-838c-4bde-a9d4-663422d3bae1', 'A', 'i0T1Nqfb3ehpQcuvtZBrXA==', NULL),
(23, 'fc97b123-b86d-45ba-88b6-4a4261aa6492', 'I', 'zqx8mD3mHfyxphenGhjIpw==', NULL),
(24, 'b4f85101-edb8-4ac6-8809-6e80c154ea2f', 'I', 't9Zz/WNU+erjGNAY2GovLg==', NULL),
(25, '6f5e0d74-52c2-4150-b886-c53a0e7d0349', 'A', 'pPLOdwFMQZwfMQWl3RjlvQ==', NULL),
(26, '0896d44f-70a4-48ec-ab51-a1dfd4417c16', 'I', 'Xm7yZAmRKVpj9X+O9btuSQ==', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `schedule_vaccination`
--

CREATE TABLE `schedule_vaccination` (
  `id` int(11) NOT NULL,
  `vaccination_id` varchar(64) DEFAULT NULL,
  `effective_date` date NOT NULL,
  `next_date` date DEFAULT NULL,
  `vaccine_quantity` int(11) DEFAULT NULL,
  `vaccine_qnty_pending` int(11) DEFAULT NULL,
  `schedule_id` text NOT NULL,
  `qnty_unit` int(11) NOT NULL,
  `qnty_per_cycle_unit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sick_animals`
--

CREATE TABLE `sick_animals` (
  `id` int(11) NOT NULL,
  `animal_id` int(11) DEFAULT NULL,
  `disease_id` int(11) DEFAULT NULL,
  `reported_date` date DEFAULT NULL,
  `vet_id` varchar(120) DEFAULT NULL,
  `appointment_date` datetime DEFAULT NULL,
  `confirmed` varchar(5) DEFAULT 'N',
  `added_date` timestamp NULL DEFAULT current_timestamp(),
  `confirmed_id` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `sick_animals`
--
DELIMITER $$
CREATE TRIGGER `new_sick_animal` AFTER INSERT ON `sick_animals` FOR EACH ROW BEGIN
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
                ' against ', IFNULL((SELECT disease_name FROM disease WHERE id = NEW.disease_id), 'not specified'),
                ' on the ',  NEW.appointment_date, '  for details call ',
                (SELECT phone FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))),
            (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
            NEW.confirmed_id, 'confirmation', 'treatment');

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `treatment_appointment` AFTER UPDATE ON `sick_animals` FOR EACH ROW BEGIN

    INSERT INTO triggered_emails (user_name,email_address,status,subject,farma_name,body,animal_tag,confirmation_id, template_name)
    VALUES ((SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = NEW.vet_id),
            (SELECT email FROM vets WHERE vet_id = NEW.vet_id),
            'N',
            CONCAT('TREATMENT APPOINTMENT CONFIRMATION FOR ', (SELECT animal_tag FROM animal WHERE id = NEW.animal_id)),
            (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id)),
            CONCAT((SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = NEW.vet_id),
                ' has just confirmed an appointment for treatment of your ',
                (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
                ' against ', IFNULL((SELECT disease_name FROM disease WHERE id = NEW.disease_id), 'not specified'),
                ' on the ',  NEW.appointment_date, '  for details call ',
                (SELECT phone FROM vets WHERE vets.vet_id = NEW.vet_id)),
            (SELECT animal_tag FROM animal WHERE id = NEW.animal_id),
            NEW.confirmed_id, 'reminder');

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `symptom`
--

CREATE TABLE `symptom` (
  `id` int(11) NOT NULL,
  `disease_id` varchar(200) NOT NULL,
  `symptom_name` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `test_dbo`
--

CREATE TABLE `test_dbo` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test_dbo`
--

INSERT INTO `test_dbo` (`id`, `name`) VALUES
(1, '[{\"name\":\"John\",\"age\":30,\"city\":\"New York\"},{\"name\":\"Mary\",\"age\":25,\"city\":\"Los Angeles\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `treatment_history`
--

CREATE TABLE `treatment_history` (
  `id` int(11) NOT NULL,
  `animal_id` int(11) DEFAULT NULL,
  `animal_tag` varchar(20) DEFAULT NULL,
  `first_treatment_date` datetime DEFAULT NULL,
  `scheduled_treatment_date` datetime DEFAULT NULL,
  `vet_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `triggered_emails`
--

CREATE TABLE `triggered_emails` (
  `id` int(11) NOT NULL,
  `user_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `email_address` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `status` char(1) NOT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `farma_name` varchar(45) DEFAULT NULL,
  `body` varchar(200) CHARACTER SET utf8 NOT NULL,
  `animal_tag` varchar(20) DEFAULT NULL,
  `confirmation_id` varchar(60) DEFAULT NULL,
  `template_name` varchar(50) DEFAULT NULL,
  `type` varchar(60) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `triggered_emails`
--

INSERT INTO `triggered_emails` (`id`, `user_name`, `email_address`, `status`, `subject`, `farma_name`, `body`, `animal_tag`, `confirmation_id`, `template_name`, `type`, `date_created`) VALUES
(1, NULL, 'ell889lle+kikks+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, 'f0d3ec13-e35c-11ed-ae52-8c1645602325', 'otp', '+e+jEnIbCysQ4gEWqbln+A==', NULL),
(2, NULL, 'ell889lle+kisekks+@gmail', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, 'a077a3d6-e364-11ed-ae52-8c1645602325', 'otp', '1bbPtbPe8bKWg6wHFYlmqw==', NULL),
(3, NULL, 'ell889lle+ks+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, '33d03878-e365-11ed-ae52-8c1645602325', 'otp', 'heDbJokYcI2xlCZ4IHH1Bw==', NULL),
(4, NULL, 'ell889lle+uouio+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'martin KIZITO', 'Please Enter this single-use OTP code : ', NULL, '39fc76ca-e366-11ed-ae52-8c1645602325', 'otp', 'sk0RYNmeXvXxKwjs0jpm5g==', NULL),
(5, NULL, 'ell889lle+kks+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, 'a9cc2fa5-e366-11ed-ae52-8c1645602325', 'otp', 'Wb5wa7XT2T/rQ5HPrwh/RQ==', NULL),
(6, NULL, 'ell889lle+kk+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'equiweb sse', 'Please Enter this single-use OTP code : ', NULL, 'd8e48e23-e366-11ed-ae52-8c1645602325', 'otp', '4cPhS+ZUzUzjhdpQVvd4vw==', NULL),
(7, NULL, 'ell889lle+kik+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, '4b3318a0-e37b-11ed-ae52-8c1645602325', 'otp', 'rLfOAnc1vYnme9cnVmHH5g==', NULL),
(8, NULL, 'ell889lle+kis+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, '923405b4-e37b-11ed-ae52-8c1645602325', 'otp', '9m/35fP7148v6tmTjKUTkg==', NULL),
(9, NULL, 'ell889lle+uou6io+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'martin 65', 'Please Enter this single-use OTP code : ', NULL, 'c5aad30e-e37b-11ed-ae52-8c1645602325', 'otp', 'wgFPTcGjspAS8ooIN36ZMw==', NULL),
(10, NULL, 'ell889lle+uo===uio+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, '57bc0894-e37c-11ed-ae52-8c1645602325', 'otp', 'ddPy/072WHDVYIYQaeEPKQ==', NULL),
(11, NULL, 'ell889lle+uo66uio+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'martin 6', 'Please Enter this single-use OTP code : ', NULL, '3f308b49-e37d-11ed-ae52-8c1645602325', 'otp', 'RK4KlOvYn7Q3llm/4AzuIg==', NULL),
(12, NULL, 'ell889lle+kik435ks+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, 'a58424a4-e37e-11ed-ae52-8c1645602325', 'otp', 'nnAykTl7dTJVLHGOdGOGoQ==', NULL),
(13, NULL, 'ell889lle+ki584676657kks+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, '2db576ac-e381-11ed-ae52-8c1645602325', 'otp', 'fYW845mcCqQpT4BlHYk2ig==', NULL),
(14, NULL, 'ell889lle+22erwetro+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'equiweb ew', 'Please Enter this single-use OTP code : ', NULL, 'b239c4f4-e381-11ed-ae52-8c1645602325', 'otp', '4RcYeI40V6zorrXq9yY9fg==', NULL),
(15, NULL, 'ell889lle+ki435435kks+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, '12719bd6-e382-11ed-ae52-8c1645602325', 'otp', '+iV+6JyLAO8fWbE842bOnA==', NULL),
(16, NULL, 'ell889lle+ki456456kks+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, '79794559-e382-11ed-ae52-8c1645602325', 'otp', 'BFO6f0uACmvF3aEVkPzTJA==', NULL),
(17, NULL, 'ell889lle+ki45rty6456kks+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, '962d092e-e382-11ed-ae52-8c1645602325', 'otp', 'hvojPllaNe2auC+ZsJtjug==', NULL),
(18, NULL, 'ell889lle+kik45625wregks+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, '9c634d1e-e382-11ed-ae52-8c1645602325', 'otp', '6UfhzzX4W3xWetDuQyeSWw==', NULL),
(19, NULL, 'ell889lle+43uouio+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'martin 34', 'Please Enter this single-use OTP code : ', NULL, 'c5e0074f-e382-11ed-ae52-8c1645602325', 'otp', 'ZZxXa1ED9LSwJraujRLLPQ==', NULL),
(20, NULL, 'ell889lle+kik2345435ks+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, '752c1ca0-e383-11ed-ae52-8c1645602325', 'otp', '9OtjpuGxUaGSTG7rejJWMA==', NULL),
(21, NULL, 'ell889lle+ki32kks+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'jimmy sse', 'Please Enter this single-use OTP code : ', NULL, '5ea8b500-e3f0-11ed-8fd6-8c1645602325', 'otp', 'O6V+5NfbiwJx70GNOUoxJA==', NULL),
(22, NULL, 'ell889lle+22e09tro+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'damal jhkhkjhk', 'Please Enter this single-use OTP code : ', NULL, 'f2ecd3e9-e523-11ed-b6f2-8c1645602325', 'otp', '/QfZQpVwt11t1eC6OrWTeg==', NULL),
(23, NULL, 'ell889lle+22e12309tro+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'damal kamuli', 'Please Enter this single-use OTP code : ', NULL, '2b7bcd33-e68e-11ed-9622-8c1645602325', 'otp', '5Z2PfM+fMO0GThJwnmVKDQ==', NULL),
(24, NULL, 'ell889lle+22e1212309tro+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'damal kamuli', 'Please Enter this single-use OTP code : ', NULL, '89fceb99-e68e-11ed-9622-8c1645602325', 'otp', '43A5Zoij9tytz1n0/MZbQg==', NULL),
(25, NULL, 'ell889lle+2222192e09tro+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'damal kamuli', 'Please Enter this single-use OTP code : ', NULL, '461cc3af-e693-11ed-9622-8c1645602325', 'otp', 'RK5TNAYmPsgH15ljU4FEKg==', NULL),
(26, NULL, 'ell889lle+343409tro+@gmail.com', 'Y', 'CONFIRMATION OTP CODE', 'damal kamuli', 'Please Enter this single-use OTP code : ', NULL, '75fac5d0-e7ec-11ed-9901-8c1645602325', 'otp', 'EmAdoEDh1QyJsZx4tooAfg==', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vaccination_details`
--

CREATE TABLE `vaccination_details` (
  `id` int(11) NOT NULL,
  `vaccine_id` int(11) DEFAULT NULL,
  `first_date` date DEFAULT NULL,
  `next_date` date DEFAULT NULL,
  `last_date` date DEFAULT NULL,
  `no_pending` int(11) DEFAULT NULL,
  `animal_id` int(11) DEFAULT NULL,
  `vet_id` varchar(120) DEFAULT NULL,
  `confirmed` char(1) NOT NULL,
  `confirmed_id` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `vaccination_details`
--
DELIMITER $$
CREATE TRIGGER `animal_vaccination_schedule_update` BEFORE UPDATE ON `vaccination_details` FOR EACH ROW BEGIN

    INSERT INTO audit_trail(uuid, user_id, action)
        VALUES(UUID(),(SELECT farma_id FROM animal WHERE id = NEW.animal_id), CONCAT( (SELECT animal_tag FROM animal WHERE id = NEW.animal_id), " has been created by", (SELECT CONCAT(first_name, ' ', last_name) FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))));

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `new_animal_vaccination_schedule` AFTER INSERT ON `vaccination_details` FOR EACH ROW BEGIN
    -- statements
    INSERT INTO audit_trail(uuid, user_id, action)
    VALUES(UUID(),
           (SELECT farma_id FROM animal WHERE id = NEW.animal_id),
           CONCAT( (SELECT animal_tag FROM animal WHERE id = NEW.animal_id), ' has been created by',
               (SELECT CONCAT(first_name, ' ', last_name)
                FROM farma WHERE farma_id = (SELECT farma_id FROM animal WHERE id = NEW.animal_id))));

        CALL schedule_vaccination (
        NEW.id,
        (SELECT quantity FROM vaccines WHERE vaccines.id = NEW.vaccine_id),
        (SELECT quantity_measure FROM vaccines WHERE vaccines.id = NEW.vaccine_id),
        NEW.first_date,
        (SELECT cycle FROM vaccines WHERE vaccines.id = NEW.vaccine_id),
        (SELECT period FROM vaccines WHERE vaccines.id = NEW.vaccine_id),
        (SELECT qnty_per_cycle FROM vaccines WHERE vaccines.id = NEW.vaccine_id),
        (SELECT qnty_measure_per_cycle FROM vaccines WHERE vaccines.id = NEW.vaccine_id),
        @total);

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

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `vaccines`
--

CREATE TABLE `vaccines` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `quantity_measure` bigint(20) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `cycle` int(11) DEFAULT NULL,
  `period` int(11) DEFAULT NULL,
  `injection_area` varchar(100) DEFAULT NULL,
  `disease_id` int(11) DEFAULT NULL,
  `animal_type` varchar(100) DEFAULT NULL,
  `farma_id` varchar(120) DEFAULT NULL,
  `qnty_per_cycle` int(11) DEFAULT NULL,
  `qnty_measure_per_cycle` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vaccines`
--

INSERT INTO `vaccines` (`id`, `name`, `quantity`, `quantity_measure`, `description`, `cycle`, `period`, `injection_area`, `disease_id`, `animal_type`, `farma_id`, `qnty_per_cycle`, `qnty_measure_per_cycle`) VALUES
(1, 'saloswerwqerqwe', 60, 1000, '123', 2, 7, '123', 0, 'goat', '8044e855-838c-4bde-a9d4-663422d3bae1', 10, 1000);

-- --------------------------------------------------------

--
-- Table structure for table `vets`
--

CREATE TABLE `vets` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `email` varchar(69) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `station` varchar(50) DEFAULT NULL,
  `vet_id` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vets`
--

INSERT INTO `vets` (`id`, `fname`, `lname`, `email`, `phone`, `station`, `vet_id`) VALUES
(1, 'damal', 'kamuli', 'ell889lle+e09tro+@gmail.com', '', 'KAAZOOOff', '014375ef-2885-45aa-abdb-cc0980f1b7d0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `animals_at_farm`
--
ALTER TABLE `animals_at_farm`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_trail`
--
ALTER TABLE `audit_trail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `breeding`
--
ALTER TABLE `breeding`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disease`
--
ALTER TABLE `disease`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disease_genre`
--
ALTER TABLE `disease_genre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_records`
--
ALTER TABLE `doctor_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `due_dates`
--
ALTER TABLE `due_dates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farma`
--
ALTER TABLE `farma`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feeding_schedule`
--
ALTER TABLE `feeding_schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feeding_timetable`
--
ALTER TABLE `feeding_timetable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feeds`
--
ALTER TABLE `feeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `first_dates`
--
ALTER TABLE `first_dates`
  ADD PRIMARY KEY (`first_dates_id`);

--
-- Indexes for table `gestation_periods`
--
ALTER TABLE `gestation_periods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `new_born`
--
ALTER TABLE `new_born`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`otp`);

--
-- Indexes for table `pending_farma`
--
ALTER TABLE `pending_farma`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_schedule`
--
ALTER TABLE `product_schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pwd`
--
ALTER TABLE `pwd`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule_vaccination`
--
ALTER TABLE `schedule_vaccination`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sick_animals`
--
ALTER TABLE `sick_animals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `symptom`
--
ALTER TABLE `symptom`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_dbo`
--
ALTER TABLE `test_dbo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `treatment_history`
--
ALTER TABLE `treatment_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `triggered_emails`
--
ALTER TABLE `triggered_emails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccination_details`
--
ALTER TABLE `vaccination_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccines`
--
ALTER TABLE `vaccines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vets`
--
ALTER TABLE `vets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animal`
--
ALTER TABLE `animal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `animals_at_farm`
--
ALTER TABLE `animals_at_farm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `audit_trail`
--
ALTER TABLE `audit_trail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `breeding`
--
ALTER TABLE `breeding`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `disease`
--
ALTER TABLE `disease`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `disease_genre`
--
ALTER TABLE `disease_genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `doctor_records`
--
ALTER TABLE `doctor_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `due_dates`
--
ALTER TABLE `due_dates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `farma`
--
ALTER TABLE `farma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `feeding_schedule`
--
ALTER TABLE `feeding_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feeding_timetable`
--
ALTER TABLE `feeding_timetable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feeds`
--
ALTER TABLE `feeds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `first_dates`
--
ALTER TABLE `first_dates`
  MODIFY `first_dates_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gestation_periods`
--
ALTER TABLE `gestation_periods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `new_born`
--
ALTER TABLE `new_born`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pending_farma`
--
ALTER TABLE `pending_farma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_schedule`
--
ALTER TABLE `product_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pwd`
--
ALTER TABLE `pwd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `schedule_vaccination`
--
ALTER TABLE `schedule_vaccination`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sick_animals`
--
ALTER TABLE `sick_animals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `symptom`
--
ALTER TABLE `symptom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `test_dbo`
--
ALTER TABLE `test_dbo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `treatment_history`
--
ALTER TABLE `treatment_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `triggered_emails`
--
ALTER TABLE `triggered_emails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `vaccination_details`
--
ALTER TABLE `vaccination_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vaccines`
--
ALTER TABLE `vaccines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vets`
--
ALTER TABLE `vets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

DELIMITER $$
--
-- Events
--
CREATE  EVENT `evently` ON SCHEDULE EVERY 1 DAY STARTS '2023-02-23 21:25:10' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    CALL getNewBorns();

    END$$

CREATE  EVENT `tested` ON SCHEDULE EVERY 1 MINUTE STARTS '2023-04-29 16:27:24' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
        CALL select_expired_otp();
    END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
