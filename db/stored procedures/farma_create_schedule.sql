create
    definer = derek@`%` procedure farma_create_schedule(IN tt_id varchar(64), IN quantity int, IN quantity_unit int,
                                                        IN start_dt date, IN cycle int, IN period int,
                                                        IN qty_per_cycle int, IN qty_per_cycle_unit int, OUT total int)
BEGIN

DECLARE effective_dt DATE;

SET effective_dt = start_dt;

    WHILE quantity > 0

        DO

			INSERT INTO feeding_schedule (feeding_tt_id, 
			                              effective_date, 
			                              next_date, 
			                              feeds_quantity, 
			                              feeds_qnty_pending, 
			                              schedule_id,
			                              qnty_per_cycle_unit,
			                              qnty_unit)
			VALUES (tt_id, 
			        effective_dt, 
			        DATE_ADD(effective_dt, INTERVAL period DAY), 
			        qty_per_cycle, 
			        quantity, 
			        UUID(),
			        qty_per_cycle_unit,
			        quantity_unit
			        );
 
            SET quantity = (quantity - (qty_per_cycle*cycle));

			SET effective_dt = DATE_ADD(effective_dt, INTERVAL period DAY);

	END WHILE;

    SET total = 1;

END;

