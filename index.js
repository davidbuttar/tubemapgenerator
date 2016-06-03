// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use('/libs', express.static(__dirname + '/libs/'));
var port = process.env.PORT || 3003;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/app'));