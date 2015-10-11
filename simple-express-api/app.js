var express = require('express');
var app     = express();

const PORT = 3000;

// Ruta de la API que devuelve un mensaje plano
app.get('/api/hola', function (req, res) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end('Hello World!');
});

// Ruta de la API que devuelve un application/json
app.get('/api/charlas', function (req, res) {
    var charlas = [ 
        {'day':'1','meetup':'Charla introducción a Node.js'},
        {'day':'2','meetup':'Introducción a Raspberry Pi'},
        {'day':'3','meetup':'Taller de Arduino'},
        {'day':'4','meetup':'Construcción y programación de robots'},
        {'day':'5','meetup':'Charla introducción a Node.js'},
        {'day':'6','meetup':'Programación para niños y no tan niños'}
    ];

    res.json(charlas);
});

// Se levanta la aplicacion
app.listen(PORT, function () {
    console.log('Servidor escuchando en http://localhost:%s', PORT);
});

