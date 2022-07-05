const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const storage = require('sessionstorage');

const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'derek_2022',
  password: '18ba6a01',
  database: 'farma_2022'
});

const app = express();

// Global variables
const oneDay = 1000 * 60 * 60 * 24;
let sessions;


app.use(session({
  secret: "session",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// First page
app.get('/', function (request, response) {

  sessions = request.session;
  // Get saved data from sessionStorage
  let data = storage.getItem('email');

  if (data) {
    response.redirect('/home');
  } else {
    console.log("SIRRR");
    response.sendFile(path.join(__dirname + '/login.html'));
  }
});


// register
app.get('/register', function (request, response) {
  // Render login template
  response.sendFile(path.join(__dirname + '/register.html'));
});


// Logout
app.get('/logout', (req, res) => {
  req.session.destroy();

  // Remove all saved data from sessionStorage
  storage.clear();

  res.redirect('/');
});


// Registering a user
app.post('/register', function (request, response) {
  // Capture the input fields
  let mail = request.body.mail;
  let password = request.body.password;
  let password2 = request.body.password2;

  // Ensure the passwords match
  if (password == password2) {
    // Execute SQL query that'll insert into the farma table
    connection.query('INSERT INTO farma (mail, password) VALUES (?, ?);', [mail, password2], function (error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists

      response.redirect('/');
      response.end();

    });
  } else {
    alert(' PASSWORD MISMATCH !');
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
    connection.query('SELECT mail, password FROM farma WHERE mail = ? AND password = ?', [mail, password], function (error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        request.session.loggedin = true;
        request.session.mail = mail;

        session.mail = mail

        // Save data to sessionStorage
        storage.setItem('email', mail);

        // Remove saved data from sessionStorage
        // sessionStorage.removeItem('key');

        // Redirect to home page
        response.redirect('/home');
      } else {
        response.redirect(`/`);
      }
      response.end();
    });
  } else {
    response.send('Please enter email and/or Password!');
    response.end();
  }
});


// First page
app.get('/home', function (request, response) {
  // Render login template
  // response.sendFile(path.join(__dirname + '/index.html'));
  console.log(request.session.loggedin);
  console.log(request.session.mail);

  // Get saved data from sessionStorage
  let data = storage.getItem('email');
  console.log("+ session storage data +" + data);

  if (data) {

  // if (request.session.mail) {
    response.send(`
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <title>FARMA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css" />
  </head>

  <body>
    <div class="container-fluid p-5 text-white text-center">
      <nav class="nav nav-pills nav-justified">
        <a class="nav-link" aria-current="page" href="#">
          <h3> Welcome ${data} </h3>
        </a>
        <a class="nav-link" href="#"></a>
        <a class="nav-link" href="#"></a>
        <a class="nav-link" href="/logout"> 
          <button type="button" class="btn btn-primary"> logout </button>
        </a>
      </nav>
    </div>

    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-3 animal">
          <div class="circle" id="sheep" style="display: inline-block;"> </div>
        </div>
        <div class="col-sm-3 animal">
          <div class="circle" id="cow" style="display: inline-block;"> </div>
        </div>
        <div class="col-sm-3 animal">
          <div class="circle" id="goat" style="display: inline-block;"> </div>
        </div>
        <div class="col-sm-3 animal">
          <div class="circle" id="duck" style="display: inline-block;"> </div>
        </div>
        <div class="col-sm-3 animal">
          <div class="circle" id="hen" style="display: inline-block;"> </div>
        </div>
        <div class="col-sm-3 animal">
          <div class="circle" id="goat" style="display: inline-block;"> </div>
        </div>
    
        <div class="col-sm-3 animal">
          <div class="circle" id="new">
            <a class="nav-link" href="/add-animal"> 
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                <path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </body>
</html> 
`)}

  else {
    response.redirect('/');
  }

});


// New Animal Modal
app.get('/add-animal', function (request, response) {
  // Get saved data from sessionStorage
  let data = storage.getItem('email');
  if(data) {
    response.send(`
      <!DOCTYPE html>
        <html lang="en">

        <head>
          <meta charset="UTF-8">
          <title>FARMA</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
          <!-- CSS only -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
          <link rel="stylesheet" href="/style.css">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css" />
        </head>

        <body>
          <div class="container-fluid p-5 text-white text-center">
            <nav class="nav nav-pills nav-justified">
              <a class="nav-link" href="/logout"> 
                <button type="button" class="btn btn-primary"> logout </button>
              </a>
            </nav>
          </div>

          <div class="container mt-5">              
            <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">Address</label>
              <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
            </div>
            <div class="form-group">
              <label for="inputAddress2">Address 2</label>
              <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity">
              </div>
              <div class="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" class="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip">
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck">
                <label class="form-check-label" for="gridCheck">
                  Check me out
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Sign in</button>
          </form>
          </div>
        </body>
      </html>
  `);
  }
});


app.listen(3000);