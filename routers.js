var express = require('express');
var router = express.Router();

router.get('/users', function(req, res) {
  res.render('users.pug', {})
});

router.get('/', function(req, res) {
    res.render('index.pug', {})
  });
  
router.get('/submitted', function(req, res) {
    res.render('formSubmitted.pug', {})
});

router.get('/login', function(req, res) {
    res.render('login.pug', {})
});

module.exports = router;