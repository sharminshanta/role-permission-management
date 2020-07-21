$(function(){
	$('#example1').DataTable({'pageLength':10,});
});

$(document).on('keypress', '.only_number', function(e){
    var yourInput = $(this).val();
    var keyCode = e.which ? e.which : e.keyCode
    if (!(keyCode >= 48 && keyCode <= 57) ) {
        return false;
    }
});


$(document).on('click', '.insert', function(e){
  	"use strict";
  	var supplier_code       = $("#supplier_code").val();
  	var suppliers_name      = $("#suppliers_name").val();
  	var suppliers_mobile    = $("#suppliers_mobile").val();
  	var suppliers_email     = $("#suppliers_email").val();
  	var suppliers_tax       = $("#suppliers_tax_no").val();
  	var suppliers_address   = $("#suppliers_address").val();

  	$('#error_suppliers_name').html('');
  	$('.error-name').removeClass('has-error');
  	$('#error_suppliers_mobile').html('');
  	$('.error-mobile').removeClass('has-error'); 
  	$('#error_suppliers_email').html('');
  	$('.error-email').removeClass('has-error');
  	$.ajax({
    	dataType: 'json',
    	type: 'POST',
    	url: THEMEBASEURL+'suppliers/add',
    	data: {
      		'supplier_code'  : supplier_code,
      		'suppliers_name'  : suppliers_name,
      		'suppliers_mobile'   : suppliers_mobile, 
      		'suppliers_email'  : suppliers_email, 
      		'suppliers_tax'  : suppliers_tax, 
      		'suppliers_address'  : suppliers_address, 
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
        		setTimeout(function(){ window.location.href = THEMEBASEURL+'suppliers'; }, 1800);
      		}else{
        		$('#error_suppliers_name').html(response.validations['suppliers_name']);
        		if (response.validations['suppliers_name']){
          			$('.error-name').addClass('has-error');
        		};
        		$('#error_suppliers_mobile').html(response.validations['suppliers_mobile']);
    			if (response.validations['suppliers_mobile']){
          			$('.error-mobile').addClass('has-error');
        		};
        		$('#error_suppliers_email').html(response.validations['suppliers_email']);
        		if (response.validations['suppliers_email']){
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
     	 	url: THEMEBASEURL+'suppliers/retrive',
      		data: {
        		'id'  : id,
        		[CSRFNAME]    : CSRFHASH,
      		},
      		dataType: "html",
      		success: function(data) {
        		var response = jQuery.parseJSON(data);
        		console.log(response);
        		if(response.confirmation == 'Success') {
          			$('#suppliersID').val(response.id);
          			$('#suppliers_name_up').val(response.suppliers_name);
          			$('#suppliers_mobile_up').val(response.suppliers_mobile);
          			$('#suppliers_email_up').val(response.suppliers_email);
          			$("#suppliers_tax_no_up").val(response.suppliers_tax_no);
          			$("#suppliers_address_up").val(response.suppliers_address);

          			$('.updated').click(function(){
			            var id                  = $('#suppliersID').val();
			            var suppliers_name      = $("#suppliers_name_up").val();
			            var suppliers_mobile    = $("#suppliers_mobile_up").val();
			            var suppliers_email     = $("#suppliers_email_up").val();
			            var suppliers_tax       = $("#suppliers_tax_no_up").val();
			            var suppliers_address   = $("#suppliers_address_up").val();

			            $('#error_suppliers_name_up').html('');
			            $('.error-name-up').removeClass('has-error');
			            $('#error_suppliers_mobile_up').html('');
			            $('.error-mobile-up').removeClass('has-error');
			            $('#error_suppliers_email_up').html('');
			            $('.error-email-up').removeClass('has-error');

            			$.ajax({
              				dataType: 'json',
              				type: 'POST',
              				url: THEMEBASEURL+'suppliers/edit',
              				data: {
				                'id'  : id,
				                'suppliers_name'  : suppliers_name,
				                'suppliers_mobile'   : suppliers_mobile, 
				                'suppliers_email'  : suppliers_email, 
				                'suppliers_tax'  : suppliers_tax, 
				                'suppliers_address'  : suppliers_address,
				                [CSRFNAME]    : CSRFHASH,
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
                  					setTimeout(function(){ window.location.href = THEMEBASEURL+'suppliers'; }, 1800);
                				}else{
	                  				$('#error_suppliers_name_up').html(response.validations['suppliers_name']);
	                  				if (response.validations['suppliers_name']){
	                    				$('.error-name-up').addClass('has-error');
	              					};
	              					$('#error_suppliers_mobile_up').html(response.validations['suppliers_mobile']);
	              					if (response.validations['suppliers_mobile']){
	                    				$('.error-mobile-up').addClass('has-error');
	                  				};
	                  				$('#error_suppliers_email_up').html(response.validations['suppliers_email']);
	          						if (response.validations['suppliers_email']){
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
        			url: THEMEBASEURL+'suppliers/delete',
        			type: 'POST',
        			data: {
          				'id'       : id,
          				[CSRFNAME]    : CSRFHASH,
    				},
        			dataType: 'json'
      			})
       			.done(function(response){
        			swal('Deleted!', response.message, response.status);
        			setTimeout(function(){ window.location.href = THEMEBASEURL+'suppliers'; }, 2000);
      			})
       			.fail(function(){
        			swal('Oops...', 'Something went wrong with You !', 'error');
      			});
     		});
    	},
    	allowOutsideClick: false        
  	}); 
});

// status script
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
      		url: THEMEBASEURL+'suppliers/status',
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