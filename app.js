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


dotenv.config();

// // REMOTE DATABASE CONNECTIONS
// const connection = mysql.createConnection({
//     host: 'db4free.net',
//     user: 'derek_2022',
//     password: '18ba6a01',
//     database: 'farma_2022'
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
cron.schedule('*/15 * * * * *', function () {
    getTriggeredEmails();
});


// Get data from backend endpoint
async function getTriggeredEmails() {

    const sql_query = `SELECT id, user_name, email_address, status, subject, farma_name, body, animal_tag, confirmation_id, template_name, (SELECT AES_DECRYPT(FROM_BASE64(type),(SELECT A.pending_id FROM otp A WHERE A.otp_id = confirmation_id))) as suotp FROM triggered_emails WHERE status = 'N';`

    // Execute SQL query that'll insert into the vaccines table
    connection.query(sql_query, function (error, results, fields) {

        if (error) {

            console.log(error);

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

            console.log(error);

            return ({ message: `FAILED TO SEND EMAIL TO  ${email.email_address} ` });

        } else {

            console.log(`EMAIL TO ${email.email_address} SENT SUCCESSFULLY`);

            // Execute SQL query that'll insert into the vaccines table
            connection.query(`UPDATE triggered_emails SET status = 'Y' WHERE email_address = '${email.email_address}' AND confirmation_id = '${email.email_confirmation_id}';`, function (error, results, fields) {

                if (error) {

                    console.log(error);

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

    console.log(user_id);

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
                console.log(error);
            }

            results.forEach(element => {
                if (element.list_of_animals == null) {
                    console.log("😒😒😒😒😒");
                } else {

                    storage('all-animals', JSON.parse(JSON.stringify(element.list_of_animals)));

                    (element.list_of_animals).forEach(named => {
                        animalNames.push(named.name);
                    })

                    storage('animal-names', animalNames);

                    response.send(JSON.parse(JSON.stringify(element.list_of_animals)));

                }
            });
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

        vaccinatedAnimals: `SELECT COUNT(VD.id) AS COUNT FROM vaccination_details VD, vaccines V, animal A, disease D WHERE A.id = VD.animal_id AND V.id = VD.vaccine_id AND V.farma_id = A.farma_id AND A.farma_id = '${farma_id}' AND VD.last_date < CURDATE() AND VD.last_date IS NOT NULL AND D.id = V.disease_id;`,

        heavyAnimals: `SELECT COUNT(A.id) AS COUNT FROM animal A, breeding B WHERE A.id = B.animal_id AND A.animal_type='${animal_type}' AND A.farma_id='${farma_id}' AND B.expected_due_date >= CURDATE();`,

        pendingAnimals: `SELECT COUNT(A.id) AS COUNT FROM vaccination_details A, animal C WHERE A.animal_id = C.id AND C.animal_type = '${animal_type}' AND C.farma_id = '${farma_id}' AND C.confirmed = 'Y' AND A.confirmed = 'Y';`,

        allFeeds: `SELECT COUNT(*) as COUNT FROM feeds WHERE animal_type='${animal_type}' AND farma_id='${farma_id}' AND quantity > 0;`,

        allProducts: `SELECT COUNT(B.id) as COUNT FROM animal A, products B WHERE B.animal_id = A.id AND A.farma_id = '${farma_id}' AND A.animal_type='${animal_type}';`,

    }

    if (farma_id) {
        connection.query(queries[param], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {
                console.log(error);
            };
            response.send({ count: results });
        })
    } else {
        console.log(" trying to delete with no farma_id 🤣😂 ");
        response.redirect('/');
    }

});


// Function to return animal type dashboard data count
app.get('/getType', function (request, response) { response.send({ type: storage('animal') }); });


// Function to return animal type dashboard data count
app.get('/getFarmaName', function (request, response) { response.send({ type: storage('farma_name') }); });


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

        allDiseases: `SELECT * FROM disease WHERE animal_type = '${animal_type}';`,

        symptoms: `SELECT * FROM symptoms S, disease D WHERE S.disease_id = D.id AND D.animal_type = '${animal_type}';`,

        allAnimals: `SELECT id, animal_tag, gender,  dob, reg_date, TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS YEARS, TIMESTAMPDIFF(MONTH, dob, CURDATE()) AS MONTHS, TIMESTAMPDIFF(DAY, dob, CURDATE()) AS DAYS FROM animal WHERE farma_id='${farma_id}' AND animal_type = '${animal_type}' AND confirmed = 'Y';`,

        notHeavyAnimals: ` SELECT A.id, A.animal_tag, A.animal_type, A.farma_id, A.gender, GP.period
                           FROM animal A, gestation_periods GP
                           WHERE A.id NOT IN (SELECT animal_id FROM breeding) AND A.animal_type='${animal_type}'
                           AND GP.animal_type = '${animal_type}'
                           AND A.gender = 'Female'
                           AND A.animal_type = GP.animal_type
                           AND  DATEDIFF(NOW(),A.dob) >= GP.ready_after
                           AND A.farma_id = '${farma_id}';`,

        expectingToday: `SELECT A.id, A.animal_tag, B.breeding_date, B.expected_due_date, TIMESTAMPDIFF(DAY, CURDATE(), B.expected_due_date) AS DAYS FROM animal A, breeding B WHERE A.id = B.animal_id AND TIMESTAMPDIFF(DAY, CURDATE(), B.expected_due_date) = 0 AND A.animal_type='${animal_type}' AND A.farma_id='${farma_id}';`,

        expectingAnimals: `SELECT A.id, A.animal_tag, B.breeding_date, B.expected_due_date, TIMESTAMPDIFF(DAY, CURDATE(), B.expected_due_date) AS DAYS FROM animal A, breeding B WHERE A.id = B.animal_id AND A.animal_type='${animal_type}' AND A.farma_id='${farma_id}' AND B.expected_due_date >= CURDATE();`,

        sickAnimals: `SELECT SA.id, A.animal_tag as ANIMAL_TAG, (SELECT disease_name FROM disease WHERE id = SA.disease_id) AS DISEASE, (SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = SA.vet_id) AS VET_NAME, SA.vet_id, SA.reported_date, SA.appointment_date, SA.confirmed FROM sick_animals SA, animal A WHERE A.farma_id='${farma_id}' AND A.animal_type='${animal_type}' AND SA.animal_id = A.id;`,

        editSickAnimals: `SELECT SA.id, A.animal_tag as ANIMAL_TAG, (SELECT disease_name FROM disease WHERE id = SA.disease_id) AS DISEASE, (SELECT symptom_name FROM symptom WHERE disease = (SELECT id FROM disease WHERE id = SA.disease_id))AS SS, (SELECT CONCAT(fname, ' ', lname) FROM vets WHERE vet_id = SA.vet_id) AS VET_NAME, (SELECT email FROM vets WHERE vet_id = SA.vet_id) AS VET_MAIL, SA.reported_date, SA.appointment_date, SA.confirmed, SA.disease_id, SA.vet_id FROM sick_animals SA, animal A WHERE A.farma_id = '${farma_id}' AND A.animal_type='${animal_type}' AND SA.animal_id = A.id;`,

        babies: `SELECT id, animal_tag, dob, parent_tag, created_date FROM animal WHERE farma_id = '${farma_id}' AND animal_type='${animal_type}' AND parent_tag IS NOT NULL AND confirmed = 'N';`,

        newBorns: `SELECT id, new_born_tag, dob, (SELECT animal_tag FROM animal WHERE id = parent_id) as parent_tag, created_at FROM new_born WHERE parent_id IN (SELECT id FROM animal WHERE farma_id = '${farma_id}');`,

        vaccinatedAnimals: `SELECT * FROM animal A, due_dates B WHERE A.id = B.animal_id AND A.animal_type = '${animal_type}' AND A.farma_id = '${farma_id}' AND B.vaccination_date IS NOT NULL AND B.vaccination_date < CURRENT_DATE();`,

        pendingAnimals: ` SELECT A.id, C.animal_tag, A.first_date, (SELECT name FROM vaccines WHERE id = A.vaccine_id) AS vaccine_name, 
                          (SELECT disease_name FROM disease WHERE id = (SELECT disease_id FROM vaccines WHERE id = A.vaccine_id)) AS disease_name,
                          (SELECT (cycle*period) FROM vaccines WHERE id = A.vaccine_id) AS no_of_vaccinations
                          FROM vaccination_details A, animal C WHERE A.animal_id = C.id AND C.animal_type = '${animal_type}' 
                          AND C.farma_id = '${farma_id}' AND C.confirmed = 'Y';`,

        availableVaccines: `SELECT id, name, quantity, IF(quantity_measure >= 1000, 'millilitres', 'litres') AS measure, description, cycle, period, injection_area, (SELECT disease_name FROM disease WHERE id = vaccines.disease_id) AS disease_name FROM vaccines WHERE animal_type = '${animal_type}' AND farma_id = '${farma_id}';`,

        feeds: `SELECT id, name, description, quantity, quantity_measure, IF(quantity_measure >= 1000, 'kg', 'g') AS measure, stock_date, expected_restock_date FROM feeds WHERE farma_id='${farma_id}' AND animal_type = '${animal_type}' AND quantity > 0;`,

        timetables: `SELECT id, tt_name, animal_type, cycle, period, quantity_per_cycle, quantity_per_cycle_unit, quantity, quantity_unit, first_feed_date, feeds_id,tt_id,
                    IF(quantity_per_cycle_unit >= 1000, 'kg', 'g') AS quantity_per_cycle_unit,
                    IF(quantity_unit >= 1000, 'kg', 'g') AS quantity_unit
                    FROM feeding_timetable
                    WHERE feeds_id IN (SELECT id FROM feeds WHERE farma_id = '${farma_id}')
                    AND animal_type = '${animal_type}';`,

        fullyVaxedAnimals: `SELECT VD.id, A.animal_tag, V.name, D.disease_name, VD.first_date, VD.last_date FROM vaccination_details VD, vaccines V, animal A, disease D WHERE A.id = VD.animal_id AND V.id = VD.vaccine_id AND V.farma_id = A.farma_id AND A.farma_id = '${farma_id}' AND VD.last_date < CURDATE() AND VD.last_date IS NOT NULL AND D.id = V.disease_id;`,

        vets: `SELECT * FROM vets;`,

        systemAudit: `SELECT action, action_date FROM audit_trail WHERE user_id = '${farma_id}' ORDER BY id DESC;`,

        healthyAnimals: `SELECT id, animal_tag, gender FROM animal WHERE id NOT IN (SELECT animal_id FROM sick_animals) AND farma_id = '${farma_id}' AND animal_type = '${animal_type}';`,

        allProducts: `SELECT B.id, A.animal_tag, B.name, B.quantity, C.expected_qnty, IF(B.quantity_measure >= 1000, 'kg', 'g') AS measure FROM animal A, products B, product_schedule C WHERE B.animal_id = A.id AND B.animal_id = C.animal_id AND A.farma_id = '${farma_id}' AND A.animal_type='${animal_type}';`,

    }

    if (farma_id) {

        connection.query(queries[param], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {
                response.send({ listing: error });
            } else {

                response.send({ listing: results });

            }

        })

    } else {

        response.redirect('/');

    }

});


// Cleaned
// SCHEDULE LISTINg
app.get('/getScheduletListing/:param', function (request, response) {

    const user_id = storage('farma_id');

    const param = request.params.param;

    console.log(param);

    const queries = `SELECT id,feeding_tt_id,
                        effective_date,next_date,
                        FORMAT(((feeds_quantity*feeding_schedule.qnty_unit) / qnty_per_cycle_unit), 2) as feeds_quantity,
                        FORMAT(((feeds_qnty_pending*feeding_schedule.qnty_unit)/qnty_unit), 2) as feeds_qnty_pending,
                        IF(qnty_unit >= 1000, 'kg', 'g' ) as unit,
                        schedule_id
                        FROM feeding_schedule WHERE feeding_tt_id = '${param}';`

    if (user_id) {

        connection.query(queries, function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {
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
app.get('/isConfirmed/:param', function (request, response) {

    const user_id = storage('farma_id');

    const param = request.params.param;

    console.log(param);

    const queries = `SELECT confirmed FROM vaccination_details WHERE id = '${param}';`

    if (user_id) {

        connection.query(queries, function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {
                response.send({ status: 500, error_message: "an error happened" + error });
            } else {

                if (results[0].confirmed = 'Y') {

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

                console.log(error);

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

    console.log(param);

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

        console.log("CODE => " + code);
        console.log("ISER_ID => " + userId);

        storage('farma_id', userId);

        console.log(storage('farma_id'));

        // query to return the tokens
        connection.query(`CALL verify_otp ('${userId}', '${code}', @user_id);`, function (err, result) {
            if (err) {
                console.log(err);
                response.send({ status: 500, message: " NOOOO LOL " });
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

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                return response.json({ status: 200, message: 'User Registration Successfuly.', user_id: `${f_id}` });

            }

        });

    } else {

        return response.json({ status: 500, message: 'EMPTY EMAIL & PASSWORD' });

    }

});


// Registering a user
app.post('/testPost', function (request, response) {

    console.log(request.body);

    response.send({ data: request.body });

});


// login authentication
app.post('/authenticate', function (request, response) {

    console.log(request.body);

    // Ensure the input fields exists and are not empty
    if (request.body.mail && request.body.pass) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query(`SELECT a.farma_id, a.first_name, a.last_name, a.mail, (SELECT password FROM pwd WHERE farma_id = a.farma_id) AS pwd, b.list_of_animals FROM farma a,  animals_at_farm b WHERE a.mail = '${request.body.mail}' AND (AES_DECRYPT(FROM_BASE64((SELECT password FROM pwd WHERE farma_id = a.farma_id) ), a.farma_id)) = '${request.body.pass}' AND a.farma_id = b.farma_id;`, function (error, results, fields) {

            // If there is an issue with the query, output the error
            if (error) {
                console.log(error);
                response.redirect(`/`);
            }

            console.log(results);

            // If the account exists
            if (results.length > 0) {

                console.log(results);

                console.log("SUCCESSFULLY AUTHENTICATED");

                // Authenticate the user
                const row = Object.values(JSON.parse(JSON.stringify(results)));

                console.log(row);

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

                console.log(error);

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


// TODO test new born registration
// Registering a new animal
app.post('/addNewBorn', function (request, response) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    // Execute SQL query that'll insert into the farma table
    connection.query(`INSERT INTO animal (animal_tag, parent_tag, gender, dob, reg_date, animal_type, farma_id, confirmed) VALUES ('${request.body.newBornTag}', '${request.body.parentTag}', '${request.body.newBornGender}', '${request.body.newBornDOB}', '${request.body.newBornRegDate}', '${animal}', '${farma_id}', 'Y');`,

        function (error, results, fields) {

            if (error) {

                console.log(error);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: ` ${request.body.newBornTag} Added Successfuly ! ` });

                } else {

                    return response.json({ status: 400, message: ` Adding ${request.body.newBornTag} Failed` });

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
            if (error) throw error;
        });

    response.redirect(`/animal/${animal}`);

    return;
})


// Updating animal data
app.post('/updateAnimalData', function (request, response) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    // Execute SQL query that'll insert into the farma table
    connection.query(`UPDATE animal SET animal_tag = '${request.body.editAnimalTag}', gender = '${request.body.editGender}', dob = '${request.body.editDob}', reg_date = '${request.body.editRegDate}' WHERE animal_type ='${animal}' AND farma_id = '${farma_id}' AND id='${request.body.editid}';`,

        function (error, results, fields) {

            if (error) {

                console.log(error);

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
                // response.redirect(`/animal/${animal}`); 

                console.log(error);
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
    connection.query(`INSERT INTO vaccines (name, quantity, quantity_measure, description, cycle, period, injection_area, disease_id, animal_type, farma_id) VALUES ('${request.body.vaccineName}', ${request.body.vaccineQuantity}, '${request.body.quantityMeasure}', '${request.body.vaccineDesc}', ${request.body.vaccineCycle}, ${request.body.vaccinePeriod}, '${request.body.injectionArea}', '${disease_id}', '${animal}', '${farma_id}');`,

        function (error, results, fields) {

            if (error) {

                console.log(error);

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

                console.log(error);

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

                console.log(error);

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

                console.log(error);

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


// Inserting Vaccines into the DB
app.post('/updateVet', function (request, response) {
    const animal = storage('animal');

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`UPDATE vets SET fname = '${request.body.editVetFname}', lname = '${request.body.editVetLname}', email = '${request.body.editVetEmail}', phone = '${request.body.editVetPhone}', station = '${request.body.editVetStation}' WHERE vet_id = '${request.body.editVetID}';`,

        function (error, results, fields) {

            if (error) {

                console.log(error);

                return response.json({ status: 500, message: error.sqlMessage });

            } else {

                console.log(results);

                if (results.affectedRows > 0) {

                    return response.json({ status: 200, message: `${request.body.editVetFname} ${request.body.editVetLname} has been Added Successfuly.` });

                } else {

                    return response.json({ status: 400, message: `Adding ${request.body.editVetFname} ${request.body.editVetLname} Failed ` });

                }

            }

        }

    );

});

// // Inserting Vaccines into the DB
// app.post('/updateSick', function (request, response) {
//     const animal = storage('animal');
//     // Execute SQL query that'll insert into the vaccines table
//     connection.query(`CALL update_sick('${request.body.edit_sick_animal_id}', '${request.body.editReportedDate}', '${request.body.editVetName}', '${request.body.editAppointmentDate + ' ' + request.body.editAppointmentTime}', '${request.body.disease_suspected}', '${request.body.editSSText}' )`,
//         function (error, results, fields) {
//             if (error) {
//                 console.log(error);
//                 console.log(error.errno);
//                 console.log(error.message);
//                 console.log(error.name);
//                 response.redirect(`/animal/rabbbit`);
//             }
//         });

//     response.redirect(`/animal/${animal}`);
//     return;
// })


// Confirming appointment
app.post('/confirmation', function (request, response) {

    const animal = storage('animal');

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`UPDATE sick_animals SET confirmed = 'Y' WHERE id = '${request.body.edit_sick_animal_id}';`,

        function (error, results, fields) {

            if (error) {

                console.log(error);

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

                    sendmail(params);

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
    const animal = storage('animal');

    const queries = `UPDATE animal SET confirmed = 'Y', gender = '${request.body.newBornAnimalGender}' WHERE farma_id = '${user_id}' AND animal_tag = '${request.body.newBornAnimalTag}' AND parent_tag = '${request.body.newBornParentTag}' AND confirmed = 'N';`

    if (user_id) {

        connection.query(queries,

            function (error, results, fields) {

                if (error) {

                    console.log(error);

                    return response.json({ status: 500, message: error.sqlMessage });

                } else {

                    console.log(results);

                    if (results.affectedRows > 0) {

                        return response.json({ status: 200, message: ` ${request.body.newBornAnimalTag} has been confirmed Successfuly.` });

                    } else {

                        return response.json({ status: 400, message: `${request.body.newBornAnimalTag} Confirmation Failed ` });

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

                console.log(error);

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

                console.log(error);

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



// Reportinsg Sick animals into the DB
app.post('/addSick', function (request, response) {

    const animal = storage('animal');

    const disease_id = request.body.suspected_disease === undefined ? 0 : request.body.suspected_disease;

    if (animal) {

        // Execute SQL query that'll insert into the vaccines table
        connection.query(`CALL recordSick(${request.body.healthyAnimals}, '${request.body.reportedDate}', '${request.body.vets_id}', '${request.body.appointment_date}', ${disease_id}, '${request.body.ssText}');`,

            function (error, results, fields) {

                if (error) {

                    console.log(error);

                    return response.json({ status: 500, message: error.sqlMessage });

                } else {

                    console.log(results);

                    if (results.affectedRows > 0) {

                        return response.json({ status: 200, message: `${request.body.healthyAnimals} has recorded Successfuly.`});

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

    connection.query(`CALL seedOTP('${request.body.mail}');`, function (error, results, fields) {

        if (error) {

            console.log(error);

            return response.json({ status: 500, message: 'SQL Error. Refresh and Try Again.' + error });

        } else {

            console.log(results);
            console.log(results.affectedRows);

            if (results.affectedRows = 1) {

                // results.forEach(element => {
                //     console.log(element);
                // });

                return response.json({ status: 200, message: `HERE IS THE OTP CODE ${results[0]}` });

            } else {

                return response.json({ status: 400, message: 'NO OTP CODE GENERATED' });

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
                console.log(error);
            } else {

                console.log(results);

                // If the account exists

                results.forEach(element => {
                    if (element.list_of_animals == null) {
                        // Query to update the list of animals for the farmer with no animals
                        connection.query(`UPDATE animals_at_farm SET list_of_animals = JSON_ARRAY(JSON_OBJECT("name" , "${getDetails.name}", "image_url" , "${getDetails.image_url}")) WHERE farma_id = '${f_id}';`,
                            function (error, results, fields) {
                                // If there is an issue with the query, output the error
                                if (error) throw error;
                                // If the account exists
                                return;
                            }
                        );
                    } else {
                        // Query to update the list of animals for all the farmer
                        connection.query(`UPDATE animals_at_farm SET list_of_animals = JSON_ARRAY_APPEND(list_of_animals, '$', JSON_OBJECT("name" , "${getDetails.name}", "image_url" , "${getDetails.image_url}")) WHERE farma_id = '${f_id}';`,
                            function (error, results, fields) {
                                // If there is an issue with the query, output the error
                                if (error) throw error;
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
            console.log('err');
            console.log(err);
            response.redirect('/home');
        } else {
            if (request.file == undefined) {
                response.redirect('/home');
                console.log('failure');
            } else {
                console.log('SUCCESS');

                console.log(request.file.originalname);
                console.log(storage('img_url'));

                const f_id = storage('farma_id');
                const animal_name = request.body.animal_type;
                const animal_count = request.body.count;
                const animal_description = request.body.desc;
                const image_url = `http://localhost:4200/images/${storage('img_url')}`;

                // Query to update the list of animals for all the farmer
                connection.query(`UPDATE animals_at_farm SET list_of_animals = JSON_ARRAY_APPEND(list_of_animals, '$', JSON_OBJECT("name" , "${animal_name}", "desc" , "${animal_description}", "image_url" , "${image_url}")) WHERE farma_id = '${f_id}';`,
                    function (error, results, fields) {
                        // If there is an issue with the query, output the error
                        if (error) throw error;
                        return;
                    });

                // Query to update the list of animals for all the farmer
                connection.query(`INSERT INTO animals (animal_type, count, farma_id) VALUES ('${animal_name}', ${animal_count}, '${f_id}');`,
                    function (error, results, fields) {
                        // If there is an issue with the query, output the error
                        if (error) throw error;
                        return;
                    });

                response.redirect('/home');

            }
        }
    });
});


// Function to delete data from animal
app.post('/delete', function (request, response) {

    const param_id = request.body.id;
    const par = request.body.type;

    const user_id = storage('farma_id');
    const animal = storage('animal');

    const queries = {
        vaccine: `DELETE FROM vaccines WHERE id = ${param_id};`,
        animal: `DELETE FROM animal WHERE farma_id='${user_id}' AND id = '${param_id}';`,
        sickAnimal: `DELETE FROM sick_animals WHERE id = '${param_id}';`,
        timetable: `DELETE FROM feeding_timetable WHERE feeds_id IN (SELECT id FROM feeds WHERE farma_id = '${user_id}') AND id = '${param_id}';`,
        vet: `DELETE FROM vets WHERE vet_id = '${param_id}';`,
        feed: `DELETE FROM feeds WHERE id = '${param_id}'`
    }

    if (user_id) {
        connection.query(queries[par], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {
                console.log(error);
            } else {
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