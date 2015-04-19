$(document).ready(function(){
    $('.delete-link').click(function(){
        var id = this.dataset.id;
        var newTotal = parseInt($('#expense-total').data('total')) - parseInt(this.dataset.amount);
        $.ajax({
            url: '/expenses/' + id,
            type: 'DELETE',
            success: function() {
                $('#expense-' + id).remove();
                $('#expense-total').text((newTotal/100).toFixed(2) + ' GBP');
            }
        });
    });
});