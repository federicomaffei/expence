'use strict';

var mongoose = require('../../database').mongoose;

var expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'GBP'
    },
    reason: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

var Expense = mongoose.model('Expense', expenseSchema, 'Expenses');

exports.Expense = Expense;