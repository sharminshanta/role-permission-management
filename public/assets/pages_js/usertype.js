$(function () {
  $('#example1').DataTable({
    'pageLength':10,
  });
})


$(document).on('click', '.insert', function(e){
  	"use strict";
  	var usertype = $("#usertype").val();
  	$('#error_usertype_name').html('');
  	$('.error-name').removeClass('has-error');
  	$.ajax({
    	dataType: 'json',
    	type: 'POST',
    	url: THEMEBASEURL+'usertype/add',
    	data: {
	      	'usertype'  : usertype,
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
        		setTimeout(function(){ window.location.href = THEMEBASEURL+'usertype'; }, 1800);
      		}else{
        		$('#error_usertype_name').html(response.validations['usertype']);
        		if (response.validations['usertype']){
          			$('.error-name').addClass('has-error');
        		};
      		}
    	}
  	});
});



$(document).on('click', '.update', function(e){
  	"use strict";
  	var id = $(this).attr('id');
  	var retrive = '1';
  	if(id != 'NULL' || id != '') {
    	dataType: "json",
    	$.ajax({
      		type: 'POST',
      		url: THEMEBASEURL+'usertype/edit',
      		data: {
        		'id'  : id,
        		'retrive' : retrive,
        		[CSRFNAME]  : CSRFHASH,
      		},
      		dataType: "html",
      		success: function(data){
        		var response = jQuery.parseJSON(data);
        		console.log(response);
        		if(response.confirmation == 'Success') {
          			$('#usertypeID').val(response.id);
          			$('#usertype_up').val(response.usertype);
          			$('.updated').click(function(){
            			var id        = $('#usertypeID').val();
            			var usertype  = $("#usertype_up").val();
	            		$('#error_usertype_up').html('');
	            		$('.error-name-up').removeClass('has-error');
	            		$.ajax({
	              			dataType: 'json',
	              			type: 'POST',
	              			url: THEMEBASEURL+'usertype/edit',
	              			data: {
	                			'id'  : id,
	                			'usertype'  : usertype,
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
	                  				setTimeout(function(){ window.location.href = THEMEBASEURL+'usertype'; }, 1800);
	                			}else{
	                  				$('#error_usertype_up').html(response.validations['usertype']);
	                  				if (response.validations['usertype']){
	                    				$('.error-name-up').addClass('has-error');
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
        			url: THEMEBASEURL+'usertype/delete',
        			type: 'POST',
        			data: {
          				'id'       : id,
          				[CSRFNAME]    : CSRFHASH,
    				},
        			dataType: 'json'
      			})
       			.done(function(response){
        			swal('Deleted!', response.message, response.status);
        			setTimeout(function(){ window.location.href = THEMEBASEURL+'usertype'; }, 2000);
      			})
       			.fail(function(){
        			swal('Oops...', 'Something went wrong with You !', 'error');
      			});
     		});
    	},
    	allowOutsideClick: false        
  	}); 
});

