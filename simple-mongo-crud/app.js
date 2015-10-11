var express      = require('express');
var app          = express();
var mongodb      = require('mongodb');
var bodyParser   = require('body-parser');
var Server       = mongodb.Server;
var Db           = mongodb.Db;    

const PORT       = 3000;
// Cambiar a localhost u otra instancia de mongo
// havoc.es fue el servidor utilizado para el taller
const MONGO_HOST = 'havoc.es';
const MONGO_PORT = 27017;

// Definicion del acceso a mongo mediante el driver de mongodb
var mongoServer = new Server(MONGO_HOST, MONGO_PORT, {auto_reconnect: true});
db = new Db('charlas', mongoServer);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'charlas' database");
        db.collection('charlas', {strict:true}, function(err, collection) {
            if (err) console.error(err);
        });
    }
});

// Configuramos bodyParser para tener acceso a los datos
// que llegan en las requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Levantamos el servidor
app.listen(PORT, function () {
    console.log('Servidor escuchando en http://localhost:%s', PORT);
});


// API
// ----------------------------------------------

// READ charla
app.get('/api/charlas/:day', function (req, res) {

    var day = req.params.day;

    db.collection('charlas', function(err, collection) {
        if (!err) {
            collection.findOne({'day':day}, function(err, item) {
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    res.send(item || 404);
                }
            });
        } else {
            res.send(err);
        }
    });
    
});

// LIST charlas
app.get('/api/charlas', function(err, res) {
    db.collection('charlas', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.json(items);
        });
    });
});

// CREATE charla
app.post('/api/charlas', function (req, res) {
    
    var charla = req.body;

    db.collection('charlas', function(err, collection) {
        if (err) {
            res.send(err);
        } else {
            collection.insert(charla, {safe:true}, function(err, result) {
                if (err) {
                    res.send(err);
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                    res.json(result[0]);
                }
            });
        }
    });
});

// DELETE
app.delete('/api/charlas/:day', function (req, res) {

    var day = req.params.day;

    db.collection('charlas', function(err, collection) {
        collection.remove({'day':day}, {safe:true}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log(result + ' charla eliminada');
                res.json(req.body);
            }
        });
    });
    
});