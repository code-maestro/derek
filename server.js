const pg = require('pg')
const ClientClass = pg.Client
const URL = 'postgres://gtyykksu:0gaaYr2HfRUx2ieDVgDhB06SkI8OFvMj@rosie.db.elephantsql.com/gtyykksu'
const client = new ClientClass(URL)

async function connect(client) {

  var mail = "mail";
  var password2 = "password2";

  try {
    await client.connect()
    console.log(" ******** CONNECTED **********");

    const { rows } = await client.query(`INSERT INTO farma(mail,password) VALUES($mail, $password2)`)
    console.table(rows)

    await client.end()

  } catch (error) {
    console.log("** ERROR  **" + error); 
  }
  finally {
    await client.end()
  }
}

connect(client)