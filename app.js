'use strict';

var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });
server.views({
    engines: {
        jade: {
            module: require('jade')
        }
    },
    path: __dirname + '/src/views',
    layoutPath: __dirname + '/src/views/layout'
});

server.register([
    require('hapi-auth-cookie'),
    require('./src/plugins/authentication'),
    require('./src/plugins/router')
], function (err) {

    if(err) {
        console.log('plugins not loaded.');
    }

    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
});

