'use strict';

var Hapi = require('hapi');

var server = new Hapi.Server({
    connections: {
        router: {
            isCaseSensitive: false,
            stripTrailingSlash: true
        },
        routes: {
            validate: {
                options: {
                    allowUnknown: true
                }
            }
        }
    }
});

server.connection({ port: 3000 });
server.views({
    engines: {
        jade: {
            module: require('jade')
        }
    },
    context: {},
    path: __dirname + '/src/views',
    layoutPath: __dirname + '/src/views/layout'
});

server.register([
    require('hapi-auth-cookie'),
    require('./src/plugins/authentication'),
    require('./src/plugins/router'),
    require('./src/plugins/viewEngine')
], function (err) {

    if(err) {
        console.log('plugins not loaded.');
    }

    server.start(function (err) {
        if(err) {
          console.log(err);
        };
        console.log('Server running at:', server.info.uri);
    });
});

