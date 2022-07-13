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


// ui-tests
app.get('/test', function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/test.html'));
});


// ui-tests
app.get('/dashboard', function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/dashboard.html'));
});


// tests
app.get('/tess', function (request, response) {

    function getSymptoms(params) {
        console.log("alall😒😒😒😒");
    }

    // Render login template
    response.send(`
        <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <meta name="description" content="">
                    <meta name="author" content="">

                    <title> dashboard </title>

                    <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
                    <!-- CSS only -->
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
                        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
                    <link rel="stylesheet" href="/style.css">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css" />
                    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
                    <link href="vendor/fontawesome/css/fontawesome.css" rel="stylesheet">
                    <link href="vendor/fontawesome/css/brands.css" rel="stylesheet">
                    <link href="vendor/fontawesome/css/solid.css" rel="stylesheet">
                    <link
                        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                        rel="stylesheet">

                    <!-- Custom styles for this template -->
                    <link href="css/sb-admin-2.css" rel="stylesheet">

                    <link href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css" rel="stylesheet">

                </head>

                <body id="page-top">

        <!-- Page Wrapper -->
        <div id="wrapper">

            <!-- Sidebar -->
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <!-- Sidebar - Brand -->
                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div class="sidebar-brand-icon rotate-n-15">
                        <i class="fas fa-laugh-wink"></i>
                    </div>
                    <div class="sidebar-brand-text mx-3"> farma <sup> beta </sup></div>
                </a>

                <!-- Divider -->
                <hr class="sidebar-divider my-0">

                <!-- Nav Item - Dashboard -->
                <!-- <li class="nav-item">
                <a class="nav-link" href="">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li> -->

                <!-- Nav Item - home -->
                <li class="nav-item">
                    <a class="nav-link" id="home-btn">
                        <i class="fa-solid fa-gauge"></i>
                        <span> Home </span>
                    </a>
                </li>
                <!-- Divider -->
                <hr class="sidebar-divider">

                <!-- Heading -->
                <div class="sidebar-heading">
                    Bio-data
                </div>

                <!-- Nav Item - Register -->
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="fas fa-fw fa-cog"></i>
                        <span> Registration </span>
                    </a>
                </li>

                <!-- Nav Item - Register -->
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="fa-solid fa-syringe"></i>
                        <span> Vaccination </span>
                    </a>
                </li>

                <!-- Nav Item - Diseases -->
                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fas fa-disease"></i>
                        <span> Diseases </span>
                    </a>
                    <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <a class="collapse-item" href="#"> Female </a>
                            <a class="collapse-item" href="#"> Male </a>
                            <a class="collapse-item" href="#"> New Borns </a>
                        </div>
                    </div>
                </li>

                <!-- Nav Item - Symptoms -->
                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#symptoms"
                        aria-expanded="true" aria-controls="symptoms">
                        <i class="fas fa-flag"></i>
                        <span> Symptoms </span>
                    </a>
                    <div id="symptoms" class="collapse" aria-labelledby="thesymptoms" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <a class="collapse-item" href="#"> Female </a>
                            <a class="collapse-item" href="#"> Male </a>
                            <a class="collapse-item" href="#"> New Borns </a>
                        </div>
                    </div>
                </li>

                <!-- Nav Item - New Borns -->
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="fa-solid fa-cow"></i>
                        <span> New Borns </span>
                    </a>
                </li>

                <!-- Nav Item - Charts -->
                <li class="nav-item">
                    <a class="nav-link" href="charts.html">
                        <i class="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span>
                    </a>
                </li>

                <!-- Divider -->
                <hr class="sidebar-divider">

                <!-- Heading -->
                <div class="sidebar-heading">
                    Farmer Profile
                </div>

                <!-- Nav Item - Pages Collapse Menu -->
                <li class="nav-item">
                    <a class="nav-link" href="tables.html">
                        <i class="fa-solid fa-address-card"></i>
                        <span> Profile </span>
                    </a>
                </li>

                <!-- Divider -->
                <hr class="sidebar-divider d-none d-md-block">

            </ul>
            <!-- End of Sidebar -->

            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">

                <!-- Main Content -->
                <div id="content">

                    <!-- Topbar -->
                    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                        <!-- Sidebar Toggle (Topbar) -->
                        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                            <i class="fa fa-bars"></i>
                        </button>

                        <!-- Nav Item - User Information -->
                        <div class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100">
                            <img class="img-profile rounded-circle" src="img/undraw_profile.svg">
                            <span class="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                        </div>

                        <!-- Topbar Search -->
                        <form
                            class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div class="input-group">
                                <input type="text" class="form-control bg-light border-0 small"
                                    placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">
                                        <i class="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <!-- <div class="topbar-divider d-none d-sm-block"></div> -->

                        <!-- Topbar Navbar -->
                        <ul class="navbar-nav ml-auto">

                            <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                            <li class="nav-item dropdown no-arrow d-sm-none">
                                <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-search fa-fw"></i>
                                </a>
                                <!-- Dropdown - Messages -->
                                <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                    aria-labelledby="searchDropdown">
                                    <form class="form-inline mr-auto w-100 navbar-search">
                                        <div class="input-group">
                                            <input type="text" class="form-control bg-light border-0 small"
                                                placeholder="Search for..." aria-label="Search"
                                                aria-describedby="basic-addon2">
                                            <div class="input-group-append">
                                                <button class="btn btn-primary" type="button">
                                                    <i class="fas fa-search fa-sm"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </li>

                            <!-- Nav Item - Alerts -->
                            <li class="nav-item dropdown no-arrow mx-1">
                                <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-bell fa-fw"></i>
                                    <!-- Counter - Alerts -->
                                    <span class="badge badge-danger badge-counter">3+</span>
                                </a>
                                <!-- Dropdown - Alerts -->
                                <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="alertsDropdown">
                                    <h6 class="dropdown-header">
                                        Alerts Center
                                    </h6>
                                    <a class="dropdown-item d-flex align-items-center" href="#">
                                        <div class="mr-3">
                                            <div class="icon-circle bg-primary">
                                                <i class="fas fa-file-alt text-white"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="small text-gray-500">December 12, 2019</div>
                                            <span class="font-weight-bold">A new monthly report is ready to
                                                download!</span>
                                        </div>
                                    </a>

                                    <a class="dropdown-item text-center small text-gray-500" href="#">Show All
                                        Alerts</a>
                                </div>
                            </li>

                            <!-- Nav Item - Logout -->
                            <li class="nav-item">
                                <a class="nav-link" href="#" id="logout" role="button">
                                    <i class="fa-solid fa-power-off"></i>
                                </a>
                            </li>

                        </ul>

                    </nav>
                    <!-- End of Topbar -->

                    <!-- Begin Page Content -->
                    <div class="container-fluid">

                        <div class="row">

                            <!-- Total Number of Animals Card -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Total Number of Animals </div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800"> 40 </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fa-solid fa-baby-carriage fa-2x"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Sick Animals -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-success shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    Sick Animals </div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800"> 15 </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fa-solid fa-bugs fa-2x"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Expecting Animals -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-info shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                    Expecting animals
                                                </div>
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col-auto">
                                                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Vaccinated -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-warning shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                    Vaccinated Animals </div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-comments fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">

                            <!-- Earnings (Monthly) Card Example -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    New Born Animals </div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800"> 20 </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Earnings (Annual) Card Example -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-success shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    Newly Registrated Animals </div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Tasks Card Example -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-info shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                    Pending Vaccination Animals
                                                </div>
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col-auto">
                                                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="progress progress-sm mr-2">
                                                            <div class="progress-bar bg-info" role="progressbar"
                                                                style="width: 70%" aria-valuenow="70" aria-valuemin="0"
                                                                aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Pending Requests Card Example -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-warning shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                    Total Products </div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-comments fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-lg-6">

                                <!-- Communication -->
                                <div class="card shadow mb-4">
                                    <div class="card-header py-3">
                                        <h6 class="m-0 font-weight-bold text-primary">Basic Card Example</h6>
                                    </div>
                                    <div class="card-body">
                                        The styling for this basic card example is created by using default Bootstrap
                                        utility classes. By using utility classes, the style of the card component can
                                        be
                                        easily modified with no need for any custom CSS!
                                    </div>
                                </div>

                            </div>

                            <div class="col-lg-6">

                                <!-- Dropdown Card Example -->
                                <div class="card shadow mb-4">
                                    <!-- Card Header - Dropdown -->
                                    <div
                                        class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-primary">Dropdown Card Example</h6>
                                        <div class="dropdown no-arrow">
                                            <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                                aria-labelledby="dropdownMenuLink">
                                                <div class="dropdown-header">Dropdown Header:</div>
                                                <a class="dropdown-item" href="#">Action</a>
                                                <a class="dropdown-item" href="#">Another action</a>
                                                <div class="dropdown-divider"></div>
                                                <a class="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Card Body -->
                                    <div class="card-body">
                                        Dropdown menus can be placed in the card header in order to extend the
                                        functionality
                                        of a basic card. In this dropdown card example, the Font Awesome vertical
                                        ellipsis
                                        icon in the card header can be clicked on in order to toggle a dropdown menu.
                                    </div>
                                </div>

                                <!-- Collapsable Card Example -->
                                <div class="card shadow mb-4">
                                    <!-- Card Header - Accordion -->
                                    <a href="#collapseCardExample" class="d-block card-header py-3"
                                        data-toggle="collapse" role="button" aria-expanded="true"
                                        aria-controls="collapseCardExample">
                                        <h6 class="m-0 font-weight-bold text-primary">Collapsable Card Example</h6>
                                    </a>
                                    <!-- Card Content - Collapse -->
                                    <div class="collapse show" id="collapseCardExample">
                                        <div class="card-body">
                                            This is a collapsable card example using Bootstrap's built in collapse
                                            functionality. <strong>Click on the card header</strong> to see the card
                                            body
                                            collapse and expand!
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                    <!-- /.container-fluid -->

                </div>
                <!-- End of Main Content -->

                <!-- Footer -->
                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span id="year"></span>
                        </div>
                    </div>
                </footer>
                <!-- End of Footer -->

            </div>
            <!-- End of Content Wrapper -->

        </div>
        <!-- End of Page Wrapper -->

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <!-- Logout Modal-->
        <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a class="btn btn-primary" href="login.html">Logout</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- UPDATES THE YEAR AUTOMATICALLY -->
        <script>

            const today = new Date();
            const yy = today.getFullYear();

            const current_year = document.getElementById('year');

            current_year.innerText = "Copyright © farma " + yy;

            document.getElementById('home-btn').onclick = function changeContent() {

                alert(" TEST 😁😁😁😁😁😁😁");

                ${getSymptoms()}
             
            }

        </script>

        <!-- Bootstrap core JavaScript-->
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

        <!-- Core plugin JavaScript-->
        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

        <!-- Custom scripts for all pages-->
        <script src="js/sb-admin-2.min.js"></script>

        <!-- Page level plugins -->
        <script src="vendor/datatables/jquery.dataTables.min.js"></script>
        <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

        <!-- Page level custom scripts -->
        <script src="js/demo/datatables-demo.js"></script>

    </body>

</html> `
    );
});


// tables
app.get('/table', function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/tables.html'));
});


// charts
app.get('/chart', function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/charts.html'));
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
        response.send(
            `
            <!DOCTYPE html>
                <html lang="en">

                    <head>
                        <meta charset="utf-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                        <meta name="description" content="">
                        <meta name="author" content="">

                        <title> farma - select an animal </title>

                        <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
                        <!-- CSS only -->
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
                            integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
                        <link rel="stylesheet" href="/style.css">
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css" />
                        <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
                        <link href="vendor/fontawesome/css/fontawesome.css" rel="stylesheet">
                        <link href="vendor/fontawesome/css/brands.css" rel="stylesheet">
                        <link href="vendor/fontawesome/css/solid.css" rel="stylesheet">
                        <link
                            href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                            rel="stylesheet">

                        <!-- Custom styles for this template -->
                        <link href="css/sb-admin-2.css" rel="stylesheet">

                        <link href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css" rel="stylesheet">

                    </head>

                    <body>
                        <div id="wrapper">
                            <!-- Content Wrapper -->
                            <div id="content-wrapper" class="d-flex flex-column">

                                <!-- Main Content -->
                                <div id="content">

                                    <div class="container py-5 d-flex justify-content-around">
                                        <nav class="nav nav-pills">

                                            <a class="nav-link" aria-current="page" href="#">
                                                <h3> Select an animal </h3>
                                            </a>

                                        </nav>
                                    </div>

                                    <div class="container d-flex justify-content-center">
                                        <div class="row text-center">

                                            <!-- COWS -->
                                            <div class="col-auto" id="cows">
                                                <div class="bg-white rounded shadow-sm py-5 px-4"><img
                                                        src="https://ucarecdn.com/08c56406-391c-495c-b9ee-d0502930e5ba/-/preview/-/quality/smart/"
                                                        alt="" width="100"
                                                        class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                                                    <h5 class="mb-0"> CATTLE </h5>
                                                    
                                                </div>
                                            </div>
                                            <!-- End -->

                                            <!-- GOATS -->
                                            <div class="col-auto" id="goats">
                                                <div class="bg-white rounded shadow-sm py-5 px-4"><img
                                                        src="https://ucarecdn.com/65125d7b-1ac5-4849-9cf4-ff4ed5870a08/-/preview/-/quality/smart/"
                                                        alt="" width="100"
                                                        class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                                                    <h5 class="mb-0"> GOATS </h5>
                                                    
                                                </div>
                                            </div>
                                            <!-- End -->

                                            <!-- SHEEP -->
                                            <div class="col-auto" id="sheep">
                                                <div class="bg-white rounded shadow-sm py-5 px-4"><img
                                                        src="https://ucarecdn.com/0a0d896d-9d43-42f8-b0fd-cb75ecd28afd/-/preview/-/quality/smart/"
                                                        alt="" width="100"
                                                        class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                                                    <h5 class="mb-0"> SHEEP </h5>
                                                </div>
                                            </div>
                                            <!-- End -->

                                            <!-- PIGS -->
                                            <div class="col-auto">
                                                <div class="bg-white rounded shadow-sm py-5 px-4"><img
                                                        src="https://ucarecdn.com/d7e3016b-3317-4d83-8260-18124b77605f/-/preview/-/quality/smart/"
                                                        alt="" width="100"
                                                        class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                                                    <h5 class="mb-0"> PIGS </h5>
                                                    
                                                </div>
                                            </div>
                                            <!-- End -->

                                            <!-- RABBITS -->
                                            <div class="col-auto" id="rabbits">
                                                <div class="bg-white rounded shadow-sm py-5 px-4">
                                                    <img src="https://ucarecdn.com/cfbb1536-2965-4f70-9070-81526cf90377/-/preview/-/quality/smart/"
                                                        alt="" width="100"
                                                        class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                                                    <h5 class="mb-0"> RABBITS </h5>
                                                </div>
                                            </div>
                                            <!-- End -->

                                            <!-- ADD NEW ANIMAL -->
                                            <div class="col-auto" id="add-new">
                                                <a data-toggle="modal" data-target="#newAnimalModal" href="#">
                                                    <div class="bg-white rounded shadow-sm py-5 px-4">
                                                        <i class="fa-solid fa-circle-plus fa-4x  py-4"></i>
                                                        <h5 class="mb-0"> ADD NEW </h5>
                                                        <span class="small text-uppercase text-muted">  </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <!-- End -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Logout Modal-->
                        <div class="modal fade" id="newAnimalModal" tabindex="-1" role="dialog" aria-labelledby="newAnimalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                <form id="contact-form" role="form" method="POST" action="/add_animal">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel"> Add a new animal </h5>
                                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                    <div class="container">
                                    
                                      <div class="controls">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label for="form_name"> Animal Name * </label>
                                                    <input id="form_name" type="text" name="animal_name" class="form-control"
                                                        placeholder="Please enter the animal name *" required="required"
                                                        data-error=" animal name is required.">
                                                </div>
                                            </div>
                                        </div>
                    
                                        <div class="row">
                                            <div class="col-md-12">
                                            <div class="form-group">
                                            <label for="form_lastname"> Number of animals * </label>
                                            <input id="form_lastname" type="number" name="number" class="form-control"
                                              placeholder="Please enter the number of the animals  *" required="required"
                                              data-error="number of animals is required.">
                                          </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label for="form_need"> Registration Date </label>
                                                    <input id="reg_date" type="date"  name="regdate" class="form-control" placeholder="TODAY - ">
                                                </div>
                                            </div>
                                        </div>
                    
                                        <div class="row">
                                          <div class="col-md-12">
                                            <div class="form-group">
                                              <label for="form_message">Animal Description *</label>
                                              <textarea id="form_message" name="description" class="form-control"
                                                placeholder="Write animal Description." rows="4" required="required"
                                                data-error="Please, leave us a message."></textarea>
                                            </div>
                                          </div>
                                        </div>
                    
                                        <div class="row">
                                          
                                        </div>
                    
                                      </div>
                    
                                  </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-primary btn-md btn-block"> ADD </button>
                                    </div>
                                    </form>
                                </div>
                            </div>

                        </div>

                        <script>



                        </script>

                        <!-- Bootstrap core JavaScript-->
                        <script src="vendor/jquery/jquery.min.js"></script>
                        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

                        <!-- Core plugin JavaScript-->
                        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

                        <!-- Custom scripts for all pages-->
                        <script src="js/sb-admin-2.min.js"></script>

                        <!-- Page level plugins -->
                        <script src="vendor/chart.js/Chart.min.js"></script>

                        <!-- Page level custom scripts -->
                        <script src="js/demo/chart-area-demo.js"></script>
                        <script src="js/demo/chart-pie-demo.js"></script>

                        <!-- Page level plugins -->
                        <script src="vendor/datatables/jquery.dataTables.min.js"></script>
                        <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

                        <!-- Page level custom scripts -->
                        <script src="vendor/chart.js/datatables-demo.js"></script>

                    </body>

                </html> `

        )
    } else {
        console.log(data);
        response.redirect('/');
    }
});


// New Animal Modal
app.get('/add-animal', function (request, response) {
    // Get saved data from sessionStorage
    let data = storage.getItem('email');
    if (data) { response.sendFile(path.join(__dirname + '/add_animal.html')); }
});


// New Animal Modal
app.get('/animal/:id', function (request, response) {

    console.log(request.params.id);

    const fruits = ["cows", "goats", "sheep", "pigs"];

    console.log();
    const isSelected = fruits.includes(request.params.id);

    if (isSelected == true) {

        console.log(" ************** it's in *****************");

        // Render login template
        response.send(`
        <!DOCTYPE html>
            <html lang="en">

                <head>

                    <meta charset="utf-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <meta name="description" content="">
                    <meta name="author" content="">

                    <title> dashboard </title>

                    <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
                    <!-- CSS only -->
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
                        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
                    <link rel="stylesheet" href="/style.css">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css" />
                    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
                    <link href="vendor/fontawesome/css/fontawesome.css" rel="stylesheet">
                    <link href="vendor/fontawesome/css/brands.css" rel="stylesheet">
                    <link href="vendor/fontawesome/css/solid.css" rel="stylesheet">
                    <link
                        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                        rel="stylesheet">

                    <!-- Custom styles for this template -->
                    <link href="css/sb-admin-2.css" rel="stylesheet">

                    <link href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css" rel="stylesheet">

                </head>

                <body id="page-top">

                    <!-- Page Wrapper -->
                    <div id="wrapper">

                        <!-- Sidebar -->
                        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                            <!-- Sidebar - Brand -->
                            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                                <div class="sidebar-brand-icon rotate-n-15">
                                    <i class="fas fa-laugh-wink"></i>
                                </div>
                                <div class="sidebar-brand-text mx-3"> farma <sup> beta </sup></div>
                            </a>

                            <!-- Divider -->
                            <hr class="sidebar-divider my-0">

                            <!-- Nav Item - Dashboard -->
                            <!-- <li class="nav-item">
                            <a class="nav-link" href="">
                                <i class="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span></a>
                        </li> -->

                            <!-- Nav Item - home -->
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="fa-solid fa-gauge"></i>
                                    <span> Home </span>
                                </a>
                            </li>
                            <!-- Divider -->
                            <hr class="sidebar-divider">

                            <!-- Heading -->
                            <div class="sidebar-heading">
                                Bio-data
                            </div>

                            <!-- Nav Item - Register -->
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="fas fa-fw fa-cog"></i>
                                    <span> Registration </span>
                                </a>
                            </li>

                            <!-- Nav Item - Register -->
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="fa-solid fa-syringe"></i>
                                    <span> Vaccination </span>
                                </a>
                            </li>

                            <!-- Nav Item - Diseases -->
                            <li class="nav-item">
                                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                                    aria-expanded="true" aria-controls="collapseUtilities">
                                    <i class="fas fa-disease"></i>
                                    <span> Diseases </span>
                                </a>
                                <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                                    data-parent="#accordionSidebar">
                                    <div class="bg-white py-2 collapse-inner rounded">
                                        <a class="collapse-item" href="#"> Female </a>
                                        <a class="collapse-item" href="#"> Male </a>
                                        <a class="collapse-item" href="#"> New Borns </a>

                                    </div>
                                </div>
                            </li>

                            <!-- Nav Item - Symptoms -->
                            <li class="nav-item">
                                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#symptoms"
                                    aria-expanded="true" aria-controls="symptoms">
                                    <i class="fas fa-flag"></i>
                                    <span> Symptoms </span>
                                </a>
                                <div id="symptoms" class="collapse" aria-labelledby="thesymptoms" data-parent="#accordionSidebar">
                                    <div class="bg-white py-2 collapse-inner rounded">
                                        <a class="collapse-item" href="#"> Female </a>
                                        <a class="collapse-item" href="#"> Male </a>
                                        <a class="collapse-item" href="#"> New Borns </a>
                                    </div>
                                </div>
                            </li>

                            <!-- Nav Item - New Borns -->
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="fa-solid fa-cow"></i>
                                    <span> New Borns </span>
                                </a>
                            </li>

                            <!-- Nav Item - Charts -->
                            <li class="nav-item">
                                <a class="nav-link" href="charts.html">
                                    <i class="fas fa-fw fa-chart-area"></i>
                                    <span>Charts</span>
                                </a>
                            </li>

                            <!-- Divider -->
                            <hr class="sidebar-divider">

                            <!-- Heading -->
                            <div class="sidebar-heading">
                                Farmer Profile
                            </div>

                            <!-- Nav Item - Pages Collapse Menu -->
                            <li class="nav-item">
                                <a class="nav-link" href="tables.html">
                                    <i class="fa-solid fa-address-card"></i>
                                    <span> Profile </span>
                                </a>
                            </li>

                            <!-- Divider -->
                            <hr class="sidebar-divider d-none d-md-block">

                        </ul>
                        <!-- End of Sidebar -->

                        <!-- Content Wrapper -->
                        <div id="content-wrapper" class="d-flex flex-column">

                            <!-- Main Content -->
                            <div id="content">

                                <!-- Topbar -->
                                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                                    <!-- Sidebar Toggle (Topbar) -->
                                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                                        <i class="fa fa-bars"></i>
                                    </button>

                                    <!-- Nav Item - User Information -->
                                    <div class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100">
                                        <img class="img-profile rounded-circle" src="img/undraw_profile.svg">
                                        <span class="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                    </div>

                                    <!-- Topbar Search -->
                                    <form
                                        class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                        <div class="input-group">
                                            <input type="text" class="form-control bg-light border-0 small"
                                                placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                                            <div class="input-group-append">
                                                <button class="btn btn-primary" type="button">
                                                    <i class="fas fa-search fa-sm"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    <!-- <div class="topbar-divider d-none d-sm-block"></div> -->

                                    <!-- Topbar Navbar -->
                                    <ul class="navbar-nav ml-auto">

                                        <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                                        <li class="nav-item dropdown no-arrow d-sm-none">
                                            <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fas fa-search fa-fw"></i>
                                            </a>
                                            <!-- Dropdown - Messages -->
                                            <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                                aria-labelledby="searchDropdown">
                                                <form class="form-inline mr-auto w-100 navbar-search">
                                                    <div class="input-group">
                                                        <input type="text" class="form-control bg-light border-0 small"
                                                            placeholder="Search for..." aria-label="Search"
                                                            aria-describedby="basic-addon2">
                                                        <div class="input-group-append">
                                                            <button class="btn btn-primary" type="button">
                                                                <i class="fas fa-search fa-sm"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </li>

                                        <!-- Nav Item - Alerts -->
                                        <li class="nav-item dropdown no-arrow mx-1">
                                            <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fas fa-bell fa-fw"></i>
                                                <!-- Counter - Alerts -->
                                                <span class="badge badge-danger badge-counter">3+</span>
                                            </a>
                                            <!-- Dropdown - Alerts -->
                                            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                                aria-labelledby="alertsDropdown">
                                                <h6 class="dropdown-header">
                                                    Alerts Center
                                                </h6>
                                                <a class="dropdown-item d-flex align-items-center" href="#">
                                                    <div class="mr-3">
                                                        <div class="icon-circle bg-primary">
                                                            <i class="fas fa-file-alt text-white"></i>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="small text-gray-500">December 12, 2019</div>
                                                        <span class="font-weight-bold">A new monthly report is ready to
                                                            download!</span>
                                                    </div>
                                                </a>

                                                <a class="dropdown-item text-center small text-gray-500" href="#">Show All
                                                    Alerts</a>
                                            </div>
                                        </li>

                                        <!-- Nav Item - Logout -->
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" id="logout" role="button">
                                                <i class="fa-solid fa-power-off"></i>
                                            </a>
                                        </li>

                                    </ul>

                                </nav>
                                <!-- End of Topbar -->

                                <!-- Begin Page Content -->
                                <div class="container-fluid">

                                    <div class="row">

                                        <!-- Total Number of Animals Card -->
                                        <div class="col-xl-3 col-md-6 mb-4">
                                            <div class="card border-left-primary shadow h-100 py-2">
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                                Total Number of Animals </div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800"> 40 </div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <i class="fa-solid fa-baby-carriage fa-2x"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Sick Animals -->
                                        <div class="col-xl-3 col-md-6 mb-4">
                                            <div class="card border-left-success shadow h-100 py-2">
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                                Sick Animals </div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800"> 15 </div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <i class="fa-solid fa-bugs fa-2x"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Expecting Animals -->
                                        <div class="col-xl-3 col-md-6 mb-4">
                                            <div class="card border-left-info shadow h-100 py-2">
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                                Expecting animals
                                                            </div>
                                                            <div class="row no-gutters align-items-center">
                                                                <div class="col-auto">
                                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Vaccinated -->
                                        <div class="col-xl-3 col-md-6 mb-4">
                                            <div class="card border-left-warning shadow h-100 py-2">
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                                Vaccinated Animals </div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">

                                        <!-- Earnings (Monthly) Card Example -->
                                        <div class="col-xl-3 col-md-6 mb-4">
                                            <div class="card border-left-primary shadow h-100 py-2">
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                                New Born Animals </div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800"> 20 </div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Earnings (Annual) Card Example -->
                                        <div class="col-xl-3 col-md-6 mb-4">
                                            <div class="card border-left-success shadow h-100 py-2">
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                                Newly Registrated Animals </div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Tasks Card Example -->
                                        <div class="col-xl-3 col-md-6 mb-4">
                                            <div class="card border-left-info shadow h-100 py-2">
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                                Pending Vaccination Animals
                                                            </div>
                                                            <div class="row no-gutters align-items-center">
                                                                <div class="col-auto">
                                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="progress progress-sm mr-2">
                                                                        <div class="progress-bar bg-info" role="progressbar"
                                                                            style="width: 70%" aria-valuenow="70" aria-valuemin="0"
                                                                            aria-valuemax="100"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Pending Requests Card Example -->
                                        <div class="col-xl-3 col-md-6 mb-4">
                                            <div class="card border-left-warning shadow h-100 py-2">
                                                <div class="card-body">
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col mr-2">
                                                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                                Total Products </div>
                                                            <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">

                                        <div class="col-lg-6">

                                            <!-- Communication -->
                                            <div class="card shadow mb-4">
                                                <div class="card-header py-3">
                                                    <h6 class="m-0 font-weight-bold text-primary">Basic Card Example</h6>
                                                </div>
                                                <div class="card-body">
                                                    The styling for this basic card example is created by using default Bootstrap
                                                    utility classes. By using utility classes, the style of the card component can
                                                    be
                                                    easily modified with no need for any custom CSS!
                                                </div>
                                            </div>

                                        </div>

                                        <div class="col-lg-6">

                                            <!-- Dropdown Card Example -->
                                            <div class="card shadow mb-4">
                                                <!-- Card Header - Dropdown -->
                                                <div
                                                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                    <h6 class="m-0 font-weight-bold text-primary">Dropdown Card Example</h6>
                                                    <div class="dropdown no-arrow">
                                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                                            aria-labelledby="dropdownMenuLink">
                                                            <div class="dropdown-header">Dropdown Header:</div>
                                                            <a class="dropdown-item" href="#">Action</a>
                                                            <a class="dropdown-item" href="#">Another action</a>
                                                            <div class="dropdown-divider"></div>
                                                            <a class="dropdown-item" href="#">Something else here</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Card Body -->
                                                <div class="card-body">
                                                    Dropdown menus can be placed in the card header in order to extend the
                                                    functionality
                                                    of a basic card. In this dropdown card example, the Font Awesome vertical
                                                    ellipsis
                                                    icon in the card header can be clicked on in order to toggle a dropdown menu.
                                                </div>
                                            </div>

                                            <!-- Collapsable Card Example -->
                                            <div class="card shadow mb-4">
                                                <!-- Card Header - Accordion -->
                                                <a href="#collapseCardExample" class="d-block card-header py-3"
                                                    data-toggle="collapse" role="button" aria-expanded="true"
                                                    aria-controls="collapseCardExample">
                                                    <h6 class="m-0 font-weight-bold text-primary">Collapsable Card Example</h6>
                                                </a>
                                                <!-- Card Content - Collapse -->
                                                <div class="collapse show" id="collapseCardExample">
                                                    <div class="card-body">
                                                        This is a collapsable card example using Bootstrap's built in collapse
                                                        functionality. <strong>Click on the card header</strong> to see the card
                                                        body
                                                        collapse and expand!
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                                <!-- /.container-fluid -->

                            </div>
                            <!-- End of Main Content -->

                            <!-- Footer -->
                            <footer class="sticky-footer bg-white">
                                <div class="container my-auto">
                                    <div class="copyright text-center my-auto">
                                        <span>Copyright &copy; Your Website 2020</span>
                                    </div>
                                </div>
                            </footer>
                            <!-- End of Footer -->

                        </div>
                        <!-- End of Content Wrapper -->

                    </div>
                    <!-- End of Page Wrapper -->

                    <!-- Scroll to Top Button-->
                    <a class="scroll-to-top rounded" href="#page-top">
                        <i class="fas fa-angle-up"></i>
                    </a>

                    <!-- Logout Modal-->
                    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                                <div class="modal-footer">
                                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                    <a class="btn btn-primary" href="login.html">Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bootstrap core JavaScript-->
                    <script src="vendor/jquery/jquery.min.js"></script>
                    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

                    <!-- Core plugin JavaScript-->
                    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

                    <!-- Custom scripts for all pages-->
                    <script src="js/sb-admin-2.min.js"></script>

                    <!-- Page level plugins -->
                    <script src="vendor/datatables/jquery.dataTables.min.js"></script>
                    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

                    <!-- Page level custom scripts -->
                    <script src="js/demo/datatables-demo.js"></script>

                </body>

            </html>
    
        ` );
    } else {
        console.log("la farge");
    }

});


app.post('/add_animal', function (request, response) {
    // Capture the input fields
    const animal_name = request.body.animal_name;
    const number = request.body.number;
    const gender = request.body.gender;
    const dob = request.body.dob;
    const description = request.body.description;

    console.log(animal_name + ' ' + number + ' ' + gender + ' ' + dob + ' ' + description);

    connection.query('INSERT INTO animals (animal_type, count) VALUES (?, ?);', [animal_name, number], function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        response.redirect('/home');
        response.end();

    });
})


app.post('/update_bio', function (request, response) {

    console.log(request.body);

    // Capture the input fields
    let animal_name = request.body.animal_name;
    let number = request.body.number;
    let gender = request.body.gender;
    let dob = request.body.dob;
    let description = request.body.description;

    console.log(animal_name + ' ' + number + ' ' + gender + ' ' + dob + ' ' + description);

});


app.listen(3000);
