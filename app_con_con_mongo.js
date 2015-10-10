var express     = require('express');
var app         = express();
var mongodb     = require('mongodb');
var bodyParser  = require('body-parser');
var Server      = mongodb.Server;
var Db          = mongodb.Db;    

var mongoServer = new Server('havoc.es', 27017, {auto_reconnect: true});
db = new Db('charlas', mongoServer);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'charlas' database");
        db.collection('charlas', {strict:true}, function(err, collection) {
            if (err) console.error(err);
        });
    }
});

app.use(bodyParser.json());

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Servidor escuchando en http://%s:%s', host, port);
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
                    res.send(501);
                } else {
                    res.send(item || 404);
                }
            });
        } else {
            res.send(501);
        }
    });
    
});

// LIST charlas
app.get('/api/charlas', function(err, res) {
    db.collection('charlas', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
});

// CREATE charla
app.post('/api/charlas', function (req, res) {
    
    var charla = req.body;

    db.collection('charlas', function(err, collection) {
        if (err) {
            console.error(err);
            res.send(501);
        } else {
            collection.insert(charla, {safe:true}, function(err, result) {
                if (err) {
                    console.error(err);
                    res.send(501);
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                    res.send(result[0]);
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
                console.error(err);
                res.send(501);
            } else {
                console.log(result + ' charla eliminada');
                res.send(req.body);
            }
        });
    });
    
});
