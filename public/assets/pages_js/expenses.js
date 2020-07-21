$(function (){
    $('#example1').DataTable({
      'pageLength':25,
    });
});

// $(document).ready(function(){
    // $('#expenses_date').datepicker({
    //     format : 'dd-mm-yyyy',
    // });

    // $('#expenses_date_up').datepicker({
    //     format : 'dd-mm-yyyy',
    // });
// });

$(document).on('keypress', '.only_number', function(e){
    var yourInput = $(this).val();
    var keyCode = e.which ? e.which : e.keyCode
    if (!(keyCode >= 48 && keyCode <= 57)) {
        return false;
    }
});



var trId = 1;
$(document).on('click', '.addToCart', function(e){
    "use strict";
    var expenses_date   = $("#expenses_date").val();
    var expenses_for    = $("#expenses_for").val();
    var expenses_amount = $("#expenses_amount").val();
    var expenses_note   = $("#expenses_note").val();

    $('#error_expenses_for').html('');
    $('.error-for').removeClass('has-error'); 
    $('#error_expenses_amount').html('');
    $('.error-expenses').removeClass('has-error');

    if ((expenses_for == '') || (expenses_amount == '')){
        if(expenses_for == ''){
         $('#error_expenses_for').html('');
         $('.error-for').addClass('has-error'); 
     }
     if (expenses_amount == ''){
        $('#error_expenses_amount').html('');
        $('.error-expenses').addClass('has-error');
    }

}else{

    var tr;
    tr += "<tr id='tr_" + trId + "'>";

    tr += "<td data-title='#' class='count' id='" + trId + 1 + "'>";
    tr += trId;
    tr += "</td>";

    tr += "<td data-title='expenses_date' id='" + trId + 2 + "'>";
    tr += expenses_date;
    tr += "</td>";

    tr += "<td data-title='expenses_for' id='" + trId + 3 + "'>";
    tr += expenses_for;
    tr += "</td>";

    tr += "<td data-title='expenses_amount' id='" + trId + 4 + "'>";
    tr += expenses_amount;
    tr += "</td>";

    tr += "<td data-title='expenses_note' id='" + trId + 5 + "'>";
    tr += expenses_note;
    tr += "</td>";

    tr += "<td data-title='expenses_action' id='" + trId + 6 + "'>";
    tr += "<div id='" + trId + "' class='delete_row'><button class='btn btn-xs btn-danger' data-placement='bottom' data-original-title='Delete This Item' data-toggle='tooltip'><i class='glyphicon glyphicon-trash'></i></button></div>";
    tr += "</td>";
    tr += "</tr>";
    $("#order_item_table").append(tr);

    var theTotal = 0;
    $(".count").each(function(){
        var val = $(this).text();
        theTotal += parseFloat(val) || 0;
    });
    $("#total_count").val(theTotal);

    trId++;
    $("#expenses_for").val("");
    $("#expenses_note").val("");
    $("#expenses_amount").val("");

    $(".delete_row").click(function() {
        var id = $(this).attr("id");
              // remove item update 
              var n = $("#order_item_table").find("tr").length;
              for (var i = 1; i < n; i++) {
                var pid = $("#order_item_table").find("tr").eq(i).find("td").eq(0).text();
                if (id == pid) {                  
                    var count =  $("#order_item_table").find("tr").eq(i).find("td").eq(0).text();
                    var total_count = parseFloat($("#total_count").val()) || 0;
                    var sum = parseFloat(total_count - count)|| 0;
                    parseFloat($("#total_count").val(sum)) || 0;
                };
            }
            $('#tr_' + id).remove();
        });
}
});

$(document).on('click', '.insert', function(e){
  "use strict";
    var n = $("#order_item_table").find("tr").length;
    var count = $("#total_count").val();
    if (count > 0) {
        for(var i = 1; i < n; i++) {
            var expenses_date   = $("#order_item_table").find("tr").eq(i).find("td").eq(1).text();
            var expenses_for    = $("#order_item_table").find("tr").eq(i).find("td").eq(2).text();
            var expenses_amount = $("#order_item_table").find("tr").eq(i).find("td").eq(3).text();
            var expenses_note   = $("#order_item_table").find("tr").eq(i).find("td").eq(4).text();
            $.ajax({
                dataType: 'json',
                type: 'POST',
                url: THEMEBASEURL+'expenses/add',
                data: {
                    'expenses_date'   : expenses_date,
                    'expenses_for'    : expenses_for, 
                    'expenses_amount' : expenses_amount, 
                    'expenses_note'   : expenses_note, 
                    [CSRFNAME]        : CSRFHASH,
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
                        setTimeout(function(){ window.location.href = THEMEBASEURL+'expenses'; }, 1800);
                    }
                }
            });
}
}else{
    swal({
        type: 'error',
        title: 'Oops...',
        text: '<?=$this->lang->line("expenses_error")?>',
    })
}
});


$(document).on('click', '.update', function(e){
  "use strict";
  var id = $(this).attr('id');
  if(id != 'NULL' || id != '') {
    dataType: "json",
    $.ajax({
    type: 'POST',
    url: THEMEBASEURL+'expenses/retrive',
    data: {
      'id'  : id,
      [CSRFNAME]  : CSRFHASH,
    },
      dataType: "html",
      success: function(data) {
        var response = jQuery.parseJSON(data);
        console.log(response);
        if(response.confirmation == 'Success') {
          $('#expensesID').val(response.id);
          $('#expenses_date_up').val(response.expenses_date);
          $('#expenses_for_up').val(response.expenses_for);
          $('#expenses_amount_up').val(response.expenses_amount);
          $('#expenses_note_up').val(response.expenses_note);


          $('.updated').click(function(){
            var id = $('#expensesID').val();
            var expenses_date = $('#expenses_date_up').val();
            var expenses_for = $('#expenses_for_up').val();
            var expenses_amount = $('#expenses_amount_up').val();
            var expenses_note = $('#expenses_note_up').val();

            $('#error_up_expenses_for').html('');
            $('.error-for-up').removeClass('has-error');
            $('#error_up_expenses_amount').html('');
            $('.error-expenses-up').removeClass('has-error');

            $.ajax({
              dataType: "json",
              type: 'POST',
              url: THEMEBASEURL+'expenses/edit',
              data: {
                'id'  : id,
                'expenses_date'     : expenses_date,
                'expenses_for'      : expenses_for, 
                'expenses_amount'   : expenses_amount, 
                'expenses_note'     : expenses_note,
                [CSRFNAME]          : CSRFHASH,
            },
            dataType: "html",
            success: function(data){
                var response = jQuery.parseJSON(data);
                console.log(data);
                if(response.confirmation == 'Success') {
                    $('#update').modal('hide');
                    swal({
                        title: "Successfully Updated.",
                        position: 'top-end',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 1600,
                    });
                    setTimeout(function(){ window.location.href = THEMEBASEURL+'expenses'; }, 1800);
                }else{
                    $('#error_up_expenses_for').html(response.validations['expenses_for']);
                    if (response.validations['expenses_for']) {
                        $('.error-for-up').addClass('has-error');
                    }
                    $('#error_up_expenses_amount').html(response.validations['expenses_amount']);
                    if (response.validations['expenses_amount']) {
                        $('.error-expenses-up').addClass('has-error');
                    }
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
                    url: THEMEBASEURL+'expenses/delete',
                    type: 'POST',
                    data: {
                      'id'  : id,
                      [CSRFNAME]    : CSRFHASH,
                    },
                    dataType: 'json'
                })
                 .done(function(response){
                // table.ajax.reload(null, false); // for reload a page
                swal('Deleted!', response.message, response.status);
                setTimeout(function(){ window.location.href = THEMEBASEURL+'expenses'; }, 2000);
            })
                .fail(function(){
                swal('Oops...', 'Something went wrong with You !', 'error');
            });
         });
      },
      allowOutsideClick: false        
    }); 
}); 