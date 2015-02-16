'use strict';

var Expense = require('../models/expense').Expense;

exports.init = function(server) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index', {isLogged: request.auth.isAuthenticated, user: request.user});
        },
        config: {
            auth: 'session'
        }
    });

    server.route({
        method: 'GET',
        path: '/expenses/new',
        handler: function (request, reply) {
            reply.view('expenses/new', {isLogged: request.auth.isAuthenticated, user: request.user});
        },
        config: {
            auth: 'session'
        }
    });

    server.route({
        method: 'POST',
        path: '/expenses',
        handler: function (request, reply) {
            var expense = new Expense({
                amount: request.payload.amount,
                creator: request.user._id,
                currency: request.payload.currency,
                reason: request.payload.reason
            });
            expense.save();
            reply.redirect('expenses/new');
        },
        config: {
            auth: 'session'
        }
    });

    server.route({
        method: 'GET',
        path: '/expenses',
        handler: function (request, reply) {
            Expense.find({creator: request.user._id}, function(err, docs){
                reply.view('expenses/index', {isLogged: request.auth.isAuthenticated, user: request.user, expenses: docs});
            });
        },
        config: {
            auth: 'session'
        }
    });
};