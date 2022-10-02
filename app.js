// GLOBAL CONFIGURATIONS/variables
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const storage = require("store2");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { default: store } = require('store2');

// DATABASE CONNECTIONS
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'derek_2022',
    password: '18ba6a01',
    database: 'farma_2022'
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
    filename: function (req, file, cb) {
        console.log(Date.now() + path.extname(file.originalname));
        storage('img_url', Date.now() + path.extname(file.originalname));
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const uploadImage = multer({
    storage: upload,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
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

    storage('img_name', `http://localhost:3000/images/${file.originalname}`);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
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
        response.sendFile(path.join(__dirname + '/public/login.html'));
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
    const user_id = storage('farma_id');
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
        const all_animals = storage('all-animals');
        const isSelected = all_animals.includes(animal_name);

        if (isSelected == true) {
            response.sendFile(path.join(__dirname + '/public/dashboard.html'));
        }

    } else {
        response.redirect('/home');
    }
})

// Logout
app.get('/logout', (req, res) => {
    // req.session.destroy();
    // Remove all saved data from sessionStorage
    storage.remove('farma_id');
    storage.clear();
    storage.clearAll();
    res.redirect('/');
});



/* 

    END POINTS THAT READ FROM THE DATABASE


*/

// Filtering cards to be shown
app.get('/before-home', function (request, response) {
    const user_id = storage('farma_id');
    if (user_id) {
        connection.query(`SELECT list_of_animals FROM animals_at_farm WHERE farma_id=(?)`, [user_id], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;

            results.forEach(element => {
                if (element.list_of_animals == null) {
                    console.log("😒😒😒😒😒");
                } else {
                    storage('all-animals', JSON.parse(JSON.stringify(element.list_of_animals)));
                    response.send(JSON.parse(JSON.stringify(element.list_of_animals)));
                }
            });
        })
    } else {
        console.log("BEFORE-HOME animals listing retrieval oder keine farma_id ");
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
        allAnimals: `SELECT COUNT(id) AS COUNT FROM animal WHERE animal_type='${animal_type}' AND farma_id='${farma_id}';`,
        sickAnimals: `SELECT COUNT(A.id) as COUNT FROM animal A, treatment_history B WHERE A.id = B.animal_id AND A.animal_type='${animal_type}' AND A.animal_tag = B.animal_tag AND A.farma_id='${farma_id}';`,
        newBorns: `SELECT COUNT(parent_tag) as COUNT FROM animal WHERE farma_id = '${farma_id}' AND animal_type='${animal_type}';`,
        vaccinatedAnimals: `SELECT COUNT(B.id) as COUNT FROM animal A, due_dates B WHERE A.id = B.animal_id AND A.animal_type = '${animal_type}' AND A.farma_id='${farma_id}' AND B.vaccination_date IS NOT NULL AND B.vaccination_date < CURRENT_DATE();`,
        heavyAnimals: `SELECT COUNT(*) as COUNT FROM animal A, due_dates B WHERE A.id = B.animal_id AND A.animal_type='${animal_type}' AND A.farma_id = B.farma_id AND B.farma_id='${farma_id}';`,
        pendingAnimals: `SELECT COUNT(B.vaccination_date) AS COUNT FROM animal A, due_dates B WHERE A.animal_type='${animal_type}' AND A.farma_id = B.farma_id AND B.farma_id ='${farma_id}' AND B.vaccination_date IS NOT NULL;`,
        allFeeds: `SELECT COUNT(*) as COUNT FROM feeds WHERE animal_type='${animal_type}' AND farma_id='${farma_id}';`,
        allProducts: `SELECT COUNT(B.id) as COUNT FROM animal A, products B WHERE B.animal_id = A.id AND A.farma_id = '${farma_id}' AND A.animal_type='${animal_type}';`,
    }

    if (farma_id) {
        connection.query(queries[param], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            response.send({ count: results });
        })
    } else {
        console.log(" trying to delete with no farma_id 🤣😂 ");
        response.redirect('/');
    }

});


// // COUNT END POINTS
// // OPTIMISED COUNT SOLUTION
// // Cleaned Function to retrieve dashboard data count
// app.get('/getCount', function (request, response) {
//     const animal_type = storage('animal');
//     const farma_id = storage('farma_id');

//     if (farma_id) {
//         const query = `CALL getCount('${farma_id}', '${animal_type}');`;
//         connection.query(query, function (error, results, fields) {
//             // If there is an issue with the query, output the error
//             if (error) throw error;

//             console.log(results);
//             response.send({ count: results });

//         })

//     } else {

//         console.log(" trying to delete with no farma_id 🤣😂 ");
//         response.redirect('/');

//     }

// });


// Function to return animal type dashboard data count
app.get('/getType', function (request, response) { response.send({ type: storage('animal') }); });


//  LISTING END POINTS
// Cleaned
app.get('/getListing/:param', function (request, response) {
    const animal_type = storage('animal');
    const farma_id = storage('farma_id');
    const param = request.params.param;

    const queries = {
        farma_data: `SELECT * FROM farma WHERE farma_id = '${farma_id}';`,
        diseases: `SELECT * FROM disease WHERE animal_type = '${animal_type}';`,
        symptoms: `SELECT * FROM symptoms S, disease D WHERE S.disease_id = D.id AND D.animal_type = '${animal_type}';`,
        allAnimals: `SELECT id, animal_tag, gender,  dob, reg_date FROM animal WHERE farma_id='${farma_id}' AND animal_type = '${animal_type}';`,
        expectingAnimals: `SELECT a.id,  a.delivery_date, b.animal_tag, c.insemination_date FROM due_dates a, animal b, first_dates c WHERE b.farma_id = '${farma_id}' AND b.animal_type = '${animal_type}' AND a.animal_id = b.id AND a.animal_id = c.animal_id AND c.animal_id = b.id AND a.animal_id=b.id AND a.farma_id = b.farma_id AND a.delivery_date IS NOT NULL;`,
        sickAnimals: `SELECT id, animal_tag, gender,  dob, reg_date, is_sick FROM animal WHERE farma_id='${farma_id}' AND animal_type='${animal_type}' AND is_sick IS NOT NULL AND is_sick is TRUE;`,
        vaccinatedAnimals: `SELECT * FROM animal A, due_dates B WHERE A.id = B.animal_id AND A.animal_type = '${animal_type}' AND A.farma_id = '${farma_id}' AND B.vaccination_date IS NOT NULL AND B.vaccination_date < CURRENT_DATE();`,
        pendingAnimals: `SELECT A.id, C.animal_tag, A.first_date, A.next_date, A.last_date, B.no_of_vaccinations, A.no_pending FROM vaccination_details A, vaccines B, animal C, vets D WHERE A.vet_id = D.vet_id AND A.no_pending > 0 AND A.animal_id = C.id AND A.no_pending IS NOT NULL AND C.animal_type = '${animal_type}' AND C.animal_type = B.animal_type AND C.animal_type = A.animal_type AND B.id = A.vaccine_id AND B.farma_id = C.farma_id AND C.farma_id = '${farma_id}' AND A.last_date > CURDATE();`,
        availableVaccines: `SELECT * FROM vaccines WHERE animal_type = '${animal_type}' AND farma_id = '${farma_id}';`,
        feeds: `SELECT * FROM feeds WHERE farma_id='${farma_id}' AND animal_type = '${animal_type}';`,
        timetables: `SELECT * FROM feeding_timetable WHERE farma_id = '${farma_id}' AND animal_type = '${animal_type}';`,
        fullyVaxedAnimals: `SELECT VD.id, A.animal_tag, V.name, D.disease_name, V.no_of_vaccinations, VD.first_date, VD.last_date FROM vaccination_details VD, vaccines V, animal A, disease D WHERE A.id = VD.animal_id AND V.id = VD.vaccine_id AND V.farma_id = A.farma_id AND A.farma_id = '${farma_id}' AND VD.last_date < CURDATE() AND VD.last_date IS NOT NULL AND D.id = V.disease_id;`,
        vets: `SELECT * FROM vets;`,
        healthyAnimals: `SELECT id, animal_tag, gender FROM animal WHERE id NOT IN (SELECT animal_id FROM sick_animals) AND farma_id = '${farma_id}' AND animal_type = '${animal_type}';`

    }

    if (farma_id) {

        connection.query(queries[param], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            response.send({ listing: results });
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

    const queries = {
        animal_id: `SELECT MAX(id) AS LAST, animal_type FROM animal  WHERE animal_type='${animal}' AND farma_id = '${user_id}';`,
        timetable_id: `SELECT MAX(id) AS LAST, animal_type FROM feeding_timetable WHERE farma_id = '${user_id}' AND animal_type = '${animal}';`
    }

    if (user_id) {
        connection.query(queries[param], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            response.send({ last_id: results });
        })
    } else {
        console.log(" trying to delete with no farma_id 🤣😂 ");
        response.redirect('/');
    }

});



/*
    
    ENDPOINTS THAT WRITE TO DATABASE 

*/

// Registering a user
app.post('/register', function (request, response) {
    // Capture the input fields
    const f_id = uuidv4();
    const mail = request.body.mail;
    const password = request.body.password;
    const password2 = request.body.password2;

    // // Regex to name a table to store the registered farmer
    // const re = /(?<=@).*$/
    // const from_mail = mail.replace(re, "").replace('@', '');

    if (mail !== null && password2 !== null) {
        // Execute SQL query that'll insert into the farma table
        connection.query(`INSERT INTO farma (farma_id, mail, password) VALUES (?, ?, ?);`, [f_id, mail, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            console.log("RESULTS" + results);
            console.log("FIELDS " + fields);
            return;
        });

        connection.query(`INSERT INTO animals_at_farm (farma_id) VALUES (?);`, [f_id], function (error, results, fields) {
            // connection.query(`INSERT INTO animals_at_farm (list_of_animals, farma_id) VALUES (JSON_ARRAY(), '${f_id}');`, function (error, results, fields) {
            // connection.query(`INSERT INTO animals_at_farm (list_of_animals, farma_id) VALUES (?,?);`, [JSON.stringify(animals), f_id], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            console.log("RESULTS" + results);
            console.log("FIELDS " + fields);

            response.redirect('/');
            response.end();
        });

    } else {
        alert(' EMPTY DATA FEILDS !');
        response.end();
    }
});

// login authentication
app.post('/auth', function (request, response) {
    // Capture the input fields
    let mail = request.body.mail;
    let password = request.body.password;

    // Ensure the input fields exists and are not empty
    if (mail && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query(`SELECT a.farma_id, a.mail, a.password, b.list_of_animals FROM farma a, animals_at_farm b WHERE a.mail = '${mail}' AND a.password = '${password}' AND a.farma_id = b.farma_id;`, function (error, results, fields) {
            // connection.query('SELECT farma_id, mail, password FROM farma WHERE mail = ? AND password = ?', [mail, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                const row = Object.values(JSON.parse(JSON.stringify(results)));

                row.forEach(element => {
                    // Save data to sessionStorage
                    storage('farma_id', element.farma_id);

                    if (element.list_of_animals == null) {
                        response.redirect('/selection');
                    } else {
                        response.redirect('/home');
                    }
                });

            } else {
                response.redirect(`/`);
            }

            response.end();

        });
    } else {
        response.send('Please enter email and/or Password!');
    }
});

// Registering a new animal
app.post('/newAnimal', function (req, res) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    // Execute SQL query that'll insert into the farma table
    connection.query(`INSERT INTO animal (animal_tag, gender, dob, reg_date, animal_type, farma_id) VALUES ('${req.body.animalTag}', '${req.body.gender}', '${req.body.dob}', '${req.body.regDate}', '${animal}', '${farma_id}');`, function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        res.redirect(`/animal/${animal}`);
        return;
    });
})


// TODO test new born registration
// Registering a new animal
app.post('/addNewBorn', function (req, res) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    // Execute SQL query that'll insert into the farma table
    connection.query(`INSERT INTO animal (animal_tag, parent_tag, gender, dob, reg_date, animal_type, farma_id) VALUES ('${req.body.animalTag}', '${req.body.gender}', '${req.body.dob}', '${req.body.regDate}', '${animal}', '${farma_id}');`, function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        res.redirect(`/animal/${animal}`);
        return;
    });
})

// Inserting new TimeTable into the DB
app.post('/newTimeTable', function (req, res) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');

    // Execute SQL query that'll insert into the feeding_timetable table
    connection.query(`INSERT INTO feeding_timetable (tt_name, animal_type, cycle, period, quantity_per_cycle, quantity_per_cycle_unit, quantity, quantity_unit, planned_period, planned_period_time, first_feed_date, last_feed_date, feeds_id, farma_id) VALUES ('${req.body.timetableTitle}', '${animal}', ${req.body.feedingCycle}, ${req.body.feedingPeriod}, ${req.body.feedingQuantityPerCycle}, ${req.body.feedingQuantityPerCycleUnit}, ${req.body.feedingPeriodQuantity}, ${req.body.feedingPeriodQuantityUnit},  ${req.body.feedingTPeriod}, ${req.body.feedingTime}, '${req.body.feedingFirstDate}', '${req.body.feedingLastDate}', ${req.body.feeds_id}, '${farma_id}');`,
        function (error, results, fields) {
            if (error) throw error;
        });

    res.redirect(`/animal/${animal}`);

    return;
})

// Updating animal data
app.post('/updateAnimalData', function (req, res) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    // Execute SQL query that'll insert into the farma table
    connection.query(`UPDATE animal SET animal_tag = '${req.body.editAnimalTag}', gender = '${req.body.editGender}', dob = '${req.body.editDob}', reg_date = '${req.body.editRegDate}' WHERE animal_type ='${animal}' AND farma_id = '${farma_id}' AND id='${req.body.editid}';`, function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        res.redirect(`/animal/${animal}`);
        return;
    });
})

// Inserting Vaccines into the DB
app.post('/newVaccine', function (req, res) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    // Execute SQL query that'll insert into the vaccines table
    connection.query(`INSERT INTO vaccines (name, quantity, quantity_measure, description, no_of_vaccinations, cycle, period, injection_area, animal_type) VALUES ('${req.body.vaccineName}', ${req.body.vaccineQuantity}, '${req.body.quantityMeasure}', '${req.body.vaccineDescription}', ${req.body.noVaccinations}, ${req.body.vaccineCycle}, ${req.body.vaccinePeriod}, '${req.body.injectionArea}', '${animal}');`,
        function (error, results, fields) {
            if (error) throw error;
        });

    res.redirect(`/animal/${animal}`);
    return;
})

// Inserting Vaccines into the DB
app.post('/newVet', function (req, res) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    const vet_uuid = uuidv4();
    // Execute SQL query that'll insert into the vaccines table
    connection.query(`INSERT INTO vets (fname, lname, email, phone, station, vet_id) VALUES ('${req.body.vetFname}', '${req.body.vetLname}', '${req.body.vetEmail}', '${req.body.vetPhone}', '${req.body.vetStation}', '${vet_uuid}');`,
        function (error, results, fields) {
            if (error) throw error;
        });

    res.redirect(`/animal/${animal}`);
    return;
})

// Inserting Vaccines into the DB
app.post('/updateVet', function (req, res) {
    const animal = storage('animal');

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`UPDATE vets SET fname = '${req.body.editVetFname}', lname = '${req.body.editVetLname}', email = '${req.body.editVetEmail}', phone = '${req.body.editVetPhone}', station = '${req.body.editVetStation}' WHERE vet_id = '${req.body.editVetID}';`,
        function (error, results, fields) {
            if (error) throw error;
        });

    res.redirect(`/animal/${animal}`);
    return;
})

// Inserting Vaccines into the DB
app.post('/scheduleVaccination', function (req, res) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    // Execute SQL query that'll insert into the vaccines table
    connection.query(`INSERT INTO vaccination_details (vaccine_id, first_vaccination_date, next_vaccination_date, last_vaccination_date, animal_id, vet_id, animal_type) VALUES (${req.body.vaxID}, '${req.body.scheduled_first_date}', '${req.body.nextVaccination}', '${req.body.lastVaccination}', ${req.body.animalTag},${req.body.vetID},'${animal}');`,
        function (error, results, fields) {
            if (error) throw error;
        });

    res.redirect(`/animal/${animal}`);
    return;
})

// Updating Farma Profile Data
app.post('/updateFarmaProfile', function (req, res) {
    const data = req.body;
    console.log(data);
    // Execute SQL query that'll insert into the farma table
    connection.query(`UPDATE farma SET first_name = ${data.fname}, last_name = ${data.lname}, phone = ${data.phone} WHERE farma_id = ${f_id});`, function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        console.log("RESULTS" + results);
        console.log("FIELDS " + fields);
        return;
    });

    response.redirect('/home');

})

// Reportig Sick animals into the DB
app.post('/addSick', function (req, res) {
    const animal = storage('animal');

    console.log(req.body);

    // Execute SQL query that'll insert into the vaccines table
    connection.query(`CALL recordSick(${req.body.healthyAnimals}, '${req.body.reportedDate}', '${req.body.vets_id}', '${req.body.appointment_date}', ${req.body.suspected_disease}, '${req.body.ssText}');`,
        function (error, results, fields) {
            if (error) throw error;
        });

    res.redirect(`/animal/${animal}`);

    return;
    
})


// DON'T TOUCH
// Add animals at the farm to DB
app.post('/save', async (req, res) => {
    const getDetails = JSON.parse(JSON.stringify(req.body))

    console.log("NAME FROM FRONTEND  " + getDetails.name);
    console.log(" URL " + getDetails.image_url);

    const f_id = storage('farma_id');

    connection.query(`SELECT list_of_animals FROM animals_at_farm WHERE farma_id = '${f_id}';`,
        function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
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

            res.redirect('/');
            res.end();

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
                const image_url = `http://localhost:3000/images/${storage('img_url')}`;

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
app.post('/delete/:param', function (request, response) {
    const par = request.params.param;
    const user_id = storage('farma_id');
    const param_id = request.body.id;
    const animal = storage('animal');

    console.log(param_id + user_id + animal);

    const queries = {
        vaccine: `DELETE FROM vaccines WHERE id = ${param_id};`,
        animal: `DELETE FROM animal WHERE farma_id='${user_id}' AND id = '${param_id}';`,
        pendingAnimal: `EXEC`,
        timetable: `DELETE FROM feeding_timetable WHERE farma_id = '${user_id}' AND id = '${param_id}';`,
        vet: `DELETE FROM vets WHERE vet_id = '${param_id}';`
    }

    if (user_id) {
        connection.query(queries[par], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;

            console.log(results);

        })

    } else {

        console.log(" trying to delete with no farma_id  ");
        response.redirect('/');
    }
});


// // Reportig Sick animals into the DB
// app.post('/addProc', function (req, res) {
//     // Execute SQL query that'll insert into the vaccines table
//     connection.query(``,
//         function (error, results, fields) {
//             if (error) throw error;
//         });
// })

app.listen(3000);