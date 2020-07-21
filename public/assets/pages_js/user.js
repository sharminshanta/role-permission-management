
$(function () {
  $('#example1').DataTable({'pageLength':10,});
  $("#new_password").password('toggle');
  $("#confirm_password").password('toggle');
})

$(document).on('click', '.changeUserPassword', function(e){
  "use strict";
  var id = $(this).attr('id');
  $('.changepassword').click(function(){
    var new_password = $('#new_password').val();
    var confirm_password = $('#confirm_password').val();
    $('#error_new_password').html('');
    $('#error_confirm_password').html('');
    $.ajax({
      dataType: "json",
      type: 'POST',
      url: THEMEBASEURL+'user/changepassword',
      data: {
        [CSRFNAME]  : CSRFHASH,
        'id'  : id,
        'new_password' : new_password,
        'confirm_password' : confirm_password,
      },
      dataType: "html",
      success: function(data){
        var response = jQuery.parseJSON(data);
        console.log(data);
        if(response.confirmation == 'error') {
          $('#error_new_password').html(response.validations['new_password']);
          $('#error_confirm_password').html(response.validations['confirm_password']);
        } else {
          $('#change').modal('hide');
          swal({
            title: "Successfully Change Password.",
            position: 'top-end',
            type: 'success',
            showConfirmButton: false,
            timer: 1600,
          });
          setTimeout(function(){ window.location.href = THEMEBASEURL+'user'; }, 1800);
        }
      }
    });
  });
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
