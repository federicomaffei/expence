'use strict';

var config = require('./config'),
    Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });
server.views({
    engines: {
        jade: {
            module: require('jade')
        }
    },
    path: __dirname + '/views'
});

server.register(require('hapi-auth-cookie'), function (err) {

    if(err) {
        console.log('auth plugin not loaded.');
    }

    server.auth.strategy('session', 'cookie', {
        password: 'expencesecret',
        cookie: 'session',
        redirectTo: false,
        isSecure: false,
        ttl: 24* 60 * 60 * 1000
    });
});

server.register(require('./plugins/router'), function (err) {

    if(err) {
        console.log('router plugin not loaded.');
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
