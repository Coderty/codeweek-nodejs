var http = require('http');

const PORT=8080; 

var server = http.createServer(function(request, response){
	response.end('NODE RULES!');
});

server.listen(PORT, function(){
    console.log("Servidor escuchando en: http://localhost:%s", PORT);
});
