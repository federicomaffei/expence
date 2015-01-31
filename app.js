'use strict';

var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });
server.views({
    engines: {
        jade: {
            module: require('jade'),
        }
    },
    path: __dirname + '/views'
});


server.register({
    register: require('./plugins/router'
    )}, function (err) {
    if (err) {
        console.error('Failed to load plugin:', err);
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});