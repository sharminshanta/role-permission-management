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
               url: THEMEBASEURL+'sales/payment',
               data: {
                  'date'            : payment_date,
                  'sales_code'      : code,
                  'payment_amount'  : payment_amount, 
                  'payment_type'    : payment_type, 
                  'payment_note'    : payment_note, 
                  'payableamount'   : payableamount, 
                  [CSRFNAME]        : CSRFHASH,
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
                     setTimeout(function(){window.location.reload(1);}, 1800);
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
// for print 
$(document).on('click', '.prints', function(e){
   var divElements = document.getElementById('print_areas').innerHTML;
   var oldPage = document.body.innerHTML;
   document.body.innerHTML = 
   "<html>"+
   "<head>"+
   "<title>Invoice</title><style type='text/css'>.img-height {height: 160px !important;}hr{margin-top:0px;margin-bottom: 0px;border-top-color: currentcolor;}#hide-table{padding: 14px;}</style>"+
   "</head>"+
   "<body>" + 
   divElements + "</body>";
   window.print();
   document.body.innerHTML = oldPage;
});