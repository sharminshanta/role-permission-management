$(function (){
	$('#example1').DataTable({'pageLength':10,});
})

$(document).on('click', '.insert', function(e){
  	"use strict";
  	var units_name  = $("#units_name").val();
  	var units_note  = $("#units_note").val();

  	$('#error_units_name').html('');
  	$('.error-name').removeClass('has-error');
  	$('#error_units_note').html('');
  	$('.error-note').removeClass('has-error');
  	$.ajax({
    	dataType: 'json',
    	type: 'POST',
    	url: THEMEBASEURL+'units/add',
    	data: {
      		[CSRFNAME]  : CSRFHASH,
      		'units_name'  : units_name,
      		'units_note'   : units_note, 
    	},
    	dataType: "html",
		success: function(data){
      		var response = jQuery.parseJSON(data);
      		if(response.confirmation == 'Success'){
        		$('#insert').modal('hide');
        		swal({
          			title: "Successfull.",
          			position: 'top-end',
          			type: 'success',
          			showConfirmButton: false,
          			timer: 1600,
        		});
        		setTimeout(function(){ window.location.href = THEMEBASEURL+'units'; }, 1800);
      		}else{
        		$('#error_units_name').html(response.validations['units_name']);
        		if (response.validations['units_name']) {
          			$('.error-name').addClass('has-error');
        		};
        		$('#error_units_note').html(response.validations['units_note']);
        		if (response.validations['units_note']) {
          			$('.error-note').addClass('has-error');
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
      		url: THEMEBASEURL+'units/retrive',
      		data: {
        		'id'  : id,
        		[CSRFNAME]  : CSRFHASH,
      		},
      		dataType: "html",
      		success: function(data) {
        		var response = jQuery.parseJSON(data);
        		console.log(response);
        		if(response.confirmation == 'Success') {
		          	$('#unitsID').val(response.id);
		          	$('#units_name_up').val(response.units_name);
		          	$('#units_note_up').val(response.units_note);


          			$('.updated').click(function(){
			            var id              = $('#unitsID').val();
			            var units_name      = $("#units_name_up").val();
			            var units_note      = $("#units_note_up").val();
            			
            			$('#error_units_name_up').html('');
			            $('.error-name-up').removeClass('has-error');
			            $('#error_units_note_up').html('');
			            $('.error-note-up').removeClass('has-error');
            			
            			$.ajax({
              				dataType: 'json',
          					type: 'POST',
          					url: THEMEBASEURL+'units/edit',
              				data: {
                				'id'  : id,
                				'units_name'  : units_name,
                				'units_note'   : units_note, 
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
                  					setTimeout(function(){ window.location.href = THEMEBASEURL+'units'; }, 1800);
                				}else{
                  					$('#error_units_name_up').html(response.validations['units_name']);
                  					if(response.validations['units_name']) {
                    					$('.error-name-up').addClass('has-error');
                  					};
                  					$('#error_units_note_up').html(response.validations['units_note']);
              						if (response.validations['units_note']){
                						$('.error-note-up').addClass('has-error');
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
        			url: THEMEBASEURL+'units/delete',
        			type: 'POST',
        			data: {
          				'id'       : id,
          				[CSRFNAME]    : CSRFHASH,
    				},
        			dataType: 'json'
      			})
       			.done(function(response){
        			swal('Deleted!', response.message, response.status);
        			setTimeout(function(){ window.location.href = THEMEBASEURL+'units'; }, 2000);
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
      		url: THEMEBASEURL+'units/status',
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