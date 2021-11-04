var express = require('express');
var app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.set('view engine', 'pug');
app.use(require('./routers'));
app.use('/static', express.static('static'));

app.listen(3000, function () {
  console.log("Server is running on localhost:3000");
});

const dotenv = require('dotenv');
dotenv.config();

const { Client } = require('pg');
const { RowDescriptionMessage } = require('pg-protocol/dist/messages');
const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
client.connect()

client.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connection successful');
});

const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
    companyName varchar,
    contact varchar,
    email varchar,
    identityProvider varchar,
    deviceNumber int
);`

client.query(createUserTable, (err, res) => {
  if (err) {
      console.error(err);
      return;
  }
  console.log('User table available');
});

const createAdminTable = `
CREATE TABLE IF NOT EXISTS admin (
    username varchar,
    password varchar
);`

const passwordEncrypt  = process.env.LOGINPASS;
const username = process.env.LOGINUSER;

bcrypt.hash(passwordEncrypt,saltRounds, (err,hash)=>{
  const adminData = "INSERT INTO admin (username, password) VALUES ('"+username+"','"+hash+"')"
  const adminTable = "SELECT * FROM admin"
  client.query(adminTable, (err,res) =>{
    if (res.rows.length == 0){
        client.query(adminData, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
      });
    }
  });
})

client.query(createAdminTable, (err, res) => {
  if (err) {
      console.error(err);
      return;
  }
  console.log('Admin table available');
});

app.use(express.urlencoded({
  extended: true
}))

app.post('/register', (req, res) => {
  const name = req.body.companyName;
  const contact = req.body.contact;
  const email = req.body.email;
  const identityProv = req.body.identityProvider;
  const devNumber = req.body.deviceNumber;
  
  client.query(
    "INSERT INTO users (companyName, contact, email, identityProvider,deviceNumber) VALUES ('"+name+"','"+contact+"','"+email+"','"+identityProv+"','"+devNumber+"')",
  (err, res) => {
      if (err) {
          console.error(err);
          return;
      }
      console.log('Data insert successful');
  });
  res.redirect('/submitted');
  res.end()
})

app.post('/login', (req, res) => {
  const username = req.body.userName;
  const userpass = req.body.password;
  const adminData = `SELECT * FROM admin`
  let loggedIn;
  
  client.query(adminData, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }

  let dbUsername;
  let dbPass;

  for (let row of res.rows) {
    dbUsername = row.username;
    dbPass = row.password;
  }

  if (dbUsername == username){
      bcrypt.compare (userpass, dbPass, (err,res) => {
        if(res){
          console.log("Logged in");
          loggedIn = res;
          const userData = `SELECT * FROM users`
          client.query(userData, (err, res) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log ('Data pull successful');
        });
        }
        else{
          console.log("Bad password");
          loggedIn = res;
        }
    });
  }
  else if (dbUsername!= username){
    console.log("Bad username");
    loggedIn=false;
  }
});

res.redirect('/users');
res.end()
})

