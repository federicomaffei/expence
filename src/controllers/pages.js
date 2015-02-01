'use strict';

exports.init = function(server) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index');
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