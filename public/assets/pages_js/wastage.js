$(function () {
	$('#example1').DataTable({
	    'pageLength':15,
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

$(document).on('click', '.insert', function(e){
  	"use strict";
  	var wastage_date      = $("#wastage_date").val();
  	var wastage_item_name = $("#item_name").val();
  	var wastage_quantity  = $("#wastage_quantity").val();
  	var wastage_note      = $("#wastage_note").val();

  	$('#error_wastage_name').html('');
  	$('.error-name').removeClass('has-error');
  	$('#error_wastage_quantity').html('');
  	$('.error-quantity').removeClass('has-error');
  	$('#error_wastage_note').html('');
  	$('.error-note').removeClass('has-error');

  	$.ajax({
		dataType: 'json',
    	type: 'POST',
    	url: THEMEBASEURL+'wastage/add',
    	data: {
      		'wastage_date'  : wastage_date,
      		'wastage_item_name'  : wastage_item_name,
      		'wastage_quantity'  : wastage_quantity,
      		'wastage_note'   : wastage_note, 
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
		        setTimeout(function(){ window.location.href = THEMEBASEURL+'wastage'; }, 1800);
		    }else{
		        $('#error_wastage_name').html(response.validations['wastage_name']);
		        $('.error-name').addClass('has-error');
		        $('#error_wastage_quantity').html(response.validations['wastage_quantity']);
		        $('.error-quantity').addClass('has-error');
		        $('#error_wastage_note').html(response.validations['wastage_note']);
		        $('.error-note').addClass('has-error');
		    }
	    }
  	});
});


$(document).on('click', '.restore', function(e){
  	"use strict";
  	var id = $(this).attr("id");
  	swal({
    	title: 'Are you sure?',
    	text: "It will be Restore!",
    	type: 'warning',
    	showCancelButton: true,
    	confirmButtonColor: '#3085d6',
    	cancelButtonColor: '#d33',
    	confirmButtonText: 'Yes, Restore it!',
    	showLoaderOnConfirm: true,

    	preConfirm: function() {
      		return new Promise(function(resolve) {
       			$.ajax({
       				url: THEMEBASEURL+'wastage/restore',
        			type: 'POST',
        			data: {
		          	'id'  : id,
		          	[CSRFNAME]  : CSRFHASH,
			        },
	        		dataType: 'json'
	      		})
	       		.done(function(response){
	        		swal('Restored!', response.message, response.status);
	        		setTimeout(function(){ window.location.href = THEMEBASEURL+'wastage'; }, 2000);
			    })
	       		.fail(function(){
	        		swal('Oops...', 'Something went wrong with You !', 'error');
	      		});
	     	});
	    },
	    allowOutsideClick: false        
	});  
});

