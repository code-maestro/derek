const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const pg = require('pg');

const DAS_URL = 'postgres://gtyykksu:0gaaYr2HfRUx2ieDVgDhB06SkI8OFvMj@rosie.db.elephantsql.com/gtyykksu'

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


app.post("/register", (req, res) => {

  var mail = req.body.mail;
  var password = req.body.password;
  var password2 = req.body.password2;

  console.log(mail + password + password2);

  var client = new pg.Client(DAS_URL);

  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err);
    }

    const query = `
    INSERT INTO farma(title,body) 
    VALUES($1,$2)
    RETURNING *;
    `;
    const values = [req.body.title, req.body.body];
    const { rows } = await client.query(query, values);
    console.log(rows);

    client.query('SELECT NOW() AS "theTime"', function (err, result) {
      if (err) { return console.error('error running query', err); }
      
      console.log(result.rows[0].theTime);
      // >> output: 2018-08-23T14:02:57.117Z
      client.end();
    });
  });

  res.sendFile(path.join(__dirname, 'derek/index.html'));

});
