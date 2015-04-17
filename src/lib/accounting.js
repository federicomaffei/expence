'use strict';

module.exports = {
    calculateTotal: function(expenses, callback) {
        var total = 0;
        expenses.map(function(item){
            total = item.amount + total;
        });
        callback(total);
    }
};