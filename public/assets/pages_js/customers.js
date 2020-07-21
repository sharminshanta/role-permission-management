$(function() {
  $('#example1').DataTable({
    'pageLength':10,
  });
})


$(document).on('keypress', '.only_number', function(e){
    var yourInput = $(this).val();
    var keyCode = e.which ? e.which : e.keyCode
    if (!(keyCode >= 48 && keyCode <= 57)) {
        return false;
    }
});



$(document).on('click', '.insert', function(e){
  "use strict";
  var customer_code       = $("#customer_code").val();
  var customers_name      = $("#customers_name").val();
  var customers_mobile    = $("#customers_mobile").val();
  var customers_email     = $("#customers_email").val();
  var customers_tax       = $("#customers_tax_no").val();
  var customers_address   = $("#customers_address").val();

  $('#error_customers_name').html('');
  $('.error-name').removeClass('has-error');
  $('#error_customers_mobile').html('');
  $('.error-mobile').removeClass('has-error');
  $('#error_customers_email').html('');
  $('.error-email').removeClass('has-error');
  $.ajax({
      dataType: 'json',
      type: 'POST',
      url: THEMEBASEURL+'customers/add',
      data: {
          'customer_code'  : customer_code,
          'customers_name'  : customers_name,
          'customers_mobile'   : customers_mobile, 
          'customers_email'  : customers_email, 
          'customers_tax'  : customers_tax, 
          'customers_address'  : customers_address,
          [CSRFNAME]  : CSRFHASH,
      },
      dataType: "html",
      success: function(data){
          var response = jQuery.parseJSON(data);
          console.log(data);
          if(response.confirmation == 'Success'){
              $('#insert').modal('hide');
              swal({
                  title: "Successfull.",
                  position: 'top-end',
                  type: 'success',
                  showConfirmButton: false,
                  timer: 1600,
              });
              setTimeout(function(){ window.location.href = THEMEBASEURL+'customers'; }, 1800);
          }else{
              $('#error_customers_name').html(response.validations['customers_name']);
              if (response.validations['customers_name']){
                  $('.error-name').addClass('has-error');
              };
              $('#error_customers_mobile').html(response.validations['customers_mobile']);
              if (response.validations['customers_mobile']){
                  $('.error-mobile').addClass('has-error');
              };
              $('#error_customers_email').html(response.validations['customers_email']);
              if (response.validations['customers_email']){
                  $('.error-email').addClass('has-error');
              };

          }
      }
  });
});



$(document).on('click', '.update', function(e){
  "use strict";
  var id = $(this).attr('id');
  if(id != 'NULL' || id != '') {
    dataType: "json",
    $.ajax({
    type: 'POST',
    url: THEMEBASEURL+'customers/retrive',
    data: {
        'id'  : id,
        [CSRFNAME]  : CSRFHASH,
    },
    dataType: "html",
    success: function(data) {
        var response = jQuery.parseJSON(data);
        console.log(response);
        if(response.confirmation == 'Success') {
          $('#customersID').val(response.id);
          $('#customers_name_up').val(response.customers_name);
          $('#customers_mobile_up').val(response.customers_mobile);
          $('#customers_email_up').val(response.customers_email);
          $("#customers_tax_no_up").val(response.customers_tax_no);
          $("#customers_address_up").val(response.customers_address);

          $('.updated').click(function(){
            var id                  = $('#customersID').val();
            var customers_name      = $("#customers_name_up").val();
            var customers_mobile    = $("#customers_mobile_up").val();
            var customers_email     = $("#customers_email_up").val();
            var customers_tax       = $("#customers_tax_no_up").val();
            var customers_address   = $("#customers_address_up").val();

            $('#error_customers_name_up').html('');
            $('.error-name-up').removeClass('has-error');
            $('#error_customers_mobile_up').html('');
            $('.error-mobile-up').removeClass('has-error');
            $('#error_customers_email_up').html('');
            $('.error-email-up').removeClass('has-error');
            $.ajax({
              dataType: 'json',
              type: 'POST',
              url: THEMEBASEURL+'customers/edit',
              data: {
                'id'  : id,
                'customers_name'  : customers_name,
                'customers_mobile'   : customers_mobile, 
                'customers_email'  : customers_email, 
                'customers_tax'  : customers_tax, 
                'customers_address'  : customers_address, 
                [CSRFNAME]  : CSRFHASH,
              },
              dataType: "html",
              success: function(data){
                var response = jQuery.parseJSON(data);
                console.log(data);
                if(response.confirmation == 'Success'){
                  $('#update').modal('hide');
                  swal({
                      title: "Successfully Updated.",
                      position: 'top-end',
                      type: 'success',
                      showConfirmButton: false,
                      timer: 1600,
                  });
                  setTimeout(function(){ window.location.href = THEMEBASEURL+'customers'; }, 1800);
                }else{
                  $('#error_customers_name_up').html(response.validations['customers_name']);
                  if (response.validations['customers_name']){
                      $('.error-name-up').addClass('has-error');
                  };
                  $('#error_customers_mobile_up').html(response.validations['customers_mobile']);
                  if (response.validations['customers_mobile']){
                      $('.error-mobile-up').addClass('has-error');
                  };
                  $('#error_customers_email_up').html(response.validations['customers_email']);
                  if (response.validations['customers_email']){
                      $('.error-email-up').addClass('has-error');
                  };
                }
              }
            });
          });
        }
      }
    });
  }
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

        preConfirm: function(){
          return new Promise(function(resolve){
            $.ajax({
                url: THEMEBASEURL+'customers/delete',
                type: 'POST',
                data: {
                  'id'  : id,
                  [CSRFNAME]  : CSRFHASH,
                },
                dataType: 'json'
            })
            .done(function(response){
              swal('Deleted!', response.message, response.status);
              setTimeout(function(){ window.location.href = THEMEBASEURL+'customers'; }, 2000);
            })
            .fail(function(){
                swal('Oops...', 'Something went wrong with You !', 'error');
            });
         });
      },
    allowOutsideClick: false        
    }); 
}); 



$(document).on('click', '.onoffswitch-small-checkbox', function(e){
  "use strict";
  var status = '';
  var id = 0;
  if($(this).prop('checked')){
    status = '1';
    id = $(this).parent().attr("id");
  } else {
    status = '0';
    id = $(this).parent().attr("id");
  }
  if((status != '' || status != null) && (id !='')) {
    $.ajax({
      type: 'POST',
      url: THEMEBASEURL+'customers/status',
      data: {
        'id'      : id,
        'status'    : status,
        [CSRFNAME]   : CSRFHASH,
      },

      dataType: "html",
      success: function(data){
        var response = jQuery.parseJSON(data);
        console.log(data);
        if(response.confirmation == 'Success'){
          swal({
            title: "Successfully Updated.",
            position: 'top-end',
            type: 'success',
            showConfirmButton: false,
            timer: 1600,
          });
        } 
      }
    });
  }
});