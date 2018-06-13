var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));
app.use(ejsLayouts);

// GET /doors - returns all doors
app.get('/doors', function(req, res) {
  var doors = fs.readFileSync('./data.json');
  doors = JSON.parse(doors);
  res.json(doors);
});

app.listen(3000);
