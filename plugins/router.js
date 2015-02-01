'use strict';

var authentication = require('../controllers/authentication');
var database = require('../database')
var joi = require('joi');
var User = require('../models/user').User;
var isUserAuthenticated = false;

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index', { isUserAuthenticated: isUserAuthenticated });
        }
    });

    server.route({
        method: 'GET',
        path: '/login',
        handler: function (request, reply) {
            reply.view('login', { isUserAuthenticated: isUserAuthenticated });
        }
    });

    server.route({
        method: 'GET',
        path: '/register',
        handler: function (request, reply) {
            reply.view('register', { isUserAuthenticated: isUserAuthenticated });
        }
    });

    server.route({
        method: 'POST',
        path: '/login',
        handler: function (request, reply) {
            User.authenticate()(request.payload.email, request.payload.password, function (err, user, message) {
                if (err) {
                    console.error(err);
                    return reply.redirect('/login');
                }

                if (user) {
                    request.auth.session.set(user);
                    isUserAuthenticated = true;
                    return reply.redirect('/');
                }
            });
        },
        config: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
            validate: {
                payload: {
                    email: joi.string().email().required(),
                    password: joi.string().required()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/register',
        handler: function (request, reply) {
            var newUser = new User({
                email: request.payload.email
            });

            User.register(newUser, request.payload.password, function(err, user) {
                if (err) {
                    reply(err);
                    return;
                }
                reply(user);
            });
        },
        config: {
            validate: {
                payload: {
                    email: joi.string().email().required(),
                    password: joi.string().required()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/logout',
        handler: function(request, reply) {
            request.auth.session.clear();
            isUserAuthenticated = false;
            return reply.redirect('/');
        },
        config: {
            auth: 'session'
        }
    })

};

exports.register.attributes = {
    name: 'router',
    version: '1.0.0'
};