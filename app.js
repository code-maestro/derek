// GLOBAL CONFIGURATIONS/variables
const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');
const storage = require("store2");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { default: store } = require('store2');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const hbs = require('nodemailer-express-handlebars');
const dotenv = require("dotenv");
const cron = require('node-cron');
const logger = require('./util/logger');


dotenv.config();

// // REMOTE DATABASE CONNECTIONS
// const connection = mysql.createConnection({
//     host: 'db4free.net',
//     user: 'farma_v1',
//     password: '581610a5',
//     database: 'farma_v1'
// });


// LOCAL DATABASE CONNECTIONS
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'derek',
    password: 'pass',
    database: 'farma'
});

// EXPRESS HOUSEKEEPING
const app = express();

// Global variables
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: "session",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// FILE (image) uploads
// Set The Storage Engine
const upload = multer.diskStorage({
    destination: 'static/images/',
    filename: function (request, file, cb) {
        console.log(Date.now() + path.extname(file.originalname));
        storage('img_url', Date.now() + path.extname(file.originalname));
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const uploadImage = multer({
    storage: upload,
    limits: { fileSize: 1000000 },
    fileFilter: function (request, file, cb) {
        checkFileType(file, cb);
    }
}).single('animal_image');


// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    console.log('file');
    console.log(file);
    console.log('cb');
    console.log(file);

    storage('img_name', `http://localhost:4200/images/${file.originalname}`);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


// Schedule tasks to be run on the server.
cron.schedule('*/30 * * * * *', function () {
    getTriggeredEmails();
});


// Get data from backend endpoint
async function getTriggeredEmails() {

    const sql_query = `SELECT id, user_name, email_address, status, subject, farma_name, body, animal_tag, confirmation_id, template_name, (SELECT AES_DECRYPT(FROM_BASE64(type),(SELECT A.pending_id FROM otp A WHERE A.otp_id = confirmation_id))) as suotp FROM triggered_emails WHERE status = 'N';`

    // Execute SQL query that'll insert into the vaccines table
    connection.query(sql_query, function (error, results, fields) {

        if (error) {

            logger.error(error.errno + error.message);

        } else {

            results.forEach(email => {

                const email_content = {
                    email_address: email.email_address != null ? email.email_address : "",
                    email_subject: email.subject != null ? email.subject : "",
                    email_body: email.body != null ? email.body : "",
                    email_vet_name: email.vet_name != null ? email.vet_name : "",
                    email_farma_name: email.farma_name != null ? email.farma_name : "",
                    email_animal_tag: email.animal_tag != null ? email.animal_tag : "",
                    email_confirmation_id: email.confirmation_id != null ? email.confirmation_id : "",
                    email_template_name: email.template_name != null ? email.template_name : "",
                    email_type: email.suotp != null ? email.suotp : "NOTHING",
                }

                sendEmail(email_content);

            })

        }

    });

}


//sFUNCTION TO SEND EMAILS 
function sendEmail(email) {

    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ell889lle@gmail.com',
            pass: 'rheghissjvmagdyv'
        }
    });

    const handlebarOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve('./public/views'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./public/views'),
        extName: ".handlebars",
    }

    mail.use('compile', hbs(handlebarOptions));

    var mailOptions = {
        from: 'NO REPLY',
        to: email.email_address,
        subject: email.email_subject,
        template: email.email_template_name,
        context: {
            heading: email.email_subject,
            vet_name: email.vet_name,
            message: email.email_body,
            farma_name: email.email_farma_name,
            vet_email: email.email_address,
            email_type: email.email_type,
            confirmation_link: email.email_confirmation_id === "" ? null : `http://localhost:4200/confirm/${email.email_type}?token="${email.email_confirmation_id}"`
        }

    };

    mail.sendMail(mailOptions, function (error, info) {

        if (error) {

            logger.error(error.errno + error.message);

            return ({ message: `FAILED TO SEND EMAIL TO  ${email.email_address} ` });

        } else {

            console.log(`EMAIL TO ${email.email_address} SENT SUCCESSFULLY`);

            // Execute SQL query that'll insert into the vaccines table
            connection.query(`UPDATE triggered_emails SET status = 'Y' WHERE email_address = '${email.email_address}' AND confirmation_id = '${email.email_confirmation_id}';`, function (error, results, fields) {

                if (error) {

                    logger.error(error.errno + error.message);

                } else {

                    console.log(results);

                }

            });

            return ({ message: `EMAIL TO ${email} SENT SUCCESSFULLY` });
        }

    });

}


/*

    UI END POINTS PAGES (routes) 

*/

// First page
app.get('/', function (request, response) {
    // Get saved data from sessionStorage
    let data = storage('farma_id');
    if (data) {
        response.redirect('/home');
    } else {
        response.sendFile(path.join(__dirname + '/public/new.html'));
    }
});


// Register Page
app.get('/register', function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/public/register.html'));
});


// NEW FARMA ANIMAL SELECTION PAGE
app.get('/selection', function (request, response) {
    // Get saved data from sessionStorage
    const user_id = storage('farma_id') === undefined || storage('farma_id') === null ? request.query.userId : storage('farma_id');
    if (user_id) {
        response.sendFile(path.join(__dirname + '/public/nohome.html'));
    } else {
        response.redirect('/');
    }
});


// HOME PAGE
app.get('/home', function (request, response) {
    // Get saved data from sessionStorage
    const user_id = storage('farma_id');

    if (user_id) {
        response.sendFile(path.join(__dirname + '/public/home.html'));
    } else {
        response.redirect('/');
    }

});


// DASHBOARD PAGE FOR SELECTED ANIMAL FROM HOME PAGE
app.get('/animal/:id', function (request, response) {

    const user_id = storage('farma_id');

    if (user_id) {

        const animal_name = request.params.id;

        storage('animal', animal_name);

        const all_animals = storage('animal-names');

        const isSelected = all_animals.includes(animal_name);

        if (isSelected == true) {

            response.sendFile(path.join(__dirname + '/public/dashboard.html'));

        }

    } else {

        response.redirect('/home');

    };
});


// Logout
app.get('/logout', (request, response) => {
    // request.session.destroy();
    // Remove all saved data from sessionStorage
    storage.remove('farma_id');
    storage.clear();
    storage.clearAll();
    console.log(storage.get('farma_id'));
    response.redirect('/');
});



/* 

    END POINTS THAT READ FROM THE DATABASE


*/

// Filtering cards to be shown
app.get('/before-home', function (request, response) {

    const user_id = storage('farma_id');

    const animalNames = [];

    if (user_id) {
        connection.query(`SELECT list_of_animals FROM animals_at_farm WHERE farma_id=(?)`, [user_id], function (error, results, fields) {
            // If there is an issue with the query, output the error

            if (error) {

                logger.error(error.errno + error.message);

                response.send({ status: 500, error_message: "an error happened" + error });

            } else {

                results.forEach(element => {

                    if (element.list_of_animals == null) {

                        console.log("😒😒😒😒😒");

                        response.send({ status: 400, message: "NOT ANIMALS AT THE FARM" });

                    } else {

                        storage('all-animals', JSON.parse(JSON.stringify(element.list_of_animals)));

                        JSON.parse(element.list_of_animals).forEach(named => { animalNames.push(named.name); });

                        storage('animal-names', animalNames);

                        response.send({ status: 200, message: "ANIMALS ARE AT THE FARMA", listing: JSON.parse(JSON.stringify(element.list_of_animals)) });

                    }

                });

            }

        })

    } else {

        console.log("BEFORE-HOME animals listing retrieval nicht arbeitet viel  du hat keine farma_id ");

        response.redirect('/');

    }

});


// COUNT END POINTS
// Cleaned Function to retrieve dashboard data count
app.get('/getCount/:param', function (request, response) {
    const animal_type = storage('animal');
    const farma_id = storage('farma_id');
    const param = request.params.param;

    const queries = {
        allAnimals: `SELECT COUNT(id) AS COUNT FROM animal WHERE animal_type='${animal_type}' AND farma_id='${farma_id}' AND confirmed = 'Y';`,

        oldAnimals: `SELECT COUNT(id) AS COUNT FROM animal WHERE animal_type='${animal_type}' AND farma_id='${farma_id}' AND YEAR(reg_date) < YEAR(CURDATE());`,

        newAnimals: `SELECT COUNT(id) AS COUNT FROM animal WHERE animal_type='${animal_type}' AND farma_id='${farma_id}' AND YEAR(reg_date) > YEAR(CURDATE());`,

        yearAnimals: `SELECT COUNT(id) AS COUNT FROM animal WHERE animal_type='${animal_type}' AND farma_id='${farma_id}' AND YEAR(reg_date) = YEAR(CURDATE());`,

        sickAnimals: `SELECT COUNT(SA.id) as COUNT FROM sick_animals SA, animal A WHERE A.id = SA.animal_id AND A.animal_type ='${animal_type}' AND A.farma_id='${farma_id}';`,

        babies: `SELECT COUNT(id) as COUNT FROM animal WHERE farma_id = '${farma_id}' AND animal_type='${animal_type}' AND parent_tag IS NOT NULL AND confirmed = 'N';`,

        vaccinatedAnimals: `SELECT COUNT(VD.id) AS COUNT FROM vaccination_details VD, vaccines V, animal A, disease D WHERE A.id = VD.animal_id AND V.id = VD.vaccine_id AND V.farma_id = A.farma_id AND A.farma_id = '${farma_id}' AND VD.last_date < CURDATE() AND VD.last_date IS NOT NULL AND D.disease_id = V.disease_id;`,

        heavyAnimals: `SELECT COUNT(A.id) AS COUNT FROM animal A, breeding B WHERE A.id = B.animal_id AND A.animal_type='${animal_type}' AND A.farma_id='${farma_id}' AND B.expected_due_date >= CURDATE();`,

        pendingAnimals: `SELECT COUNT(A.id) AS COUNT FROM vaccination_details A, animal C WHERE A.animal_id = C.id AND C.animal_type = '${animal_type}' AND C.farma_id = '${farma_id}' AND C.confirmed = 'Y' AND A.confirmed = 'Y';`,

        allFeeds: `SELECT COUNT(*) as COUNT FROM feeds WHERE animal_type='${animal_type}' AND farma_id='${farma_id}' AND quantity > 0;`,

        allProducts: `SELECT COUNT(B.id) as COUNT FROM animal A, products B WHERE B.animal_id = A.id AND A.farma_id = '${farma_id}' AND A.animal_type='${animal_type}';`,

        totalNotifications: `SELECT COUNT(*) as COUNT FROM audit_trail A, farma B WHERE B.farma_id = A.user_id AND A.user_id = '${farma_id}' AND A.animal_type='${animal_type}';`,

    }

    if (farma_id) {
        connection.query(queries[param], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {
                logger.error(error.errno + error.message);
            };
            response.send({ count: results });
        })
    } else {
        console.log(" trying to delete with no farma_id 🤣😂 ");
        response.redirect('/');
    }

});


// Function to retrieve animal data for table
app.get('/getFarma', function (request, response) {
    const user_id = storage('farma_id');

    const sql_query = `SELECT first_name, last_name, mail, phone FROM farma  WHERE farma_id = '${user_id}';`;

    if (user_id) {
        connection.query(sql_query, function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            response.send({ farma: results });
        })
    } else {
        console.log(" trying to delete with no farma_id 🤣😂 ");
        response.redirect('/');
    }

});


//  LISTING END POINTS
// Cleaned
app.get('/getListing/:param', function (request, response) {

    const animal_type = storage('animal');
    const farma_id = storage('farma_id');
    const param = request.params.param;

    const queries = {

        farma_data: `SELECT * FROM farma WHERE farma_id = '${farma_id}';`,

        // TODO PENDING TESTS ON ALL SYMPTOMS ATTACHED TO A DISEASE PLUS THE VACCINE (sql query)
        allDiseases: `SELECT D.disease_id, D.disease_name, (SELECT group_concat(S.symptom_name) FROM symptom S WHERE S.disease_id = D.disease_id) as disease_symptoms, IFNULL((SELECT group_concat(V.name) FROM vaccines V WHERE V.disease_id = D.disease_id AND V.animal_type = '${animal_type}'),'') vaccine_name  FROM disease D WHERE D.animal_id = (SELECT animal_id FROM farm_animal WHERE animal_name = '${animal_type}');`,

        symptoms: `SELECT * FROM symptoms S, disease D WHERE S.disease_id = D.disease_id AND D.animal_id = (SELECT animal_id FROM farm_animal WHERE animal_name = '${animal_type}');`,

        allAnimals: `SELECT id, animal_tag, gender,  dob, reg_date, TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS YEARS, TIMESTAMPDIFF(MONTH, dob, CURDATE()) AS MONTHS, TIMESTAMPDIFF(DAY, dob, CURDATE()) AS DAYS FROM animal WHERE farma_id='${farma_id}' AND animal_type = '${animal_type}' AND confirmed = 'Y';`,

        notHeavyAnimals: ` SELECT A.id, A.animal_tag, A.animal_type, A.farma_id, A.gender, GP.period
                           FROM animal A, gestation_periods GP
                           WHERE A.id NOT IN (SELECT animal_id FROM breeding) AND A.animal_type='${animal_type}'
                           AND GP.animal_type = '${animal_type}'
                           AND A.gender = 'Female'
                           AND A.animal_type = GP.animal_type
                           AND  DATEDIFF(NOW(),A.dob) >= GP.period
                           AND A.farma_id = '${farma_id}';`,

        expectingToday: `SELECT A.id, A.animal_tag, B.breeding_date, B.expected_due_date, TIMESTAMPDIFF(DAY, CURDATE(), B.expected_due_date) AS DAYS FROM animal A, breeding B WHERE A.id = B.animal_id AND TIMESTAMPDIFF(DAY, CURDATE(), B.expected_due_date) = 0 AND A.animal_type='${animal_type}' AND A.farma_id='${farma_id}';`,

        expectingAnimals: `SELECT A.id, A.animal_tag, B.breeding_date, B.expected_due_date, TIMESTAMPDIFF(DAY, CURDATE(), B.expected_due_date) AS DAYS FROM animal A, breeding B WHERE A.id = B.animal_id AND A.animal_type='${animal_type}' AND A.farma_id='${farma_id}' AND B.expected_due_date >= CURDATE();`,

        sickAnimals: `SELECT SA.id, A.animal_tag as ANIMAL_TAG, (SELECT disease_name FROM disease WHERE disease_id = SA.disease_id) AS DISEASE, (SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = SA.vet_id) AS VET_NAME, SA.vet_id, SA.reported_date, SA.appointment_date, SA.confirmed FROM sick_animals SA, animal A WHERE A.farma_id='${farma_id}' AND A.animal_type='${animal_type}' AND SA.animal_id = A.id;`,

        editSickAnimals: `SELECT SA.id, A.animal_tag as ANIMAL_TAG, (SELECT disease_name FROM disease WHERE disease_id = SA.disease_id) AS DISEASE, (SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = SA.vet_id) AS VET_NAME, (SELECT email FROM vets WHERE vet_id = SA.vet_id) AS VET_MAIL, SA.reported_date, SA.appointment_date, SA.confirmed, SA.disease_id, SA.vet_id FROM sick_animals SA, animal A WHERE A.farma_id = '${farma_id}' AND A.animal_type='${animal_type}' AND SA.animal_id = A.id;`,

        babies: `SELECT id, animal_tag, dob, parent_tag, created_date FROM animal WHERE farma_id = '${farma_id}' AND animal_type='${animal_type}' AND parent_tag IS NOT NULL AND confirmed = 'N';`,

        newBorns: `SELECT id, new_born_tag, dob, (SELECT animal_tag FROM animal WHERE id = parent_id) as parent_tag, created_at FROM new_born WHERE parent_id IN (SELECT id FROM animal WHERE farma_id = '${farma_id}');`,

        vaccinatedAnimals: `SELECT * FROM animal A, due_dates B WHERE A.id = B.animal_id AND A.animal_type = '${animal_type}' AND A.farma_id = '${farma_id}' AND B.vaccination_date IS NOT NULL AND B.vaccination_date < CURRENT_DATE();`,

        pendingAnimals: ` SELECT A.id, C.animal_tag, A.first_date, (SELECT name FROM vaccines WHERE id = A.vaccine_id) AS vaccine_name, 
                          (SELECT disease_name FROM disease WHERE disease_id = (SELECT disease_id FROM vaccines WHERE id = A.vaccine_id)) AS disease_name,
                          (SELECT (cycle*period) FROM vaccines WHERE id = A.vaccine_id) AS no_of_vaccinations
                          FROM vaccination_details A, animal C WHERE A.animal_id = C.id AND C.animal_type = '${animal_type}' 
                          AND C.farma_id = '${farma_id}' AND C.confirmed = 'Y';`,

        availableVaccines: `SELECT id, name, quantity, IF(quantity_measure >= 1000, 'millilitres', 'litres') AS measure, description, CONCAT(cycle,' ',(CASE WHEN period = 1 THEN 'time(s) a Day' WHEN period = 7 THEN 'time(s) a Week' WHEN period = 30 THEN 'time(s) a Month' ELSE 'time(s) a Year' END)) as frequency, cycle, period, injection_area, qnty_per_cycle, IF(qnty_measure_per_cycle >= 1000, 'millilitres', 'litres') as measure_per_cycle, (SELECT disease_name FROM disease WHERE disease_id = vaccines.disease_id) AS disease_name FROM vaccines WHERE animal_type = '${animal_type}' AND farma_id = '${farma_id}';`,

        feeds: `SELECT id, name, description, quantity, quantity_measure, IF(quantity_measure >= 1000, 'kg', 'g') AS measure, stock_date, expected_restock_date FROM feeds WHERE farma_id='${farma_id}' AND animal_type = '${animal_type}' AND quantity > 0;`,

        timetables: `SELECT id, tt_name, animal_type, cycle, period, quantity_per_cycle, quantity_per_cycle_unit, quantity, quantity_unit, first_feed_date, feeds_id,tt_id,
                    IF(quantity_per_cycle_unit >= 1000, 'kg', 'g') AS quantity_per_cycle_unit,
                    IF(quantity_unit >= 1000, 'kg', 'g') AS quantity_unit
                    FROM feeding_timetable
                    WHERE feeds_id IN (SELECT id FROM feeds WHERE farma_id = '${farma_id}')
                    AND animal_type = '${animal_type}';`,

        fullyVaxedAnimals: `SELECT VD.id, A.animal_tag, V.name, D.disease_name, VD.first_date, VD.last_date FROM vaccination_details VD, vaccines V, animal A, disease D WHERE A.id = VD.animal_id AND V.id = VD.vaccine_id AND V.farma_id = A.farma_id AND A.farma_id = '${farma_id}' AND VD.last_date < CURDATE() AND VD.last_date IS NOT NULL AND D.disease_id = V.disease_id;`,

        vets: `SELECT * FROM vets;`,

        systemAudit: `SELECT action, action_date FROM audit_trail WHERE user_id = '${farma_id}' ORDER BY id DESC;`,

        healthyAnimals: `SELECT id, animal_tag, gender, animal_id FROM animal WHERE id NOT IN (SELECT animal_id FROM sick_animals) AND farma_id = '${farma_id}' AND animal_type = '${animal_type}';`,

        allProducts: `SELECT B.id, A.animal_tag, B.name, B.quantity, C.expected_qnty, IF(B.quantity_measure >= 1000, 'kg', 'g') AS measure FROM animal A, products B, product_schedule C WHERE B.animal_id = A.id AND B.animal_id = C.animal_id AND A.farma_id = '${farma_id}' AND A.animal_type='${animal_type}';`,

        product_types: `SELECT type_id, name, price, price_qnty, IF(price_qnty >= 1000, 'kg', 'g') as price_qty, currency_code FROM product_types WHERE animal_type = '${animal_type}' AND farma_id = '${farma_id}';`,

        milk: `SELECT * FROM V_DAIRY_${animal_type} WHERE farma_id = '${farma_id}';`,

        meat: `SELECT * FROM V_MEAT_${animal_type} WHERE farma_id = '${farma_id}';`,

        skin: `SELECT * FROM V_SKIN_${animal_type} WHERE farma_id = '${farma_id}';`,

        eggs: `SELECT * FROM V_EGGS_${animal_type} WHERE farma_id = '${farma_id}';`,

        hooves: `SELECT * FROM V_HOOVES_${animal_type} WHERE farma_id = '${farma_id}';`,

        horns: `SELECT * FROM V_HORNS_${animal_type} WHERE farma_id = '${farma_id}';`,

        projections: `SELECT id, projection_id, title, description, product_type, production_qnty, IF(production_measure >= 1000, 'kg', 'g') AS measure, product_start_date, product_end_date, animal_list FROM product_projections WHERE farma_id = '${farma_id}';`,

        notifications: `SELECT B.id, CONCAT(A.first_name, ' ', A.last_name) AS names, B.action, B.action_date FROM farma A, audit_trail B WHERE B.user_id = A.farma_id AND A.farma_id = '${farma_id}' AND B.animal_type='${animal_type}' ORDER BY id DESC LIMIT 12;`,

        report_types: `SELECT table_name as name FROM information_schema.views WHERE table_schema = 'farma' AND table_name LIKE '%rpt%';`,

    }

    if (farma_id) {

        connection.query(queries[param], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {

                console.log(error);

                response.send({ listing: error });

            } else {

                console.log(results);

                response.send({ listing: results });

            }

        })

    } else {

        response.redirect('/');

    }

});


// Predicted Disease 
app.get('/getSickAnimal', async (request, response) => {

    try {

        const animal_type = storage('animal');
        const farma_id = storage('farma_id');
        const sick_id = request.query.sick_id;

        const query = ` SELECT SA.id, A.animal_tag as ANIMAL_TAG, (SELECT disease_name FROM disease WHERE disease_id = SA.disease_id) AS DISEASE, (SELECT group_concat(S.symptom_name) FROM symptom S WHERE S.disease_id = SA.disease_id ORDER BY S.disease_id) AS SYMPTOM, (SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = SA.vet_id) AS VET_NAME, (SELECT email FROM vets WHERE vet_id = SA.vet_id) AS VET_MAIL, SA.reported_date, SA.appointment_date, SA.confirmed, SA.disease_id, SA.vet_id FROM sick_animals SA, animal A WHERE A.farma_id = '${farma_id}' AND A.animal_type='${animal_type}' AND SA.animal_id = A.id AND SA.id = '${sick_id}';`;

        connection.query(`${query}`, function (err, res) {

            if (err) {

                console.log(err);

                response.send({ status: 400, message: err.message });

            } else {

                response.json({ status: 201, message: `SUCCESSFUL`, data: res });

            }

        });

    } catch (error) {

        response.json({ status: 500, message: `INTERNAL SERVER ERROR ${error}` });

    }

});



// GET SYMPTOMS
app.get('/getSymptoms', async (request, response) => {

    try {

        const animal_type = storage('animal');
        const disease_id = request.query.disease_id;

        const query = `SELECT (SELECT group_concat(S.symptom_name) FROM symptom S WHERE S.disease_id = D.disease_id ORDER BY S.disease_id) AS symptom_name, D.disease_name, D.disease_id FROM disease D WHERE D.disease_id = '${disease_id}' AND D.animal_id = (SELECT animal_id FROM farm_animal WHERE animal_name ='${animal_type}')`;
        // const test_query = `SELECT (SELECT group_concat(S.symptom_name) FROM symptom S WHERE S.disease_id = D.disease_id ORDER BY S.disease_id) AS disease_name, D.disease_name, D.disease_id FROM disease D WHERE D.animal_id = 1 AND D.animal_id = (SELECT animal_id FROM farm_animal WHERE animal_name = 'cow')`;

        connection.query(`${query}`, function (err, res) {

            if (err) {

                console.log(err);

                response.send({ status: 400, message: err.message });

            } else {

                response.json({ status: 201, message: `SUCCESSFUL`, data: res });

            }

        });

    } catch (error) {

        response.json({ status: 500, message: `INTERNAL SERVER ERROR ${error}` }); 

    }

});



// Cleaned
// SCHEDULE LISTINg
app.get('/getScheduleListing', function (request, response) {

    const user_id = storage('farma_id');

    const type = request.query.type;
    const id = request.query.id;

    let query = "";

    switch (type) {
        // vaccination
        case 'feeding':
            query = `SELECT id,feeding_tt_id,
                        effective_date,next_date,
                        FORMAT(((feeds_quantity*feeding_schedule.qnty_unit) / qnty_per_cycle_unit), 2) as feeds_quantity,
                        FORMAT(((feeds_qnty_pending*feeding_schedule.qnty_unit)/qnty_unit), 2) as feeds_qnty_pending,
                        IF(qnty_unit >= 1000, 'kg', 'g' ) as unit,
                        schedule_id
                        FROM feeding_schedule WHERE feeding_tt_id = '${id}';`
            break;

        // vaccination
        case 'vaccination':
            query = `SELECT   id, vaccination_id, effective_date, next_date, 
                        FORMAT(((vaccine_quantity * qnty_unit)/qnty_unit), 2) as vax_qnty,
                        IF(qnty_unit >= 1000, 'kg', 'g' ) as unit,
                        FORMAT(((vaccine_qnty_pending * qnty_per_cycle_unit)/qnty_per_cycle_unit), 2) as vax_qnty_pending,
                        schedule_id
                        FROM schedule_vaccination WHERE vaccination_id = '${id}';`
            break;

        //product
        case 'product':
            query = `SELECT id,projection_id,effective_dt,nxt_dt,FORMAT(((quantity * qnty_measure)/qnty_measure), 2) as product_qnty,
                        IF(qnty_measure >= 1000, 'kg', 'g') as measure,FORMAT(((actual_qnty * actual_qnty_measure)/actual_qnty_measure), 2) as actual_qnty,schedule_id
                        FROM product_schedules WHERE projection_id = '${id}';`
            break;

        default:

            console.log(`Sorry`);
    }



    if (user_id) {

        connection.query(query, function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {

                logger.error(error.errno + error.message);

                response.send({ error_message: "an error happened" + error });

            } else {

                response.send({ listing: results });

            }

        })

    } else {

        response.redirect('/');

    }

});


// is vaccanition confirm
app.get('/isConfirmed', function (request, response) {

    const user_id = storage('farma_id');

    const param = request.query.id;

    console.log(param);

    const queries = `SELECT confirmed FROM vaccination_details WHERE id = '${param}';`

    if (user_id) {

        connection.query(queries, function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {

                response.send({ status: 500, error_message: "an error happened" + error });

            } else {

                console.log(results[0].confirmed);

                if (results[0].confirmed === 'Y') {

                    response.send({ status: 200, message: "animal's vaccination appointment is confirmed", listing: results });

                } else {

                    response.send({ status: 400, message: "animal's vaccination is not confirmed" });

                }

            }

        })

    } else {

        response.redirect('/');

    }

});


// Verify animal has been born
app.get('/verifyAnimal/:param', function (request, response) {

    const user_id = storage('farma_id');

    const param = request.params.param;

    console.log(user_id + ' ' + param);

    const queries = `SELECT animal_tag, parent_tag, reg_date, dob, (DATEDIFF(CURDATE(), dob)) as age FROM animal WHERE farma_id = '${user_id}' AND animal_tag = '${param}' AND confirmed = 'N';`

    if (user_id) {

        connection.query(queries, function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {

                logger.error(error.errno + error.message);

                response.send({ error_message: "an error happened" + error });

            } else {

                response.send({ listing: results });

            }

        })

    } else {

        response.redirect('/');

    }

});


// Cleaned 
// Function to retrieve animal data for table
app.get('/getMaxId/:param', function (request, response) {
    const user_id = storage('farma_id');
    const animal = storage('animal');
    const param = request.params.param;

    console.log(user_id + "  " + animal);

    const queries = {
        animal_id: `SELECT COUNT(id) AS LAST, animal_type FROM animal  WHERE animal_type='${animal}' AND farma_id = '${user_id}';`,
        timetable_id: `SELECT COUNT(id) AS LAST, animal_type FROM feeding_timetable WHERE feeds_id IN (SELECT id FROM feeds WHERE farma_id = '${user_id}') AND animal_type = '${animal}';`
    }

    if (user_id) {
        connection.query(queries[param], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;

            // console.log(results[0]);
            response.send({ last_id: results[0].LAST != null ? results[0].LAST + 1 : 0001, animalType: results[0].animal_type != null ? results[0].animal_type : animal });
        })
    } else {
        console.log(" trying to delete with no farma_id 🤣😂 ");
        response.redirect('/');
    }

});


// TODO test this extensively
/* send verification link */
app.get('/confirm/:param', function (request, response) {

    console.log(request.params.param);

    const param = request.params.param === 'vaccination' ? 'vaccination_details' : 'sick_animals';

    // query to return the tokens
    connection.query(`SELECT * FROM triggered_emails WHERE confirmation_id = ${request.query.token}`, function (err, result) {

        if (err) {
            console.log(err);
            response.send({ message: " NOOOO LOL " });
        } else {

            console.log(result[0]);

            if (result[0].confirmation_id !== null) {

                connection.query(`UPDATE ${param} SET confirmed = 'Y' WHERE confirmed_id = '${result[0].confirmation_id}'`, function (err, result) {
                    if (err) {
                        console.log(err)
                        response.send({ message: "UPDATE FAILED/CONFIRMATOIN" });
                    } else {

                        response.sendFile(path.join(__dirname + '/public/views/sucess.html'));

                        // response.send({ message: "UPDATE SUCCESSFULLY" });
                    }

                });

            } else {

                response.send({ message: "CONFIRMATION TOKEN INVALID" });

            }
        }

    });

})


// OTP verification
app.get('/verify-otp', async (request, response) => {
    try {
        const code = request.query.code;
        const userId = request.query.userId;

        storage('farma_id', userId);

        // query to return the tokens
        connection.query(`CALL verify_otp ('${userId}', '${code}', @user_id);`, function (err, result) {
            if (err) {
                console.log(err);
                response.send({ status: 500, message: err.sqlMessage });
            } else {

                console.log(result[0][0].VERIFIED);

                if (result[0][0].VERIFIED === 'FAILED') {

                    const data = {
                        status: 400,
                        message: 'WRONG OTP '
                    };

                    response.json(data);

                } else {

                    const data = {
                        status: 200,
                        message: 'OTP authenticated successfully.'
                    };

                    response.json(data);

                }

            }

        });

    } catch (error) {

        console.log(`${error}`);

        response.json({ status: 500, message: `INTERNAL SERVER ERROR ${error}` });

    }

});


// Report Headers
app.get('/rpt_headers', async (request, response) => {

    try {

        const rpt_type = request.query.type;

        // query to return the tokens
        connection.query(`SHOW COLUMNS FROM ${rpt_type} WHERE Field NOT IN ('farma_id', 'effective_dt','animal_type');`, function (err, result) {

            if (err) {

                console.log(err);

                response.send({ status: 500, message: err.message });

            } else {

                response.json({ status: 200, message: `SUCCESSFUL`, daa: result });

            }

        });

    } catch (error) {

        console.log(`${error}`);

        response.json({ status: 500, message: `INTERNAL SERVER ERROR ${error}` });

    }

});


// Report data from new views
app.get('/rpt_data', async (request, response) => {

    const farma_id = storage('farma_id');
    const animal_type = storage('animal');

    try {

        const from_dt = request.query.from_dt;
        const to_dt = request.query.to_dt;
        const rpt_type = request.query.type;

        // query to return the tokens
        connection.query(`SELECT * FROM ${rpt_type} WHERE effective_dt BETWEEN ${from_dt} AND ${to_dt} AND farma_id = '${farma_id}' AND animal_type = '${animal_type}' ORDER BY effective_dt;`, function (err, res) {

            if (err) {

                console.log(err);

                response.send({ status: 500, message: err.message });

            } else {

                // query to return the tokens
                connection.query(`SELECT COUNT(id) as sumation FROM ${rpt_type} WHERE effective_dt BETWEEN ${from_dt} AND ${to_dt} AND farma_id = '${farma_id}' AND animal_type = '${animal_type}' GROUP BY effective_dt;`, function (err, result) {

                    if (err) {

                        console.log(err);

                        response.send({ status: 500, message: err.message });

                    } else {

                        console.log("res");
                        console.log(res);
                        console.log("result");
                        console.log(result);

                        response.json({ status: 200, message: `SUCCESSFUL`, data: res, dates: result });

                    }

                });

            }

        });

    } catch (error) {

        console.log(`${error}`);

        response.json({ status: 500, message: `INTERNAL SERVER ERROR ${error}` });

    }

});


// Predicted Disease 
app.get('/predict_disease', async (request, response) => {

    const animal_type = storage('animal');

    try {

        const prompt = request.query.prompt;

        connection.query(`SELECT A.symptom_id, A.disease_id, B.disease_name DISEASE_NAME, A.symptom_name DESCRIPTION FROM symptom A, disease B WHERE MATCH (A.symptom_name) AGAINST ('${prompt}') AND A.disease_id  IN (B.disease_id) AND B.animal_id = (SELECT animal_id FROM farm_animal WHERE animal_name = '${animal_type}' );`, function (err, res) {

            if (err) {

                console.log(err);

                response.send({ status: 400, message: err.message });

            } else {

                response.json({ status: 201, message: `SUCCESSFUL`, data: res });

            }

        });

    } catch (error) {

        response.json({ status: 500, message: `INTERNAL SERVER ERROR ${error}` });

    }

});


// Predicted Disease Vaccine 
app.get('/predict_vaccine', async (request, response) => {

    try {

        const prompt = request.query.prompt;

        console.log(prompt);

        connection.query(`SELECT description DESCRIPTION FROM vaccines WHERE disease_id = ?;`, prompt, function (err, res) {

            if (err) {

                console.log(err);
                response.send({ status: 500, message: err.message });

            } else {

                console.log(res);

                response.json({ status: 201, message: `SUCCESSFUL`, data: res });

            }

        });

    } catch (error) {

        console.log(error);
        response.json({ status: 500, message: `INTERNAL SERVER ERROR ${error}` });

    }

});


/*
    
    ENDPOINTS THAT WRITE TO DATABASE 
*/


// Registering a farma
app.post('/register-farma', function (request, response) {
    // Capture the input fields
    const f_id = uuidv4();
    const fname = request.body.fname;
    const lname = request.body.lname;
    const mail = request.body.mail;
    const phone = request.body.phone;
    const password2 = request.body.pass;

    if (mail !== null && password2 !== null) {
        // Execute SQL query that'll insert into the farma table
        connection.query(`CALL pending_farma_registration('${f_id}', '${fname}', '${lname}' , '${mail}', '${phone}', '${password2}')`, function (error, results, fields) {

            if (error) {
                console.log(error)
                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                return response.json({ status: 200, message: 'User Registration Successfuly.', user_id: `${f_id}` });

            }

        });

    } else {

        return response.json({ status: 500, message: 'EMPTY EMAIL & PASSWORD' });

    }

});


// login authentication
app.post('/authenticate', function (request, response) {

    // Ensure the input fields exists and are not empty
    if (request.body.mail && request.body.pass) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query(`SELECT a.farma_id, a.first_name, a.last_name, a.mail, (SELECT password FROM pwd WHERE farma_id = a.farma_id AND status = 'A') AS pwd, b.list_of_animals FROM farma a,  animals_at_farm b WHERE a.mail = '${request.body.mail}' AND (AES_DECRYPT(FROM_BASE64((SELECT password FROM pwd WHERE farma_id = a.farma_id AND status = 'A') ), a.farma_id)) = '${request.body.pass}' AND a.farma_id = b.farma_id;`, function (error, results, fields) {

            // If there is an issue with the query, output the error
            if (error) {

                logger.error(error.errno + error.message);
                response.redirect(`/`);

            } else {

                // If the account exists
                if (results.length > 0) {

                    logger.info("SUCCESSFULLY AUTHENTICATED");

                    // Authenticate the user
                    const row = Object.values(JSON.parse(JSON.stringify(results)));

                    row.forEach(element => {
                        // Save data to sessionStorage
                        storage('farma_id', element.farma_id);
                        storage('farma_name', element.first_name + ' ' + element.last_name);

                        if (element.list_of_animals == null) {
                            response.send({ url: '/selection' });
                        } else {
                            response.send({ url: '/home' });
                        }
                    });

                } else {

                    response.send({ url: 'error' });

                }
            }
            response.end();

        });

    } else {

        response.send({ message: 'Please enter email and/or Password!' });

    }

});


// Registering a new animal
app.post('/newAnimal', function (request, response) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    // Execute SQL query that'll insert into the farma table
    connection.query(`INSERT INTO animal (animal_tag, gender, dob, reg_date, animal_type, farma_id, confirmed) VALUES ('${request.body.animalTag}', '${request.body.gender}', '${request.body.dob}', '${request.body.regDate}', '${animal}', '${farma_id}', 'Y');`,

        function (error, results, fields) {

            if (error) {

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: ` ${request.body.animalTag} Added Successfuly ! ` });

                } else {

                    return response.json({ status: 400, message: ` Adding ${request.body.animalTag} Failed` });

                }

            }

        }

    );

});


// Inserting new TimeTable into the DB
app.post('/newTimeTable', function (request, response) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    const rand_id = uuidv4();

    console.log(request.body);

    // Execute SQL query that'll insert into the feeding_timetable table
    connection.query(
        `INSERT INTO feeding_timetable ( tt_name,animal_type,cycle,period,quantity_per_cycle,quantity_per_cycle_unit,quantity,quantity_unit,first_feed_date,feeds_id,tt_id )
        VALUES ('${request.body.timetableTitle}','${animal}', ${request.body.feedingCycle},${request.body.feedingPeriod},${request.body.feedingQuantityPerCycle},${request.body.feedingQuantityPerCycleUnit},${request.body.plannedQnty},${request.body.plannedQntyMeasure},'${request.body.feedingStartDate}',${request.body.feedsID}, '${rand_id}');`,

        function (error, results, fields) {
            if (error) {

                console.log(error);

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: `${request.body.timetableTitle} Added Successfuly.` });

                } else {

                    return response.json({ status: 400, message: `Adding ${request.body.timetableTitle} Failed` });

                }

            }

        }

    );

});


// Updating animal data
app.post('/updateAnimalData', function (request, response) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    // Execute SQL query that'll insert into the farma table
    connection.query(`UPDATE animal SET animal_tag = '${request.body.editAnimalTag}', gender = '${request.body.editGender}', dob = '${request.body.editDob}', reg_date = '${request.body.editRegDate}' WHERE animal_type ='${animal}' AND farma_id = '${farma_id}' AND id='${request.body.editid}';`,

        function (error, results, fields) {

            if (error) {

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: ` ${request.body.editAnimalTag} updated Successfuly ! ` });

                } else {

                    return response.json({ status: 400, message: ` ${request.body.editAnimalTag} Update Failed` });

                }

            }

        }

    );

});


// Inserting Feeds into the DB
app.post('/updateFeed', function (request, response) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`UPDATE feeds SET name = '${request.body.edit_feeds_name}',  description = '${request.body.edit_feeds_name}', quantity = ${request.body.edit_feeds_qnty}, quantity_measure = ${request.body.edit_feeds_qnty_measure}, stock_date  = '${request.body.edit_feeds_stock_date}', animal_type = '${animal}' WHERE farma_id ='${farma_id}' AND id = ${request.body.edit_feeds_id};`,
        function (error, results, fields) {
            if (error) {
                logger.error(error.errno + error.message);
            }
        });
    response.redirect(`/animal/${animal}`);
    return;
});


// Inserting Vaccines into the DB
app.post('/newVaccine', function (request, response) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');

    const disease_id = request.body.diseaseID === undefined ? 0 : request.body.diseaseID;

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`INSERT INTO vaccines (name, quantity, quantity_measure, description, cycle, period, qnty_per_cycle, qnty_measure_per_cycle, injection_area, disease_id, animal_type, farma_id) VALUES ('${request.body.vaccineName}', ${request.body.vaccineQuantity}, '${request.body.quantityMeasure}', '${request.body.vaccineDesc}', ${request.body.vaccineCycle}, ${request.body.vaccinePeriod}, ${request.body.vaccineQntyPerCycle}, ${request.body.qntyMeasurePerCycle}, '${request.body.injectionArea}', '${disease_id}', '${animal}', '${farma_id}');`,

        function (error, results, fields) {

            if (error) {

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: `${request.body.vaccineName} Added Successfuly.` });

                } else {

                    return response.json({ status: 400, message: `Adding ${request.body.vaccineName} Failed ` });

                }

            }

        }

    );

});


// Inserting Feeds into the DB
app.post('/newFeed', function (request, response) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`INSERT INTO feeds (name, description, quantity, quantity_measure, stock_date, animal_type, farma_id) VALUES ('${request.body.feeds_name}','${request.body.feeds_name}',${request.body.feeds_qnty},${request.body.feeds_qnty_measure},'${request.body.feeds_stock_date}', '${animal}','${farma_id}');`,

        function (error, results, fields) {

            if (error) {

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: `${request.body.feeds_name} Feed Added Successfuly.` });

                } else {

                    return response.json({ status: 400, message: `Adding ${request.body.feeds_name} Feed Failed` });

                }

            }

        }

    );

});


// Inserting Animals that have been fvcked (Insemination/Mating/Breeding) into the DB
app.post('/newBred', function (request, response) {
    const animal = storage('animal');
    const breeding_uuid = uuidv4();

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`INSERT INTO breeding (animal_id, breeding_date, expected_due_date, breeding_uuid) VALUES ('${request.body.breeding_animal_id}','${request.body.breeding_date}', DATE_ADD('${request.body.breeding_date}', INTERVAL ${request.body.gestation_period} DAY), '${breeding_uuid}');`,

        function (error, results, fields) {

            if (error) {

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: 'Breeding Record Added Successfuly.' });

                } else {

                    return response.json({ status: 400, message: 'Adding new Breeding Record Failed' });

                }

            }

        }

    );

});


// Inserting Vaccines into the DB
app.post('/newVet', function (request, response) {
    const animal = storage('animal');
    const vet_uuid = uuidv4();
    // Execute SQL query that'll insert into the vaccines table
    connection.query(`INSERT INTO vets (fname, lname, email, phone, station, vet_id) VALUES ('${request.body.vetFname}', '${request.body.vetLname}', '${request.body.vetEmail}', '${request.body.vetPhone}', '${request.body.vetStation}', '${vet_uuid}');`,

        function (error, results, fields) {

            if (error) {

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: `${request.body.vetFname} ${request.body.vetLname} has been Added Successfuly.` });

                } else {

                    return response.json({ status: 400, message: `Adding ${request.body.vetFname} ${request.body.vetLname} Failed ` });

                }

            }

        }

    );

});


// Inserting Product Type into the DB
app.post('/newProductType', function (request, response) {

    const farma_id = storage('farma_id');
    const animal = storage('animal');

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`INSERT INTO product_types (name,animal_type,farma_id,price,price_qnty,currency_code) VALUES ('${request.body.type_title}','${animal}','${farma_id}','${request.body.type_price}','${request.body.price_qnty}','${request.body.currency}');`,

        function (error, results, fields) {

            if (error) {

                console.log(error);

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: `${request.body.type_title} Added Successfuly.` });

                } else {

                    return response.json({ status: 400, message: `Adding ${request.body.type_title} Failed` });

                }

            }

        }

    );

});


// Inserting Product Projections into the DB
app.post('/newProductProjection', function (request, response) {
    const farma_id = storage('farma_id');

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`INSERT INTO product_projections (title,description,product_type,production_frequency,production_period,product_start_date,product_end_date,production_qnty,production_measure,animal_list,farma_id) VALUES ('${request.body.projection_title}','${request.body.projection_desc}','${request.body.product_type}',${request.body.production_frequency},'${request.body.production_period}', '${request.body.product_start_date}', '${request.body.product_end_date}', '${request.body.production_qnty}', '${request.body.production_measure}', '${request.body.production_animal_list}','${farma_id}');`,

        function (error, results, fields) {

            if (error) {

                console.log("error");
                console.log(error);

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log("results");
                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: `${request.body.projection_title} Added Successfuly.` });

                } else {

                    return response.json({ status: 400, message: `Adding ${request.body.projection_title} Failed` });

                }

            }

        }

    );

});


// Modify animal product type
app.post('/editProductType', function (request, response) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');

    if (farma_id) {

        // Execute SQL query that'll insert into the vaccines table
        connection.query(`UPDATE product_types SET name = '${request.body.product_type_title}',price = '${request.body.product_type_price}',price_qnty ='${request.body.product_type_qnty}' ,currency_code = '${request.body.product_currency}' WHERE animal_type = '${animal}' AND farma_id = '${farma_id}' AND type_id = '${request.body.product_type_id}';`,

            function (error, results, fields) {

                if (error) {

                    console.log(error);

                    logger.error(error.errno + error.message);

                    return response.json({ status: 500, message: error.sqlMessage });

                } else {

                    console.log(results);

                    if (results.affectedRows > 0) {

                        return response.json({ status: 200, message: `${request.body.product_type_title} modified Successfuly.` });

                    } else {

                        return response.json({ status: 400, message: `Modifying ${request.body.product_type_title} Failed` });

                    }

                }

            }

        );

    }

});


// Inserting Vaccines into the DB
app.post('/updateVet', function (request, response) {

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`UPDATE vets SET fname = '${request.body.editVetFname}', lname = '${request.body.editVetLname}', email = '${request.body.editVetEmail}', phone = '${request.body.editVetPhone}', station = '${request.body.editVetStation}' WHERE vet_id = '${request.body.editVetID}';`,

        function (error, results, fields) {

            if (error) {

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: `${request.body.editVetFname} ${request.body.editVetLname} has been udated Successfuly.` });

                } else {

                    return response.json({ status: 400, message: `Updating ${request.body.editVetFname} ${request.body.editVetLname} Failed ` });

                }

            }

        }

    );

});


// Confirming appointment
app.post('/confirmation', function (request, response) {

    const animal = storage('animal');

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`UPDATE sick_animals SET confirmed = 'Y' WHERE id = '${request.body.edit_sick_animal_id}';`,

        function (error, results, fields) {

            if (error) {

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    const params = {
                        subject: 'FARMA ALERTS: CONFIRMATION OF TREATMENT APPOINTMENT',
                        vet_name: `${request.body.editVetName}`,
                        heading: `TREATMENT APPOINTMENT CONFIRMATION FOR ${request.body.editSickTag}`,
                        message: `Treatment Appointment for ${storage('farma_name')}'s ${animal} tagged ${request.body.editSickTag} has been confirmed. `,
                        farma_name: `${storage('farma_name')}`,
                        vet_mail: `${request.body.update_vet_mail}`
                    };

                    console.log(params);

                    sendEmail(params);

                    return response.json({ status: 200, message: `${request.body.editVetFname} ${request.body.editVetLname} has been Added Successfuly.` });

                } else {

                    return response.json({ status: 400, message: `Adding ${request.body.editVetFname} ${request.body.editVetLname} Failed ` });

                }

            }

        }

    );

});


//  Verifying new born animal
app.post('/verifyNewBorn', function (request, response) {

    const user_id = storage('farma_id');

    const queries = `UPDATE animal SET confirmed = 'Y', gender = '${request.body.newBornGender}' WHERE farma_id = '${user_id}' AND animal_tag = '${request.body.newBornTag}' AND parent_tag = '${request.body.parentTag}' AND confirmed = 'N';`;

    if (user_id) {

        connection.query(queries,

            function (error, results, fields) {

                if (error) {

                    logger.error(error.errno + error.message);

                    return response.json({ status: 500, message: error.sqlMessage });

                } else {

                    console.log(results);

                    if (results.affectedRows > 0) {

                        return response.json({ status: 200, message: ` ${request.body.newBornTag} has been confirmed Successfuly.` });

                    } else {

                        return response.json({ status: 400, message: `${request.body.newBornTag} Confirmation Failed ` });

                    }

                }

            }

        )
    } else {

        response.redirect('/');

    }

});


// Inserting Vaccines into the DB
app.post('/scheduleVaccination', function (request, response) {

    const animal = storage('animal');

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`INSERT INTO vaccination_details (vaccine_id, first_date, animal_id, vet_id, confirmed, confirmed_id) VALUES (${request.body.vaxID}, '${request.body.scheduled_first_date}', ${request.body.animalTag}, '${request.body.vetID}', 'N', UUID());`,


        function (error, results, fields) {

            if (error) {

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: `Vaccination schedule has been Added Successfuly.` });

                } else {

                    return response.json({ status: 400, message: `Vaccination schedule creation Failed ` });

                }

            }

        }

    );

});


// Updating Farma Profile Data
app.post('/updateFarma', function (request, response) {

    const farma_id = storage('farma_id');
    const data = request.body;

    // Execute SQL query that'll insert into the farma table
    connection.query(`UPDATE farma SET first_name = '${data.fname}', last_name = '${data.lname}', phone = '${data.phone}', mail = '${data.mail}' WHERE farma_id = '${farma_id}';`,

        function (error, results, fields) {

            if (error) {

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: `${data.fname} ${data.lname}' has been saved Successfuly.` });

                } else {

                    return response.json({ status: 400, message: ` Update to ${data.fname} ${data.lname} Failed ` });

                }

            }

        }

    );

});


// Reporting Sick animals into the DB
app.post('/addSick', function (request, response) {

    const animal = storage('animal');

    const disease_id = request.body.suspected_disease === undefined ? 0 : request.body.suspected_disease;

    console.log(disease_id);
    console.log(request.body.suspected_disease)

    if (animal) {

        // Execute SQL query that'll insert into the vaccines table
        connection.query(`CALL recordSick(${request.body.healthyAnimals}, '${request.body.reportedDate}', '${request.body.vets_id}', '${request.body.appointment_date}', ${disease_id});`,

            function (error, results, fields) {

                if (error) {

                    logger.error(error.errno + error.message);

                    console.log(error);

                    return response.json({ status: 500, message: error.sqlMessage });

                } else {

                    console.log(results);

                    if (results.affectedRows > 0) {

                        return response.json({ status: 200, message: `${request.body.healthyAnimals} has recorded Successfuly.` });

                    } else {

                        return response.json({ status: 400, message: `Reporting ${request.body.healthyAnimals}'s Sickness Failed` });

                    }

                }

            }

        );

    } else {

        response.redirect(`/`);

    }


});


// send-reset-otp
app.post('/send_reset_otp', async (request, response) => {

    connection.query(`CALL seedOTP('${request.body.mail}', @user_id);`, function (error, results, fields) {

        if (error) {

            logger.error(error.errno + error.message);

            return response.json({ status: 500, message: 'SQL Error. Refresh and Try Again.' + error });

        } else {

            if (results.affectedRows = 1) {

                return response.json({ status: 200, message: 'OTP CODE HAS BEEN GENERATED SUCCESSFULLY', user_id: results[0][0].user_id });

            } else {

                return response.json({ status: 400, message: 'NO OTP CODE GENERATED' });

            }

        }

    });

});


// send-reset-otp
app.post('/recordNewPassword', async (request, response) => {

    connection.query(`INSERT INTO pwd (farma_id, status, password) VALUES ('${request.body.USER_ID}', 'A', TO_BASE64(AES_ENCRYPT('${request.body.NEW_PASSWORD}', '${request.body.USER_ID}')));`, function (error, results, fields) {

        if (error) {

            logger.error(error.errno + error.message);

            return response.json({ status: 500, message: 'SQL Error. Refresh and Try Again.' + error });

        } else {

            if (results.affectedRows = 1) {

                return response.json({ status: 200, message: 'PASSWORD RESET SUCCESSFULLY' });

            } else {

                return response.json({ status: 400, message: 'PASSWORD RESET GENERATED' });

            }

        }

    });

});


// DON'T TOUCH
// Add animals at the farm to DB
app.post('/save', async (request, response) => {
    const getDetails = JSON.parse(JSON.stringify(request.body))

    console.log("NAME FROM FRONTEND  " + getDetails.name);
    console.log(" URL " + getDetails.image_url);

    const f_id = storage('farma_id');

    console.log(f_id);

    connection.query(`SELECT list_of_animals FROM animals_at_farm WHERE farma_id = '${f_id}';`,
        function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {
                logger.error(error.errno + error.message);
            } else {

                console.log(results);

                // If the account exists

                results.forEach(element => {
                    if (element.list_of_animals == null) {
                        // Query to update the list of animals for the farmer with no animals
                        connection.query(`UPDATE animals_at_farm SET list_of_animals = JSON_ARRAY(JSON_OBJECT("name" , "${getDetails.name}", "image_url" , "${getDetails.image_url}")) WHERE farma_id = '${f_id}';`,
                            function (error, results, fields) {
                                // If there is an issue with the query, output the error
                                if (error) {
                                    console.log(error);
                                    logger.error(error.errno + error.message);
                                };
                                // If the account exists
                                return;
                            }
                        );
                    } else {
                        // Query to update the list of animals for all the farmer
                        connection.query(`UPDATE animals_at_farm SET list_of_animals = JSON_ARRAY_APPEND(list_of_animals, '$', JSON_OBJECT("name" , "${getDetails.name}", "image_url" , "${getDetails.image_url}")) WHERE farma_id = '${f_id}';`,
                            function (error, results, fields) {
                                // If there is an issue with the query, output the error
                                if (error) {
                                    console.log(error);
                                    logger.error(error.errno + error.message);
                                };
                                // If the account exists
                                return;
                            }
                        );
                    }
                });

            }

            response.redirect('/');
            response.end();

        }
    );
});


// End Point adding new animal
app.post('/addAnimal', (request, response) => {
    uploadImage(request, response, (err) => {
        if (err) {
            logger.error(err.errno + err.message);
            response.redirect('/home');
        } else {
            if (request.file == undefined) {
                response.redirect('/home');
                logger.error("IMAGE NOT DEFINED");
            } else {
                logger.info("STORED SUCCESSFULLY");
                const f_id = storage('farma_id');
                const animal_name = request.body.animal_type;
                const animal_count = request.body.count;
                const animal_description = request.body.desc;
                const image_url = `http://localhost:4200/images/${storage('img_url')}`;

                // Query to update the list of animals for all the farmer
                connection.query(`UPDATE animals_at_farm SET list_of_animals = JSON_ARRAY_APPEND(list_of_animals, '$', JSON_OBJECT("name" , "${animal_name}", "desc" , "${animal_description}", "image_url" , "${image_url}")) WHERE farma_id = '${f_id}';`,
                    function (error, results, fields) {
                        // If there is an issue with the query, output the error
                        if (error) {
                            logger.error(error.errno + error.message);
                        };

                        logger.info(request.body.animal_type + " HAS BEEN ADDED TO THE LIST OF ANIMAL TYPES");

                        return;

                    });

                // // Query to update the list of animals for all the farmer
                // connection.query(`INSERT INTO animals (animal_type, count, farma_id) VALUES ('${animal_name}', ${animal_count}, '${f_id}');`,
                //     function (error, results, fields) {
                //         // If there is an issue with the query, output the error
                //         if (error) throw error;
                //         return;
                //     });

                response.redirect('/home');

            }
        }
    });
});


// Reportinsg Sick animals into the DB
app.post('/recordProduction', function (request, response) {

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`UPDATE product_schedules SET actual_qnty = '${request.body.product_quantity}' WHERE schedule_id = '${request.body.product_id}';`,

        function (error, results, fields) {

            if (error) {

                logger.error(error.errno + error.message);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: `${request.body.product_id} has recorded Successfuly.` });

                } else {

                    return response.json({ status: 400, message: `Reporting ${request.body.product_id}'s Sickness Failed` });

                }

            }

        }

    );

});


// Function to delete data from animal
app.post('/delete', function (request, response) {

    const param_id = request.body.id;
    const par = request.body.type;

    console.log(param_id);

    const user_id = storage('farma_id');
    const animal = storage('animal');

    const queries = {
        vaccine: `DELETE FROM vaccines WHERE id = ${param_id};`,
        vaccination_details: `DELETE FROM vaccination_details WHERE id = ${param_id};`,
        animal: `DELETE FROM animal WHERE farma_id='${user_id}' AND id = '${param_id}';`,
        sickAnimal: `DELETE FROM sick_animals WHERE id = '${param_id}';`,
        timetable: `DELETE FROM feeding_timetable WHERE feeds_id IN (SELECT id FROM feeds WHERE farma_id = '${user_id}') AND id = '${param_id}';`,
        vet: `DELETE FROM vets WHERE vet_id = '${param_id}';`,
        product_schedule: `DELETE FROM product_schedules WHERE schedule_id IN ('${param_id}');`,
        feed: `DELETE FROM feeds WHERE id = '${param_id}';`
    }

    console.log(queries[par]);

    if (user_id) {

        connection.query(queries[par], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {

                console.log(error);
                logger.error(error.errno + error.message);

            } else {

                console.log(results);

                results.affectedRows >= 1 ? response.send({ message: "GOOD" }) : response.send({ message: "BAD" });

            }

        })

    } else {

        console.log(" trying to delete with no farma_id  ");
        response.redirect('/');
    }
});


app.listen(4200, function () {
    console.log('Server is running at port: ', 4200);
});