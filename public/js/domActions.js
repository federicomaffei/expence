$(document).ready(function(){
    var deleteLink = $('.delete-link');
    var totalId = $('#expense-total');
    var newTotal = parseInt(totalId.data('total'));
    deleteLink.click(function(){
        var deleteId = this.dataset.id;
        var deleteLinkId = $('#delete-link-' + deleteId);
        $.ajax({
            url: '/expenses/' + deleteId,
            type: 'DELETE',
            success: function() {
                newTotal = newTotal - parseInt(deleteLinkId.data('amount'));
                totalId.text((newTotal/100).toFixed(2) + ' GBP');
                totalId.attr('data-total', newTotal);
                $('#expense-' + deleteId).remove();
            }
        });
    });

    var editLink = $('.edit-link');
    editLink.click(function(){
        var editId = this.dataset.id;
        var editLinkId = $('#edit-form-' + editId);
        if(editLinkId.css('display') === 'none') {
            editLinkId.show('fast');
        } else {
            editLinkId.hide('fast');
        }
    });

    var editButton = $('.edit-button');
    editButton.click(function(){
        var editId = this.dataset.id;
        var data = {
            amount: $('#amount-input-' + editId).val(),
            creator: this.dataset.user,
            currency: $('#currency-input-' + editId).val(),
            category: $('#category-input-' + editId).val()
        };
        $.ajax({
            type: "PATCH",
            contentType: "application/json; charset=utf-8",
            url: '/expenses/' + editId,
            data: JSON.stringify(data),
            dataType: "json",
            success: function() {
                $('#expense-amount-'+ editId).text(parseInt(data.amount).toFixed(2));
                $('#expense-currency-'+ editId).text(data.currency);
                $('#expense-category-'+ editId).text(data.category);
                $('#edit-form-' + editId).hide('fast');
            },
            error: function(){
                console.log('Error');
            }
        });
    });

});