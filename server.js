var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.get('/submitted', function(req, res) {
  res.sendFile(__dirname + '/formSubmitted.html')
});

app.use('/static', express.static('static'));

app.listen(3000, function () {
  console.log("Server is running on localhost3000");
});


  const { Client } = require('pg')

  const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'testdb',
      password: 'pass',
      port: 5432,
  });
  
  client.connect()
  
  client.query('SELECT NOW()', (err, res) => {
      if (err) {
          console.error(err);
          return;
      }
      console.log('Connection successful');
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
