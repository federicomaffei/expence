'use strict';

var accounting = require('../lib/accounting'),
    Expense    = require('../models/expense').Expense,
    moment     = require('moment');

exports.init = function(server) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            if(request.state.session) {
                reply.view('index', {user: request.state.session.user});
            }
            else {
                reply.view('index');
            }
        },
        config: {
            auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/expenses/new',
        handler: function (request, reply) {
            reply.view('expenses/new');
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
                amount: request.payload.amount * 100,
                creator: request.user._id,
                currency: request.payload.currency,
                category: request.payload.category
            });
            expense.save();
            reply.redirect('expenses');
        },
        config: {
            auth: 'session'
        }
    });

    server.route({
        method: 'DELETE',
        path: '/expenses/{id}',
        handler: function (request, reply) {
            Expense.findByIdAndRemove(request.params.id, function(err, expense){
                if(expense) {
                    reply(200);
                } else {
                    reply(err);
                }
            });
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
                accounting.calculateTotal(docs, function(total) {
                    reply.view('expenses/index', {
                        expenses: docs,
                        moment: moment,
                        total: total });
                });
            });
        },
        config: {
            auth: 'session'
        }
    });
};