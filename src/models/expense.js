'use strict';

var mongoose = require('../../database').mongoose;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var expenseSchema = new mongoose.Schema({
    amount: {
        type: Currency,
        required: true
    },
    creator: {
        type: String,
        //ref: 'User',
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