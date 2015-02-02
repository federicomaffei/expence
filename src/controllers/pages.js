'use strict';

exports.init = function(server) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index', {isLogged: request.auth.isAuthenticated, username: request.username});
        },
        config: {
            auth: 'session'
        }
    });

    server.route({
        method: 'GET',
        path: '/testpage',
        handler: function (request, reply) {
            reply.view('testpage');
        },
        config: {
            auth: 'session'
        }
    });
};