$(function () {
  $('#example1').DataTable({
    'pageLength':25,
  });
})
$(document).ready(function(){
  $('.select2').select2();
});

$(document).on('keypress', '.only_number', function(e){
    var yourInput = $(this).val();
    var keyCode = e.which ? e.which : e.keyCode
    if (!(keyCode >= 48 && keyCode <= 57)) {
        return false;
    }
});

// $("#payments_for").change(function(){
$(document).on('change', '#payments_for', function(e){
	"use strict";
  	var value = $(this).val();
  	$('#payments_due').val('');
  	$('#payments_amount').val('');
  	$('#payment_by_id').val('');
  	if (value != '0'){
	    $.ajax({
	     	type: 'POST',
	     	dataType: "json",
	     	url: THEMEBASEURL+'payments/retrieve',
	     	data: {
	      		'value'  : value,
	      		[CSRFNAME]  : CSRFHASH,
	    	},
		    success: function(data){
		    	console.log(data);
			    $('#payments_code').html('');
			    $("<option  value='0'/>").text('Select Invoice No.').appendTo($('#payments_code'));
			    for(var i=0;i<data.length;i++){
			        $("<option value='"+data[i].invoiceno+"' data-id='"+value+"'/>").text(data[i].invoiceno).appendTo($('#payments_code'));
			    }
			    $('#payments_due').val('');
			    $('#payments_amount').val('');
			    $('#payment_by_id').val('');
		    }
		});
  	}
});

$(document).on('change', '#payments_code', function(e){
  	"use strict";
  	var code = $(this).val();
  	var value = $(this).find(':selected').attr('data-id');
	if (value != '0'){
	    $.ajax({
	     	type: 'POST',
	     	dataType: "json",
	     	url: THEMEBASEURL+'payments/retrieve',
	    	data: {
	      		[CSRFNAME]  : CSRFHASH,
	      		'value'  : value, 
	      		'code'  : code
	    	},
		    success: function(data){
		    	console.log(data);
		      $('#payments_due').val(data.grand_total - data.payment);
		      $('#payments_amount').val(data.grand_total - data.payment);
		      $('#payment_by_id').val(data.id);
		    }
	  	});
  	}
});


$(document).ready(function(){
  function price_calculation(){
  	"use strict";
    var payment_amount = parseFloat($("#payments_amount_up").val()) || 0;
    var before_due_amount = parseFloat($("#before_due_amount").val()) || 0;

    if (before_due_amount < payment_amount){
      $("#payments_due_up").val('0');
    }else{
      $("#payments_due_up").val(before_due_amount - payment_amount);
    }

  }
  $("#payments_amount_up").keyup(function(event) {
    price_calculation();
  });
});


$(document).on('click', '.insert', function(e){
  "use strict";
  var payments_date    = $("#payments_date").val();
  var payments_for     = $("#payments_for").val(); // sales or purchases
  var payment_by       = $("#payment_by_id").val(); // customer or supplier
  var payments_code    = $("#payments_code").val();
  var payments_due     = $("#payments_due").val();
  var payments_type    = $("#payments_type").val();
  var payments_amount  = $("#payments_amount").val();
  var payments_note    = $("#payments_note").val();

  $('#error_payments_for').html('');
  $('#error_payments_code').html('');
  $('#error_payments_amount').html('');
  $('#error_payments_type').html('');

  $.ajax({
    dataType: 'json',
    type: 'POST',
    url: THEMEBASEURL+'payments/add',
    data: {
      'payments_date'   : payments_date,
      'payments_for'    : payments_for, 
      'payment_by'      : payment_by, 
      'payments_code'   : payments_code, 
      'payments_due'    : payments_due, 
      'payments_type'   : payments_type, 
      'payments_amount' : payments_amount, 
      'payments_note'   : payments_note, 
      [CSRFNAME]  		: CSRFHASH,
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
        setTimeout(function(){ window.location.href = THEMEBASEURL+'payments'; }, 1800);
      }else{
        $('#error_payments_for').html(response.validations['payments_for']);
        $('#error_payments_code').html(response.validations['payments_code']);
        $('#error_payments_type').html(response.validations['payments_type']);
        $('#error_payments_amount').html(response.validations['payments_amount']);
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
	      	url: THEMEBASEURL+'payments/retrieve',
	      	data: {
	        	[CSRFNAME]  : CSRFHASH,
	        	'id'  : id,
	      	},
	      	dataType: "html",
	      	success: function(data) {
		        var response = jQuery.parseJSON(data);
		        console.log(response);
		        if(response.confirmation == 'Success'){
		          	$('#payments_date_up').val(response.payment_date);
		          	$('#payments_due_up').val(response.due_amount);
		          	$('#payments_amount_up').val(response.payment_amount);
		          	$('#before_due_amount').val(parseFloat(response.payment_amount) + parseFloat(response.due_amount));
		          	$('#payments_type_up').val(response.payment_type);
		          	$('#payments_note_up').val(response.payment_note);


		          	$('.updated').click(function(){
			            var id                = response.id;
			            var payment_code      = response.payment_code;
			            var before_payment    = response.before_payment;
			            var before_due        = parseFloat(response.payment_amount) + parseFloat(response.due_amount);
			            var payments_for      = response.payment_for;
			            var payments_date     = $("#payments_date_up").val();
			            var payments_amount   = $("#payments_amount_up").val();
			            var payments_type     = $("#payments_type_up").val();
			            var payments_due      = $("#payments_due_up").val();
			            var payments_note     = $("#payments_note_up").val();

			            $('#payments_amount_up').html('');
			            $('.error-class').removeClass('has-error');
			            $('#error_payments_type_up').html('');
			            $('.error-type').removeClass('has-error');
			            $.ajax({
			              	dataType: 'json',
			              	type: 'POST',
			              	url: THEMEBASEURL+'payments/edit',
			              	data: {
				                'id'  : id,
				                'payment_code'    : payment_code,
				                'before_payment'  : before_payment,
				                'before_due'      : before_due, 
				                'payments_for'    : payments_for, 
				                'payments_date'   : payments_date, 
				                'payments_amount' : payments_amount, 
				                'payments_type'   : payments_type, 
				                'payments_due'    : payments_due, 
				                'payments_note'   : payments_note, 
				                [CSRFNAME]  	  : CSRFHASH,
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
				                  setTimeout(function(){ window.location.href = THEMEBASEURL+'payments'; }, 1800);
				                }else{
				                  	$('#error_payments_amount_up').html(response.validations['payments_amount']);
				                  	if (response.validations['payments_amount']){
				                    	$('.error-class').addClass('has-error');
				                  	};
				                  	$('#error_payments_type_up').html(response.validations['payments_type']);
				                  	if (response.validations['payments_type']){
				                    	$('.error-type').addClass('has-error');
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
        url: THEMEBASEURL+'payments/delete',
        type: 'POST',
        data: {
          'id'       : id,
          [CSRFNAME]    : CSRFHASH,
        },
        dataType: 'json'
      })
       .done(function(response){
        swal('Deleted!', response.message, response.status);
        setTimeout(function(){ window.location.href = THEMEBASEURL+'payments'; }, 2000);
      })
       .fail(function(){
        swal('Oops...', 'Something went wrong with You !', 'error');
      });
     });
    },
    allowOutsideClick: false        
  }); 
});