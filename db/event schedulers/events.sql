-- 1. NEW BORN ALERT

delimiter |

CREATE EVENT IF NOT EXISTS animals_due_tracker

    ON SCHEDULE

        EVERY  1 DAY

    COMMENT 'EXPECTING ANIMALS DELIVERY TRACKER'

    DO
    
        BEGIN
           
           CALL getNewBorns();

        END |

delimiter ;