$(function () {
    $('#example1').DataTable({
        'pageLength':25,
    });
})

$(document).on('keypress', '.only_number', function(e){
    var yourInput = $(this).val();
    var keyCode = e.which ? e.which : e.keyCode
    if (!(keyCode >= 48 && keyCode <= 57)) {
        return false;
    }
});
// list payment
$(document).on('click', '.payment', function(e){
    "use strict";
    var code = $(this).attr('data-code');
    var totalamount = $(this).attr('data-totalamount');
    var paidamount = $(this).attr('data-paidamount');
    var payableamount = totalamount - paidamount;
    $('#payment_amount').val(payableamount);
    $('.insert').click(function(){
        var payment_date    = $('#payment_date').val();
        var payment_amount  = $('#payment_amount').val();
        var payment_type    = $('#payment_type').val();
        var payment_note    = $('#payment_note').val();

        $('#error_payment_amount').html('');
        $('.error-payment').removeClass('has-error');
        $('#error_payment_type').html('');
        $('.error-type').removeClass('has-error');

        if (totalamount => payment_amount){
            if(payment_type != '0'){
                $.ajax({
                    type: 'POST',
                    url: THEMEBASEURL+'purchases/payment',
                    data: {
                        'date'            : payment_date,
                        'purchase_code'   : code,
                        'payment_amount'  : payment_amount,
                        'payment_type'    : payment_type,
                        'payment_note'    : payment_note,
                        'payableamount'   : payableamount,
                        [CSRFNAME]  	  : CSRFHASH,
                    },
                    dataType: "html",
                    success: function(data){
                        var response = jQuery.parseJSON(data);
                        console.log(data);
                        if(response.confirmation == 'success'){
                            $('#payment').modal('hide');
                            swal({
                                title: "Successfull.",
                                position: 'top-end',
                                type: 'success',
                                showConfirmButton: false,
                                timer: 1600,
                            });
                            setTimeout(function(){ window.location.href = THEMEBASEURL+'purchases'; }, 1800);
                        } else{
                            $('#error_payment_amount').html(response.validations['payment_amount']);
                            $('.error-payment').addClass('has-error');
                            $('#error_payment_type').html(response.validations['payment_type']);
                            $('.error-type').addClass('has-error');
                        }
                    }
                });
            }else{
                $('#error_payment_type').html('Please Select Payment Type');
                $('.error-type').addClass('has-error');
            }
        }else{
            $('#error_payment_amount').html('Entered Amount Greater than Due Amount!');
            $('.error-payment').addClass('has-error');
        }
    });
});

// delete script
$(document).on('click', '.delete', function(e){
    "use strict";
    var id = $(this).attr("id");
    swal({
        title: 'Are you sure?',
        text: "It will be deleted permanently!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        showLoaderOnConfirm: true,

        preConfirm: function() {
            return new Promise(function(resolve) {
                $.ajax({
                    url: THEMEBASEURL+'purchases/purchasesdelete',
                    type: 'POST',
                    data: {
                        'id'       : id,
                        [CSRFNAME]    : CSRFHASH,
                    },
                    dataType: 'json'
                })
                    .done(function(response){
                        swal('Deleted!', response.message, response.status);
                        setTimeout(function(){ window.location.href = THEMEBASEURL+'categories'; }, 2000);
                    })
                    .fail(function(){
                        swal('Oops...', 'Something went wrong with You !', 'error');
                    });
            });
        },
        allowOutsideClick: false
    });
});