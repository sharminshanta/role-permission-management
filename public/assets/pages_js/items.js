$(function () {
  $('#example1').DataTable({
    'pageLength':25,
  });
});

$(document).ready(function(){
    $('.select2').select2();
});


$(document).on('keyup', '.is_numeric', function(e){
    var yourInput = $(this).val();
    re = /[`~!@#$%^&*()_|+\-=?;:'",A-z<>\{\} \[\]\\\/]/gi;
    var isCheck = re.test(yourInput);
    if(isCheck){
        var data = yourInput.replace(/[`~!@#$%^&*()_|+\-=?;:'",A-z<>\{\} \[\]\\\/]/gi, '');
        $(this).val(data);
    }
});

$(document).on('keypress', '.only_number', function(e){
    var yourInput = $(this).val();
    var keyCode = e.which ? e.which : e.keyCode
    if (!(keyCode >= 48 && keyCode <= 57)) {
        return false;
    }
});

$(document).on('click', '.details', function(e){
  "use strict";
  var id = $(this).attr("id");
  if(id != 'NULL' || id != '') {
    $.ajax({
      	type: 'POST',
      	dataType: "json",
      	url: THEMEBASEURL+'items/view',
	    data: {
	        'id'  : id,
	        [CSRFNAME]  : CSRFHASH,
	     },
	    dataType: "html",
	    success: function(data) {
	        $('#showData').html(data);
	    } 
    });
  }
});


$(document).on('click', '.barcode', function(e){
  	"use strict";
  	var id = $(this).attr('id');
  	if(id != 'NULL' || id != '') {
	    $.ajax({
		    type: 'POST',
		    url: THEMEBASEURL+'items/barcode',
	      	data: {
	        	'id'  : id,
	        	[CSRFNAME]  : CSRFHASH,
	      	},
		    dataType: "html",
		    success: function(data){
		        console.log(data);
		       	var response = jQuery.parseJSON(data);
		       	var n = ["1", "2", "3", "4", "5", "6","7","8","9","10","11","12","13","14","15"];
		       	var count = "";
		       	var value = "<div class='col-sm-4 custom-barcode-css'><h6>"+response.company_name+"</h6><p>"+response.name+"</p><p><b>Price:</b>"+response.price+"</p><p><img src="+response.img+"></p></div>";
		       	var i;
		       	for (i = 0; i < n.length; i++) {
		        	count += value;
		      	}
		      $("#showBarcode").html(count);
		    }
	  	});
  	}
});

$(document).on('click', '.prints', function(e){
  	var divElements = document.getElementById('print_areas').innerHTML;
  	var oldPage = document.body.innerHTML;
  	document.body.innerHTML = 
	"<html>"+
	"<head>"+
	"<title>Print Barcode</title><style type='text/css'>.col-sm-4{width:32.3333333333%; margin: 1px;}.custom-barcode-css{border: 1px dotted;padding: 2px;}.custom-barcode-css p{margin: 0;line-height: 1;font-size: smaller;text-align: center;}.custom-barcode-css h6{text-align: center;margin: 0;font-weight: bold;}.custom-barcode-css img{height: 40px;width: 140px;}</style>"+
	"</head>"+
	"<body>" + 
	divElements + "</body>";
	window.print();
	document.body.innerHTML = oldPage;
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
        url: THEMEBASEURL+'items/delete',
        type: 'POST',
        data: {
          'id'       : id,
          [CSRFNAME]    : CSRFHASH,
        },
        dataType: 'json'
      })
       .done(function(response){
        swal('Deleted!', response.message, response.status);
        setTimeout(function(){ window.location.href = THEMEBASEURL+'items'; }, 2000);
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
      url: THEMEBASEURL+'items/status',
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



$(document).on('keyup change', function purchase_price(){
    var price = parseFloat($("#price").val()) || 0;
    var tax = parseFloat($('option:selected', "#tax").attr('data-tax')) || 0; 
    $("#purchase_price").val( (price + (price*tax)/parseFloat(100)).toFixed(2));
    selling_price();
});
$("#price").keyup(function(e) {
    purchase_price();
});
$("#tax").change(function(e){
    purchase_price();
});


function selling_price(){
   	var purchase_price = parseFloat($("#purchase_price").val()) || 0;
   	var profit_margin = parseFloat($("#profit_margin").val()) || 0;
   	var tax_type = $("#tax_type").val();
   	var sales_price =parseFloat(0);
   	if(tax_type=='inc'){
	    sales_price = purchase_price + ((purchase_price*profit_margin)/parseFloat(100));
	}
	else{
	    var price = parseFloat($("#price").val().trim()) || 0; 
	    sales_price = price + ((price*profit_margin)/parseFloat(100));
	}
	$("#selling_price").val(sales_price.toFixed(2));
};

$("#tax_type").change(function(event){
    selling_price();
});
$("#profit_margin").keyup(function(event){
    selling_price();
});