$(function(){
	$('#example1').DataTable({'pageLength':10,});
});

$(document).on('keypress', '.only_number', function(e){
    var yourInput = $(this).val();
    var keyCode = e.which ? e.which : e.keyCode
    if (!(keyCode >= 48 && keyCode <= 57)) {
        return false;
    }
});


$(document).on('click', '.insert', function(e){
  	"use strict";
  	var taxs_name      		= $("#taxs_name").val();
  	var taxs_percentage    	= $("#taxs_percentage").val();

  	$('#error_taxs_name').html('');
  	$('.error-name').removeClass('has-error');
  	$('#error_taxs_percentage').html('');
  	$('.error-percentage').removeClass('has-error');
  	$.ajax({
    	dataType: 'json',
    	type: 'POST',
    	url: THEMEBASEURL+'taxs/add',
    	data: {
      		'taxs_name'  : taxs_name,
      		'taxs_percentage'   : taxs_percentage, 
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
        		setTimeout(function(){ window.location.href = THEMEBASEURL+'taxs'; }, 1800);
      		}else{
        		$('#error_taxs_name').html(response.validations['taxs_name']);
        		if (response.validations['taxs_name']) {
          			$('.error-name').addClass('has-error');
        		};
        		$('#error_taxs_percentage').html(response.validations['taxs_percentage']);
        		if (response.validations['taxs_percentage']){
          			$('.error-percentage').addClass('has-error');
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
      		url: THEMEBASEURL+'taxs/retrive',
      		data: {
        		'id'  : id,
        		[CSRFNAME]  : CSRFHASH,
      		},
      		dataType: "html",
      		success: function(data) {
        		var response = jQuery.parseJSON(data);
        		console.log(response);
        		if(response.confirmation == 'Success') {
          			$('#taxsID').val(response.id);
          			$('#taxs_name_up').val(response.taxs_name);
          			$('#taxs_percentage_up').val(response.taxs_percentage);


          			$('.updated').click(function(){
			            var id                  = $('#taxsID').val();
			            var taxs_name      		= $("#taxs_name_up").val();
			            var taxs_percentage    	= $("#taxs_percentage_up").val();

			            $('#error_taxs_name_up').html('');
			            $('.error-name-up').removeClass('has-error');
			            $('#error_taxs_percentage_up').html('');
			            $('.error-percentage-up').removeClass('has-error');
            			
            			$.ajax({
              				dataType: 'json',
              				type: 'POST',
              				url: THEMEBASEURL+'taxs/edit',
              				data: {
                				'id'  : id,
                				'taxs_name'  : taxs_name,
                				'taxs_percentage'   : taxs_percentage, 
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
                  					setTimeout(function(){ window.location.href = THEMEBASEURL+'taxs'; }, 1800);
                				} else {
	                  				$('#error_taxs_name_up').html(response.validations['taxs_name']);
	                  				if (response.validations['taxs_name']){
	                    				$('.error-name-up').addClass('has-error');
	                  				};
	                  				$('#error_taxs_percentage_up').html(response.validations['taxs_percentage']);
	                  				if (response.validations['taxs_percentage']){
	                    				$('.error-percentage-up').addClass('has-error');
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
        			url: THEMEBASEURL+'taxs/delete',
        			type: 'POST',
        			data: {
          				'id'       : id,
          				[CSRFNAME]    : CSRFHASH,
    				},
        			dataType: 'json'
      			})
       			.done(function(response){
        			swal('Deleted!', response.message, response.status);
        			setTimeout(function(){ window.location.href = THEMEBASEURL+'taxs'; }, 2000);
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
      		url: THEMEBASEURL+'taxs/status',
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