'use strict';

var authentication = require('../controllers/authentication');
var database = require('../database')
var joi = require('joi');
var User = require('../models/user').user;

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index');
        }
    });

    server.route({
        method: 'GET',
        path: '/login',
        handler: function (request, reply) {
            reply.view('login');
        }
    });

    server.route({
        method: 'GET',
        path: '/register',
        handler: function (request, reply) {
            reply.view('register');
        }
    });

    server.route({
        method: 'POST',
        path: '/login',
        handler: function (request, reply) {
            reply('Hi your e-mail is "' + request.payload.email + '", that\'s all!');
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
        method: 'POST',
        path: '/register',
        handler: function (request, reply) {
            var newUser = new User({
                email: request.payload.email
            });

            User.register(newUser, request.payload.password, function(err, user) {
                // Return error if present
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

};

exports.register.attributes = {
    name: 'router',
    version: '1.0.0'
};