const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const storage = require("store2");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { default: store } = require('store2');

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'derek_2022',
    password: '18ba6a01',
    database: 'farma_2022'
});

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


// First page
app.get('/test', function (request, response) {
    // Get saved data from sessionStorage
    response.sendFile(path.join(__dirname + '/test_dir/last.html'));
});


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


// Register
app.get('/register', function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/public/register.html'));
});


// Logout
app.get('/logout', (req, res) => {
    // req.session.destroy();
    // Remove all saved data from sessionStorage
    storage.remove('farma_id');
    storage.clear();
    storage.clearAll();
    res.redirect('/');
});


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

                let id;
                row.forEach((v) => id = v.farma_id);

                row.forEach(element => {
                    if (element.list_of_animals == null) {
                        response.redirect('/selection');
                    } else {
                        response.redirect('/home');
                    }
                });

                // Save data to sessionStorage
                storage('farma_id', id);

            } else {
                response.redirect(`/`);
            }

            response.end();

        });
    } else {
        response.send('Please enter email and/or Password!');
    }
});


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


// First page
app.get('/home', function (request, response) {
    // Get saved data from sessionStorage
    const user_id = storage('farma_id');
    if (user_id) {
        response.sendFile(path.join(__dirname + '/public/home.html'));
    } else {
        response.redirect('/');
    }
});


// First page
app.get('/selection', function (request, response) {
    // Get saved data from sessionStorage
    const user_id = storage('farma_id');
    if (user_id) {
        response.sendFile(path.join(__dirname + '/public/nohome.html'));
    } else {
        response.redirect('/');
    }
});


// Selected animal from listing end point 
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


// Function to retrieve dashboard data
app.get('/get-count/:animal', function (request, response) {
    const user_id = storage('farma_id');
    if (user_id) {
        const animal_name = request.params.animal;
        connection.query(`SELECT a.animal_type, a.count, COUNT(b.disease_id) AS sickCount FROM animals a, animal b WHERE a.farma_id='${user_id}' AND a.farma_id = b.farma_id AND a.animal_type = b.animal_type AND a.animal_type='${animal_name}' GROUP BY a.animals_id;;`, function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            results.forEach(element => {
                console.log(element);
                if (element.count == null) {
                    console.log("😒😒😒😒😒");
                } else {
                    response.send(JSON.parse(JSON.stringify(element)));
                }
            });
        })
    } else {
        console.log(" GET-ANIMAL no farma_id  ");
        response.redirect('/');
    }
});


// Function to retrieve dashboard data
app.get('/get-sick/:animal', function (request, response) {
    const user_id = storage('farma_id');
    if (user_id) {
        const animal_name = request.params.animal;
        connection.query(`SELECT COUNT(*) AS sick_count FROM animal WHERE farma_id='${user_id}' AND animal_type='${animal_name}';`, function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            results.forEach(element => {
                console.log(element.sick_count + 'one');
                if (element.sick_count == null) {
                    console.log("😒😒😒😒😒");
                } else {
                    console.log(element.sick_count + 'two');
                    response.send(JSON.parse(JSON.stringify(element.sick_count)));
                }
            });
        })
    } else {
        console.log(" GET-SICK ANIMALs no farma_id ");
        response.redirect('/');
    }
});


// Function to retrieve farma data
app.get('/getFarmaData', function (request, response) {
    const user_id = storage('farma_id');
    if (user_id) {
        connection.query(`SELECT * FROM farma WHERE farma_id='${user_id}';`, function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            results.forEach(element => {
                if (element == null) {
                    console.log("😒😒😒😒😒");
                } else {
                    response.send(JSON.parse(JSON.stringify(element)));
                }
            });
        })
    } else {
        console.log("FARMA DATA no farma_id");
        response.redirect('/');
    }
});


// Function to retrieve animal data for table
app.get('/getAnimalListing', function (request, response) {
    const user_id = storage('farma_id');
    const animal = storage('animal');

    if (user_id) {
        connection.query(`SELECT id, animal_tag, gender,  dob, reg_date FROM animal WHERE farma_id=(?) AND animal_type=(?)`, [user_id, animal], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            response.send({animalListing: results});
        })
    } else {
        response.redirect('/');
    }

});


// Function to retrieve animal's vaccination data
app.get('/getVaccinationData', function (request, response) {
    const user_id = storage('farma_id');
    const animal = storage('animal');

    if (user_id) {
        connection.query(`SELECT id, animal_tag, gender,  dob, reg_date FROM animal WHERE farma_id=(?) AND animal_type=(?)`, [user_id, animal], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            response.send({animalListing: results});
        })
    } else {
        response.redirect('/');
    }

});


// Function to retrieve animal data for table
app.get('/getAvailableVaccines', function (request, response) {
    const animal = storage('animal');
    connection.query(`SELECT * FROM vaccines WHERE animal_type=(?)`, [animal], function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        response.send({ vaccines: results });
    })
});


// Function to retrieve animal data for table
app.get('/getAnimalMaxId', function (request, response) {
    const user_id = storage('farma_id');
    const animal = storage('animal');

    if (user_id) {
        connection.query(`SELECT MAX(id) AS LAST, animal_type FROM animal WHERE farma_id=(?) AND animal_type=(?)`, [user_id, animal], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            response.send({animalMaxId: results});
        })
    } else {
        response.redirect('/');
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


// Inserting Vaccination Data into the DB
app.post('/insertData', function (req, res) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    // Execute SQL query that'll insert into the farma table
    connection.query(`INSERT INTO animal (animal_tag, gender, dob, reg_date, animal_type, farma_id) VALUES ('${req.body.tag}', '${req.body.gender}', '${req.body.dob}', '${req.body.regDate}', '${animal}', '${farma_id}');`, function (error, results, fields) {
        if (error) throw error;
    });
})


// Inserting Vaccines into the DB
app.post('/newVaccine', function (req, res) {
    const farma_id = storage('farma_id');
    const animal = storage('animal');
    // Execute SQL query that'll insert into the vaccines table
    connection.query(`INSERT INTO vaccines (name, quantity, quantity_measure, description, number_of_vaccinations, cycle, period, injection_area, animal_type) VALUES ('${req.body.vaccineName}', ${req.body.vaccineQuantity}, '${req.body.quantityMeasure}', '${req.body.vaccineDescription}', ${req.body.noVaccinations}, ${req.body.vaccineCycle}, ${req.body.vaccinePeriod}, '${req.body.injectionArea}', '${animal}');`, 
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
                connection.query(`INSERT INTO animals (animal_type, count, farma_id) VALUES ('${animal_name}', ${animal_count}, '${f_id}';`,
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
app.post('/delete:/param', function (request, response) {
    const param = request.params.param;
    const user_id = storage('farma_id');
    const param_id = request.body.id;

    const queries = {
        vaccine: `DELETE FROM vaccine WHERE farma_id='${user_id}' AND id = '${param_id}';`,
        animal: `DELETE FROM animal WHERE farma_id='${user_id}' AND id = '${param_id}';`
    }
    
    if (user_id) {
        connection.query(, function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
        })
    } else {
        console.log(" trying to delete with no farma_id 🤣😂 ");
        response.redirect('/');
    }
});


app.listen(3000);