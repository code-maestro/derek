USE staging
go

SELECT * FROM rm_acct

SELECT * FROM ad_gb_rsm

SELECT *  FROM rm_acct_bk1

SELECT cust_no, rim_no, Phone_2, first_name, last_name, Address_line_1, phone_1 
FROM v_rm_acct
WHERE rim_type  = 'Personal'
AND first_name = 'Ssebabi'
AND last_name = 'Martin'

SELECT password, create_dt FROM rm_services_rel WHERE rim_no = 250066
--WHERE acct_no = '01-07-00-1150305'


-- AAC0213747	232680	265776660095	Nabuuma	Jamirah	BUTENGA TC	265776660095