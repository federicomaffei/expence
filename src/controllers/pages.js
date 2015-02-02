'use strict';

var Expense = require('../models/expense').Expense;

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
        path: '/add-expense',
        handler: function (request, reply) {
            reply.view('add-expense', {isLogged: request.auth.isAuthenticated, username: request.username});
        },
        config: {
            auth: 'session'
        }
    });

    server.route({
        method: 'POST',
        path: '/add-expense',
        handler: function (request, reply) {
            console.log('posted expense by:' + request.username);
            var expense = new Expense({
                amount: request.payload.amount,
                creator: request.username,
                currency: request.payload.currency,
                reason: request.payload.reason
            });
            expense.save();
            reply.redirect('/add-expense');
        },
        config: {
            auth: 'session'
        }
    });
};