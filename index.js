var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(ejsLayouts);

// GET /doors - returns all doors
app.get('/doors', function(req, res) {
  var doors = fs.readFileSync('./data.json');
  doors = JSON.parse(doors);
  res.json(doors);
});

// POST /doors - adds a new door
app.post('/doors', function(req, res) {
  var doors = fs.readFileSync('./data.json');
  doors = JSON.parse(doors);
  doors.push( {name: req.body.name, color: req.body.color} );
  fs.writeFileSync('./data.json', JSON.stringify(doors));
  res.json(doors);
});

// TODO: GET /doors/:id - gets one door
app.get('/doors/:id', function(req, res) {
  var doors = fs.readFileSync('./data.json');
  doors = JSON.parse(doors);
  var doorIndex = req.params.id;
  res.json(doors[doorIndex]);
});

// TODO: PUT /door/:id - updates one door
app.put('/doors/:id', function(req, res) {
  var doors = fs.readFileSync('./data.json');
  doors = JSON.parse(doors);
  var doorIndex = req.params.id;
  doors[doorIndex].name = req.body.name;
  doors[doorIndex].color = req.body.color;
  fs.writeFileSync('./data.json', JSON.stringify(doors));
  res.json(doors[doorIndex]);
});

// TODO: DELETE /door/:id - deletes one door
app.delete('/doors/:id', function(req, res) {
  var doors = fs.readFileSync('./data.json');
  doors = JSON.parse(doors);
  var doorIndex = req.params.id;
  doors.splice(doorIndex, 1);
  fs.writeFileSync('./data.json', JSON.stringify(doors));
  res.json(doors);
});


app.listen(3000);
