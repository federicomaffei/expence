'use strict';

exports.register = function (server, options, next) {
    server.ext('onPreResponse', function(req, reply) {
        console.log(req.auth.isAuthenticated);
        if(req.response.variety === 'view') {
            req.response.source.manager._context.isLogged = req.auth.isAuthenticated;
            req.response.source.manager._context.user = req.user;
        }
        reply.continue();
    });

    next();
};

exports.register.attributes = {
    name: 'viewEngine',
    version: '1.0.0'
};