
DELIMITER //

ALTER PROCEDURE reschedule
(IN quantity INT, OUT total INT)

BEGIN

DECLARE quantity_in_db INT;

SET quantity_in_db = (SELECT (quantity*quantity_measure) FROM feeds WHERE farma_id = 'fea8d3cf-d829-4d45-8c89-eb177672e7e9' AND id = 1);

IF quantity_in_db > quantity THEN

    SET total = 0;

    WHILE quantity >= 0 DO

        SET quantity = (quantity - 1000);

    END WHILE;

ELSE

    SET total = 1;

END IF;

END //

DELIMITER ;


CALL reschedule(5000, @total);

BEGIN

		SET @feeds_id = (SELECT A.id FROM feeds A, feeding_timetable B WHERE B.feeds_id = A.id AND A.farma_id = FID AND A.animal_type = ANIMAL_TYPE);
		SET @total_qnty = (SELECT A.quantity*A.quantity_measure FROM feeds A, feeding_timetable B WHERE A.farma_id = FID AND A.id = B.feeds_id);
		SET @tt_id = (SELECT id FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @qnty_per = (SELECT quantity_per_cycle*quantity_per_cycle_unit FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @feeding_freq = (SELECT cycle FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @feeding_times = (SELECT period FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @period_planned = (SELECT planned_period FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @period_planned_time = (SELECT planned_period_time FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @first_feed_date = (SELECT first_feed_date FROM feeding_timetable WHERE feeds_id = @feeds_id);
		SET @next_feed_date = (SELECT next_feed_date FROM feeding_timetable WHERE feeds_id = @feeds_id );

		WHILE @total_qnty >= 0 DO

			INSERT INTO feeding_schedule 
			(feeding_tt_id, tt_name, effective_date, next_date, pending, feeds_qnty_pending)
			VALUES
			(UUID(), TT_NAME, @first_feed_date, @next_feed_date, @qnty_per, @total_qnty);


			SET @total_qnty = @total_qnty - @qnty_per;

			SET @first_feed_date = DATE_ADD(@first_feed_date, INTERVAL @feeding_freq DAY);
			
			SET @next_feed_date = TIMESTAMPADD(DAY, @feeding_freq, @next_feed_date);

		END WHILE;

	END

