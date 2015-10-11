// Referencia al modulo http
var http = require('http');

const PORT=8080; 

// Definimos el comportamiento:
// cualquier acceso al servidor devuelve un 200 con un mensaje
var server = http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end('NODE RULES!');
});

// Levantamos un servidor escuchando en PORT (8080)
server.listen(PORT, function(){
    console.log("Servidor escuchando en: http://localhost:%s", PORT);
});
