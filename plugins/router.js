'use strict'

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index');
        }
    });
};

exports.register.attributes = {
    name: 'router',
    version: '1.0.0'
};