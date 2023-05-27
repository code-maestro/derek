		

CREATE PROCEDURE auto_balance_history @pnInstitutionId int

--	Exec auto_balance_history 5

AS

DECLARE 

@ACCT_TYPE varchar(200),
@CLASS_CODE int,
@ACCT_NO varchar(200),
@BRANCH_NO int,
@BRANCH_NAME varchar(60),
@DISPLAY_BALANCE decimal(21,6), 
@GL_ACCT_NO varchar(200),
@GL_BALANCE decimal(21,6),
@DIFFERENCE decimal(21,6),
@GL_ACCT_DESC varchar(200),
@LOAN_DESC varchar(200),
@CATERGORY varchar(200)
		
DECLARE auto_balance_history CURSOR FOR
			-------------Principal balances --------
	select y.branch_no, br.name_1 as branch_name ,y.acct_type,  y.class_code, 'Principal Balances' as category,  p.description , isnull(sum(y.cur_bal),0) as Listing_Bal,
	replace(a.ACCT_NO,'**','0'+convert(varchar,y.branch_no)) gl_acct,  	g.description as GL_description, isnull(gb.cur_bal,0) as 'Gl_Bal', (isnull(gb.cur_bal,0)-isnull(sum(y.cur_bal),0)) as Diff
		   from ad_ln_cls_inter a, pc_cls_inter b,  ad_ln_cls x,  ln_display y,  ad_gb_branch br,    ad_ln_cls p,   gl_acct g,  gl_balances gb
	where						
	a.acct_no is not null								
			and a.inter_id = b.inter_id
			and b.acct_name in ('LN_PRIN_BAL_NO' )    and b.dep_loan = 'LN'
			and x.class_code = a.class_code   and x.status<>'closed'  and a.institution_id = x.institution_id
			and y.acct_type  = a.acct_type    and y.class_code = x.class_code  and y.status in ('Active')   and y.cur_bal>0  and  y.institution_id = x.institution_id
			and br.branch_no = y.branch_no    and br.institution_id = x.institution_id
			and p.class_code = y.class_code   and p.institution_id = x.institution_id
			and g.acct_type='GL'  and g.acct_no=replace(a.acct_no,'**','0'+convert(varchar,y.branch_no))
			and gb.crncy_id=1     and gb.gl_acct_id = g.gl_acct_id  and a.institution_id=gb.institution_id
			and y.institution_id=5
	group by y.branch_no,  br.name_1,  y.acct_type,  y.class_code,  p.description,  a.acct_no, 	g.description, gb.cur_bal    

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Union all            -------------NonAccrual balances --------
	select y.branch_no, br.name_1 as branch_name ,y.acct_type,  y.class_code, 'NonAccrual Balances' as category,  p.description , isnull(sum(y.cur_bal),0) as Listing_Bal,
	replace(a.ACCT_NO,'**','0'+convert(varchar,y.branch_no)) gl_acct,  	g.description as GL_description, isnull(gb.cur_bal,0) as 'Gl_Bal', (isnull(gb.cur_bal,0)-isnull(sum(y.cur_bal),0)) as Diff
		   from ad_ln_cls_inter a, pc_cls_inter b,  ad_ln_cls x,  ln_display y,  ad_gb_branch br,    ad_ln_cls p,   gl_acct g,  gl_balances gb
	where						
	a.acct_no is not null								
			and a.inter_id = b.inter_id
			and b.acct_name in ('LN_NACCR_BAL_NO' )    and b.dep_loan = 'LN'
			and x.class_code = a.class_code   and x.status<>'closed'  and a.institution_id = x.institution_id
			and y.acct_type  = a.acct_type    and y.class_code = x.class_code  and y.status in ('NonAccrual')   and y.cur_bal>0  and  y.institution_id = x.institution_id
			and br.branch_no = y.branch_no    and br.institution_id = x.institution_id
			and p.class_code = y.class_code   and p.institution_id = x.institution_id
			and g.acct_type='GL'  and g.acct_no=replace(a.acct_no,'**','0'+convert(varchar,y.branch_no))
			and gb.crncy_id=1     and gb.gl_acct_id = g.gl_acct_id  and a.institution_id=gb.institution_id
			and y.institution_id=5
	group by y.branch_no,  br.name_1,  y.acct_type,  y.class_code,  p.description,  a.acct_no, 	g.description, gb.cur_bal  

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Union all           -------------interest receivable on loans --------
	select y.branch_no, br.name_1 as branch_name ,y.acct_type,  y.class_code, 'Interest Receivable' as category,  p.description , isnull(sum(y.cur_bal),0) as Listing_Bal,
	replace(a.ACCT_NO,'**','0'+convert(varchar,y.branch_no)) gl_acct,  	g.description as GL_description, isnull(gb.cur_bal,0) as 'Gl_Bal', (isnull(gb.cur_bal,0)-isnull(sum(y.cur_bal),0)) as Diff
		   from ad_ln_cls_inter a, pc_cls_inter b,  ad_ln_cls x,  ln_display y,  ad_gb_branch br,    ad_ln_cls p,   gl_acct g,  gl_balances gb
	where						
	a.acct_no is not null								
			and a.inter_id = b.inter_id
			and b.acct_name in ('INT_REC_NO' )    and b.dep_loan = 'LN'
			and x.class_code = a.class_code   and x.status<>'closed'  and a.institution_id = x.institution_id
			and y.acct_type  = a.acct_type    and y.class_code = x.class_code  and y.status in ('Active')    and  y.institution_id = x.institution_id
			and br.branch_no = y.branch_no    and br.institution_id = x.institution_id
			and p.class_code = y.class_code   and p.institution_id = x.institution_id
			and g.acct_type='GL'  and g.acct_no=replace(a.acct_no,'**','0'+convert(varchar,y.branch_no))
			and gb.crncy_id=1     and gb.gl_acct_id = g.gl_acct_id  and a.institution_id=gb.institution_id
			and y.institution_id=5
	group by y.branch_no,  br.name_1,  y.acct_type,  y.class_code,  p.description,  a.acct_no, 	g.description, gb.cur_bal   

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Union all           -------------unearned interest on loans --------
	select y.branch_no, br.name_1 as branch_name ,y.acct_type,  y.class_code, 'Unearned interest' as category,  p.description , isnull(sum(y.cur_bal),0) as Listing_Bal,
	replace(a.ACCT_NO,'**','0'+convert(varchar,y.branch_no)) gl_acct,  	g.description as GL_description, isnull(gb.cur_bal,0) as 'Gl_Bal', (isnull(gb.cur_bal,0)-isnull(sum(y.cur_bal),0)) as Diff
		   from ad_ln_cls_inter a, pc_cls_inter b,  ad_ln_cls x,  ln_display y,  ad_gb_branch br,    ad_ln_cls p,   gl_acct g,  gl_balances gb
	where						
	a.acct_no is not null								
			and a.inter_id = b.inter_id
			and b.acct_name in ('INT_UNEARN_NO')    and b.dep_loan = 'LN'
			and x.class_code = a.class_code   and x.status<>'closed'  and a.institution_id = x.institution_id
			and y.acct_type  = a.acct_type    and y.class_code = x.class_code  and y.status in ('Active')    and  y.institution_id = x.institution_id
			and br.branch_no = y.branch_no    and br.institution_id = x.institution_id
			and p.class_code = y.class_code   and p.institution_id = x.institution_id
			and g.acct_type='GL'  and g.acct_no=replace(a.acct_no,'**','0'+convert(varchar,y.branch_no))
			and gb.crncy_id=1     and gb.gl_acct_id = g.gl_acct_id  and a.institution_id=gb.institution_id
			and y.institution_id=5
	group by y.branch_no,  br.name_1,  y.acct_type,  y.class_code,  p.description,  a.acct_no, 	g.description, gb.cur_bal   

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Union all           -------------interest in arrears on loans --------
	select y.branch_no, br.name_1 as branch_name ,y.acct_type,  y.class_code, 'NonAccrual Interest' as category,  p.description , isnull(sum(y.cur_bal),0) as Listing_Bal,
	replace(a.ACCT_NO,'**','0'+convert(varchar,y.branch_no)) gl_acct,  	g.description as GL_description, isnull(gb.cur_bal,0) as 'Gl_Bal', (isnull(gb.cur_bal,0)-isnull(sum(y.cur_bal),0)) as Diff
		   from ad_ln_cls_inter a, pc_cls_inter b,  ad_ln_cls x,  ln_display y,  ad_gb_branch br,    ad_ln_cls p,   gl_acct g,  gl_balances gb
	where						
	a.acct_no is not null								
			and a.inter_id = b.inter_id
			and b.acct_name in ('NACCR_INT_REC_NO')    and b.dep_loan = 'LN'
			and x.class_code = a.class_code   and x.status<>'closed'  and a.institution_id = x.institution_id
			and y.acct_type  = a.acct_type    and y.class_code = x.class_code  and y.status in ('Nonaccrual')     and  y.institution_id = x.institution_id
			and br.branch_no = y.branch_no    and br.institution_id = x.institution_id
			and p.class_code = y.class_code   and p.institution_id = x.institution_id
			and g.acct_type='GL'  and g.acct_no=replace(a.acct_no,'**','0'+convert(varchar,y.branch_no))
			and gb.crncy_id=1     and gb.gl_acct_id = g.gl_acct_id  and a.institution_id=gb.institution_id
			and y.institution_id=5
	group by y.branch_no,  br.name_1,  y.acct_type,  y.class_code,  p.description,  a.acct_no, 	g.description, gb.cur_bal   

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Union all           -------------Late fees on loans --------
	select y.branch_no, br.name_1 as branch_name ,y.acct_type,  y.class_code, 'Late fees' as category,  p.description , isnull(sum(y.cur_bal),0) as Listing_Bal,
	replace(a.ACCT_NO,'**','0'+convert(varchar,y.branch_no)) gl_acct,  	g.description as GL_description, isnull(gb.cur_bal,0) as 'Gl_Bal', (isnull(gb.cur_bal,0)-isnull(sum(y.cur_bal),0)) as Diff
		   from ad_ln_cls_inter a, pc_cls_inter b,  ad_ln_cls x,  ln_display y,  ad_gb_branch br,    ad_ln_cls p,   gl_acct g,  gl_balances gb
	where						
	a.acct_no is not null								
			and a.inter_id = b.inter_id
			and b.acct_name in ('LATE_FEE_REC_NO')    and b.dep_loan = 'LN'
			and x.class_code = a.class_code   and x.status<>'closed'  and a.institution_id = x.institution_id
			and y.acct_type  = a.acct_type    and y.class_code = x.class_code   and  y.institution_id = x.institution_id
			and br.branch_no = y.branch_no    and br.institution_id = x.institution_id
			and p.class_code = y.class_code   and p.institution_id = x.institution_id
			and g.acct_type='GL'  and g.acct_no=replace(a.acct_no,'**','0'+convert(varchar,y.branch_no))
			and gb.crncy_id=1     and gb.gl_acct_id = g.gl_acct_id  and a.institution_id=gb.institution_id
			and y.institution_id=5
	group by y.branch_no,  br.name_1,  y.acct_type,  y.class_code,  p.description,  a.acct_no, 	g.description, gb.cur_bal   

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Union all           ----------------Loan Fees on loans --------
	select y.branch_no, br.name_1 as branch_name ,y.acct_type,  y.class_code, 'Loan Fees' as category,  p.description , isnull(sum(y.cur_bal),0) as Listing_Bal,
	replace(a.ACCT_NO,'**','0'+convert(varchar,y.branch_no)) gl_acct,  	g.description as GL_description, isnull(gb.cur_bal,0) as 'Gl_Bal', (isnull(gb.cur_bal,0)-isnull(sum(y.cur_bal),0)) as Diff
		   from ad_ln_cls_inter a, pc_cls_inter b,  ad_ln_cls x,  ln_display y,  ad_gb_branch br,    ad_ln_cls p,   gl_acct g,  gl_balances gb
	where						
	a.acct_no is not null								
			and a.inter_id = b.inter_id
			and b.acct_name in ('LOAN_FEE_REC_NO')    and b.dep_loan = 'LN'
			and x.class_code = a.class_code   and x.status<>'closed'  and a.institution_id = x.institution_id
			and y.acct_type  = a.acct_type    and y.class_code = x.class_code   and  y.institution_id = x.institution_id
			and br.branch_no = y.branch_no    and br.institution_id = x.institution_id
			and p.class_code = y.class_code   and p.institution_id = x.institution_id
			and g.acct_type='GL'  and g.acct_no=replace(a.acct_no,'**','0'+convert(varchar,y.branch_no))
			and gb.crncy_id=1     and gb.gl_acct_id = g.gl_acct_id  and a.institution_id=gb.institution_id
			and y.institution_id=5
	group by y.branch_no,  br.name_1,  y.acct_type,  y.class_code,  p.description,  a.acct_no, 	g.description, gb.cur_bal   order by 1,3 

	OPEN auto_balance_history

	FETCH  auto_balance_history INTO  @ACCT_TYPE,@CLASS_CODE,@ACCT_NO,@BRANCH_NO,@BRANCH_NAME,@DISPLAY_BALANCE,@GL_ACCT_NO,@GL_BALANCE,@DIFFERENCE,@GL_ACCT_DESC,@LOAN_DESC,@CATERGORY
	
INSERT INTO auto_balance_history (Branch_no,branch_name,acct_type,class_code,category,List_description,Listing_Bal,GL_Interface,GL_description,GL_Balance,Diff,create_dt,rpt_type)
				VALUES (@BRANCH_NO,@BRANCH_NAME,@ACCT_TYPE,@CLASS_CODE,@CATERGORY,@LOAN_DESC,@DISPLAY_BALANCE,@GL_ACCT_NO,@GL_ACCT_DESC,@GL_BALANCE,@DIFFERENCE)

	
	FETCH  auto_balance_history INTO  @ACCT_TYPE,@CLASS_CODE,@ACCT_NO,@BRANCH_NO,@BRANCH_NAME,@DISPLAY_BALANCE,@GL_ACCT_NO,@GL_BALANCE,@DIFFERENCE,@GL_ACCT_DESC,@LOAN_DESC,@CATERGORY
  
	END

CLOSE auto_balance_history

DEALLOCATE auto_balance_history