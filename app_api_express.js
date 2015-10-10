var express = require('express');
var app 	= express();

app.get('/api/hola', function (req, res) {
  	res.send('Hello World!');
});

app.get('/api/charlas', function (req, res) {
	var charlas = [ 
		{'day':'1','meetup':'Charla introducción a Node.js'},
		{'day':'2','meetup':'Introducción a Raspberry Pi'},
		{'day':'3','meetup':'Taller de Arduino'},
		{'day':'4','meetup':'Construcción y programación de robots'},
		{'day':'5','meetup':'Charla introducción a Node.js'},
		{'day':'6','meetup':'Programación para niños y no tan niños'}
	]

  	res.send(charlas);
});

var server = app.listen(3000, function () {
  	var host = server.address().address;
  	var port = server.address().port;

  	console.log('Servidor escuchando en http://%s:%s', host, port);
});

