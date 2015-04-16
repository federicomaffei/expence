'use strict';

module.exports = {
    calculateTotal: function(expenses, callback) {
        var total = 0;
        for(var index = 0; index < expenses.length; index++) {
            total = expenses[index].amount + total;
        }
        callback(total);
    }
};