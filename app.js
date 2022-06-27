const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const pg = require('pg')
const ClientClass = pg.Client
const URL = 'postgres://gtyykksu:0gaaYr2HfRUx2ieDVgDhB06SkI8OFvMj@rosie.db.elephantsql.com/gtyykksu'

const client = new ClientClass(URL)

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

// server css as static
app.use(express.static(__dirname));

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/derek/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/derek/signup.html");
});


// USER SIGNUP
app.post("/register", (req, res) => {

  var mail = req.body.mail;
  var password = req.body.password;
  var password2 = req.body.password2;

  async function connect(client) {
    try {
      await client.connect()
      console.log(" ******** CONNECTED **********");

      // const text = 'SELECT * FROM farma;';
      const text = 'INSERT INTO farma(mail, password) VALUES($1, $2) RETURNING *'
      const values = [mail, password2]

      const {rows} = await client.query(text, values, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows)
        }
      })
      
      // const {rows} = await client.query(text)
      // console.table(rows)
      await client.end()

    } catch (error) {
      console.log("** ERROR  ** " + error);
    }
    finally {
      await client.end()
    }
  }

  if (password === password2) {
    connect(client)    
  }else {
    alert(" ** PASSWORD MISMATCH ** ")
  }

  res.sendFile(path.join(__dirname, 'derek/index.html'));

});


// USER LOGIN
app.post("/login", (req, res) => {

  var mail = req.body.mail;
  var password = req.body.password;

  async function connect(client) {
    try {
      await client.connect()
      
      console.log(" ******** CONNECTED ********** ");

      const text = 'SELECT mail, password FROM farma WHERE mail="$1" AND password="$2";';
      const values = [mail, password]

      const {rows} = await client.query(text, values, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows)
        }})
      
        // const {rows} = await client.query(text)
      console.table(rows)
      await client.end()

    } catch (error) {
      console.log(" * * ERROR * * " + error);
    }
    finally {
      await client.end()
    }
  }

  if (password === password2) {
    connect(client)    
  }else {
    alert(" ** PASSWORD MISMATCH ** ")
  }

  res.sendFile(path.join(__dirname, 'derek/index.html'));

});
