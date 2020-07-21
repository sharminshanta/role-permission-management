$(function() {
  $('#example1').DataTable({
    'pageLength':10,
  });
})

$(document).on('click', '.insert', function(e){
  "use strict";
  var categories_code    = $("#categories_code").val();
  var categories_name    = $("#categories_name").val();
  var categories_note    = $("#categories_note").val();

  $('#error_categories_name').html('');
  $('.error-name').removeClass('has-error');
  $.ajax({
    dataType: 'json',
    type: 'POST',
    url: THEMEBASEURL+'categories/add',
    data: {
      'categories_code'   : categories_code, 
      'categories_name'   : categories_name,
      'categories_note'   : categories_note, 
       [CSRFNAME]           : CSRFHASH,
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
        setTimeout(function(){ window.location.href = THEMEBASEURL+'categories'; }, 1800);
      }else{
        $('#error_categories_name').html(response.validations['categories_name']);
        $('.error-name').addClass('has-error');
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
      url: THEMEBASEURL+'categories/retrive',
      data: {
        'id'      : id,
        [CSRFNAME]   : CSRFHASH,
      },
      dataType: "html",
      success: function(data) {
        var response = jQuery.parseJSON(data);
        console.log(response);
        if(response.confirmation == 'Success') {
          $('#categoriesID').val(response.id);
          $('#categories_name_up').val(response.categories_name);
          $('#categories_note_up').val(response.categories_note);


          $('.updated').click(function(){
            var id                  = $('#categoriesID').val();
            var categories_name      = $("#categories_name_up").val();
            var categories_note    = $("#categories_note_up").val();

            $('#error_categories_name_up').html('');
            $('.error-class').removeClass('has-error');
            $.ajax({
              dataType: 'json',
              type: 'POST',
              url: THEMEBASEURL+'categories/edit',
              data: {
                'id'  : id,
                'categories_name'  : categories_name,
                'categories_note'  : categories_note,
                [CSRFNAME]            : CSRFHASH,
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
                  setTimeout(function(){ window.location.href = THEMEBASEURL+'categories'; }, 1800);
                }else{
                  $('#error_categories_name_up').html(response.validations['categories_name']);
                  $('.error-class').addClass('has-error');

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

    preConfirm: function() {
      return new Promise(function(resolve) {
       $.ajax({
        url: THEMEBASEURL+'categories/delete',
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
      url: THEMEBASEURL+'categories/status',
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


