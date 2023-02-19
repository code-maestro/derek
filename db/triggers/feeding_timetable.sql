create definer = derek@localhost trigger new_tt_insert
    after insert
    on feeding_timetable
    for each row
BEGIN

    CALL farma_create_schedule (
        NEW.tt_id,
        NEW.quantity,
        NEW.quantity_unit,
        NEW.first_feed_date,
        NEW.cycle,
        NEW.cycle,
        NEW.quantity_per_cycle,
        NEW.quantity_per_cycle_unit,
        @total);

    UPDATE feeds
    SET quantity = (quantity-NEW.quantity)
    WHERE id = NEW.feeds_id;

END;

