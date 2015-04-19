$(document).ready(function(){
    var deleteLink = $('.delete-link');
    var deleteId = deleteLink.data('id');
    deleteLink.click(function(){
        var newTotal = parseInt($('#expense-total').data('total')) - parseInt(this.dataset.amount);
        $.ajax({
            url: '/expenses/' + deleteId,
            type: 'DELETE',
            success: function() {
                $('#expense-' + deleteId).remove();
                $('#expense-total').text((newTotal/100).toFixed(2) + ' GBP');
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
        $.ajax({
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            url: '/expenses/' + editId,
            data: JSON.stringify({

            }),
            dataType: "json",
            success: function (msg) {
                console.log(msg);
            },
            error: function (err){
                console.log(err);
            }
        });
    });

});