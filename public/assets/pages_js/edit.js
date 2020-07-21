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

$(document).on('keyup', '.ajaxSearch', function(e){
	"use strict";
    var input_data = $('#search_data').val();
    if (input_data.length === 0) {
        $('#suggestions').hide();
    } else {
        $.ajax({
            type: "POST",
            url: THEMEBASEURL+'sales/search',
            data: {
              'post_data'  : input_data,
              [CSRFNAME]  : CSRFHASH,
            },
            success: function(data) {
                if (data != 'false') {
                    if (data.length > 0) {
                        $('#suggestions').show();
                        $('#autoSuggestionsList').addClass('auto_list');
                        $('#autoSuggestionsList').html(data);
                    }else{
                        $('#suggestions').show();
                        $('#autoSuggestionsList').addClass('auto_list');
                        $('#autoSuggestionsList').html('<a href="#/" class="itemID" id=""><li>No Records Found !</li></a>');
                    }
                } else {
                    $('#suggestions').show();
                    $('#autoSuggestionsList').addClass('auto_list');
                    $('#autoSuggestionsList').html('<a href="#/" class="itemID" id=""><li>No Records Found !</li></a>');
                }
            }
        });
    }
});


$(document).on('click', '.itemID', function(e){
	"use strict";
	var id = $(this).attr("id");
    $('#search_data').val('');
    $('#suggestions').hide();
    if (id != ''){
        $.ajax({
            dataType: 'json',
            type: "POST",
            url: THEMEBASEURL+'sales/retrive',
            data: {
          		'id'  : id,
              	[CSRFNAME]  : CSRFHASH,
            },
            dataType: 'html',
            success: function(data){
	            var response = jQuery.parseJSON(data);
	            if(response.confirmation == 'Success'){
	                $('#itemID').val(response.id);
	                $('#item_name').val(response.name);
	                $('#sales_price').val(response.items_price);
	                $('#item_quantity').val('1');
	                $('#sales_tax').val(response.tax).trigger('change');
	            }
	        }
     	});
    }
});

$(document).ready(function(){
    function price_calculation(){
        var price = parseFloat($("#sales_price").val()) || 0;
        var tax = parseFloat($('option:selected', "#sales_tax").attr('data-tax')) || 0; 
        var quantity = parseFloat($("#item_quantity").val()) || 0;
        var total_amount = parseFloat($("#total_amount").val()) || 0;
        var unit_cost = parseFloat($("#unit_cost").val()) || 0;
        $("#tax_amount").val(((price*tax)/parseFloat(100)).toFixed(2));
        $("#unit_cost").val(((price + (price*tax)/parseFloat(100)).toFixed(2)));
        $("#total_amount").val((quantity*(price + (price*tax)/parseFloat(100))).toFixed(2));
    // selling_price();
	}
	$("#sales_price").keyup(function(event) {
	    price_calculation();
	});
	$("#sales_tax").change(function(event) {
	    price_calculation();
	});

	$("#item_quantity").change(function(event) {
	    price_calculation();
	});
});

$(document).ready(function(){
    function calculation(){
        var other_charge = parseFloat($("#other_charge").val()) || 0;
        var tax_type = parseFloat($("#tax_type").val()) || 0;
        var overall_discount = parseFloat($("#overall_discount").val()) || 0;
        var discount_type = parseFloat($("#discount_type").val()) || 0;
        var subtotal = parseFloat($("#sales_subtotal").html()) || 0;

        //  charge
        if (tax_type >0){
            var sales_other_charge = $("#sales_other_charge").html((subtotal*other_charge)/parseFloat(100).toFixed(2));
        }else{ 
            var sales_other_charge = $("#sales_other_charge").html(other_charge);
        }
        // discount
        if (discount_type > 0){
            var sales_overall_discount = $("#sales_overall_discount").html((subtotal*overall_discount)/parseFloat(100).toFixed(2));
        }else{
            var sales_overall_discount = $("#sales_overall_discount").html(overall_discount);
        }

        // grand total
        var total_other_charge = parseFloat($("#sales_other_charge").html()) || 0;
        var total_discount = parseFloat($("#sales_overall_discount").html()) || 0;
        var cal = ((subtotal + total_other_charge) - total_discount) || 0;

        $("#sales_grand_total").html(Math.round(cal));        

        // var round_off = Math.round(cal) - cal;
        // $("#sales_round_off").html(parseFloat(round_off).toFixed(2));       
    }
    $("#sales_subtotal").keyup(function(event){
        calculation();
    });
    $("#sales_other_charge").keyup(function(event) {
        calculation();
    });
    $("#sales_overall_discount").keyup(function(event) {
        calculation();
    });

    $("#other_charge").keyup(function(event) {
        calculation();
    });

    $("#tax_type").change(function(event) {
        calculation();
    });

    $("#overall_discount").keyup(function(event) {
        calculation();
    });

    $("#discount_type").change(function(event) {
        calculation();
    });    
});

var trId = $("#order_item_table").find("tr").length;
$(document).on('click', '.addToList', function(e){
	"use strict";
  	var itemID = $("#itemID").val();
  	var item_name = $("#item_name").val();
  	var item_quantity = $("#item_quantity").val();
  	var sales_price = $("#sales_price").val();
  	var sales_tax = $("#sales_tax").val();
  	var sales_taxname = $('option:selected', "#sales_tax").attr('data-val') || 0; 
  	var tax_amount = $("#tax_amount").val();
  	var unit_cost = $("#unit_cost").val();
  	var total_amount = $("#total_amount").val();

  	if(itemID != ""){
	    if(total_amount =="" || total_amount  <= 0){
	      swal({
	        type: 'error',
	        title: 'Oops...',
	        text: 'Please Select Quantity',
	    })
  	}else{

	    var tr;
	    tr += "<tr id='tr_" + trId + "'>";
	    tr += "<td id='" + trId + 1 + "'>";
	    tr += trId;
	    tr += "</td>";

	    tr += "<td hidden id='" + trId + 2 + "'>";
	    tr +=  itemID;
	    tr += "</td>";

	    tr += "<td id='" + trId + 3 + "'>";
	    tr += item_name;
	    tr += "</td>";

	    tr += "<td class='quantity_count' id='" + trId + 4 + "'>";
	    tr += item_quantity;
	    tr += "</td>";

	    tr += "<td id='" + trId + 5 + "'>";
	    tr += sales_price;
	    tr += "</td>";

	    tr += "<td hidden id='" + trId + 6 + "'>";
	    tr += sales_tax;
	    tr += "</td>";

	    tr += "<td id='" + trId + 7 + "'>";
	    tr += sales_taxname;
	    tr += "</td>";

	    tr += "<td id='" + trId + 8 + "'>";
	    tr += tax_amount;
	    tr += "</td>";

	    tr += "<td class='unit_price' id='p_" + trId + 9 + "'>";
	    tr += unit_cost;
	    tr += "</td>";

	    tr += "<td class='total_price' id='p_" + trId + 10 + "'>";
	    tr += total_amount;
	    tr += "</td>";
	    tr += "<td id='" + trId + 11 + "'>";

	    tr += "<div id='" + trId + "' class='delete_row'><button class='btn btn-xs btn-danger' data-placement='bottom' data-original-title='Delete This Item' data-toggle='tooltip'>&nbsp;&nbsp;<i class='glyphicon glyphicon-trash'></i>&nbsp;&nbsp;</button></div>";
	    tr += "</td>";
	    tr += "</tr>";

    	$("#order_item_table").append(tr);

        var theTotal = 0;
        $(".total_price").each(function(){
            var val = $(this).text();
            theTotal += parseFloat(val);
        });

        var theTotalQ = 0;
        $(".quantity_count").each(function(){
            var val = $(this).text();
            theTotalQ += parseFloat(val) || 0;
        });

        $(".count_quantity").html(theTotalQ);
        $("#sales_subtotal").html(Math.round(theTotal));
        $("#sales_grand_total").html(Math.round(theTotal));      

        // calculations part
        var other_charge = parseFloat($("#other_charge").val()) || 0;
        var tax_type = parseFloat($("#tax_type").val()) || 0;
        var overall_discount = parseFloat($("#overall_discount").val()) || 0;
        var discount_type = parseFloat($("#discount_type").val()) || 0;
        var subtotal = parseFloat($("#sales_subtotal").html()) || 0;

        //  charge
        if (tax_type >0){
            var sales_other_charge = $("#sales_other_charge").html((subtotal*other_charge)/parseFloat(100).toFixed(2));
        }else{ 
            var sales_other_charge = $("#sales_other_charge").html(other_charge);
        }
        // discount
        if (discount_type > 0){
            var sales_overall_discount = $("#sales_overall_discount").html((subtotal*overall_discount)/parseFloat(100).toFixed(2));
        }else{
            var sales_overall_discount = $("#sales_overall_discount").html(overall_discount);
        }

        // grand total
        var total_other_charge = parseFloat($("#sales_other_charge").html()) || 0;
        var total_discount = parseFloat($("#sales_overall_discount").html()) || 0;
        var cal = ((subtotal + total_other_charge) - total_discount) || 0;

        $("#sales_grand_total").html(Math.round(cal));      
        // close calculations part
      
            // close calculation 
            trId++;
            $("#itemID").val('');
            $("#item_name").val('');
            $("#item_quantity").val('');
            $("#sales_price").val('');
            $("#sales_tax").val('0').trigger('change');
            $("#tax_amount").val('');
            $("#unit_cost").val('');
            $("#total_amount").val('');

            $(".delete_row").click(function(){
              	var id = $(this).attr("id");
              	// remove item update 
              	var n = $("#order_item_table").find("tr").length;
              	for (var i = 1; i < n; i++) {
	                var pid = $("#order_item_table").find("tr").eq(i).find("td").eq(0).text();
	                if (id == pid) {
	                  	var product_id        = $("#order_item_table").find("tr").eq(i).find("td").eq(1).text();
	                  	var quantity_count    = $("#order_item_table").find("tr").eq(i).find("td").eq(3).text();
	                  	var total_price       = $("#order_item_table").find("tr").eq(i).find("td").eq(8).text();
	                  	var get_quantity_count = parseFloat($(".count_quantity").html()) || 0;
	                  	var new_quantity = parseFloat($(".count_quantity").html(get_quantity_count-quantity_count)) || 0;

	                  	var get_subtotal = parseFloat($("#sales_subtotal").html()) || 0;
	                  	var get_total_price = parseFloat($("#sales_grand_total").html()) || 0;                  
	                  	var new_subtotal =  parseFloat($("#sales_subtotal").html(Math.round(get_subtotal - total_price))) || 0;
	                  	var grand_total = Math.round(get_total_price - total_price);

	                  	var new_grand_total =  parseFloat($("#sales_grand_total").html(grand_total)) || 0;

	        		};
	        	}
	        	$('#tr_' + id).remove();
	    	});   
		}
	} else{
	    swal({
	        type: 'error',
	        title: 'Oops...',
	        text: 'Something is Wrong Here!',
	    })
	}
});


$(document).on('click', '#insert', function(e){
	"use strict";
	 var sales_code     	= $("#sales_code").val();
	 var date              	= $("#date").val();
	 var customers         	= $("#customers").val();
	 var status            	= $("#status").val();
	 var reference         	= $("#reference").val();

	 var payment_amount 	= $("#payment_amount").val();
	 var payment_type   	= $("#payment_type").val();
	 var payment_note   	= $("#payment_note").val();

	 var count_quantity         = $("#count_quantity").html();
	 var sales_note             = $("#sales_note").val();
	 var sales_subtotal         = $("#sales_subtotal").html();
	 var sales_other_charge     = $("#sales_other_charge").html();
	 var sales_overall_discount = $("#sales_overall_discount").html();
	 var sales_grand_total      = $("#sales_grand_total").html();

	 var other_charge      = $("#other_charge").val();
	 var tax_type          = $("#tax_type").val();
	 var overall_discount  = $("#overall_discount").val();
	 var discount_type     = $("#discount_type").val();

  	if(count_quantity > '0'){
        $.ajax({
          	dataType: "json",
          	url: window.location.href,
          	type: "POST",
          	data: {
	            'sales_code' 	:sales_code,
	            'date'          :date,
	            'customers'     : customers,
	            'status'        : status,
	            'reference'     : reference,

	            'payment_amount'  : payment_amount,
	            'payment_type'    : payment_type,
	            'payment_note'    : payment_note,

	            'count_quantity'        :count_quantity,
	            'sales_note'            :sales_note,
	            'sales_subtotal'        : sales_subtotal,
	            'sales_other_charge'    : sales_other_charge,
	            'sales_overall_discount': sales_overall_discount,
	            'sales_grand_total'     : sales_grand_total,

	            'other_charge'      : other_charge,
	            'tax_type'          : tax_type,
	            'overall_discount'  : overall_discount,
	            'discount_type'     : discount_type,
	            [CSRFNAME]  		: CSRFHASH,
	        },
        	dataType: "html",
        	success: function(data){
          		var response = jQuery.parseJSON(data);
          		console.log(response);
          		if(response.confirmation == 'success'){
            		var lastID = response.lastID ;
        			var n = $("#order_item_table").find("tr").length;
            		for (var i = 1; i < n; i++) {
               			var itemID           = $("#order_item_table").find("tr").eq(i).find("td").eq(1).text();
               			var item_quantity    = $("#order_item_table").find("tr").eq(i).find("td").eq(3).text();
               			var sales_price      = $("#order_item_table").find("tr").eq(i).find("td").eq(4).text();
               			var sales_tax        = $("#order_item_table").find("tr").eq(i).find("td").eq(5).text();
               			var tax_amount       = $("#order_item_table").find("tr").eq(i).find("td").eq(7).text();
               			var unit_price       = $("#order_item_table").find("tr").eq(i).find("td").eq(8).text();
               			var total_amount     = $("#order_item_table").find("tr").eq(i).find("td").eq(9).text();
               			var pdID             = $("#order_item_table").find("tr").eq(i).find("td").eq(10).text();
               			$.ajax({
                  			type: 'POST',
                  			dataType: "json",
                  			url: THEMEBASEURL+'sales/insert',
                  			data: {
			                    'sales_code'    :sales_code,
			                    'itemID'        : itemID,
			                    'item_quantity' : item_quantity,
			                    'sales_price'   : sales_price,
			                    'sales_tax'     : sales_tax,
			                    'tax_amount'    : tax_amount,
			                    'unit_price'    : unit_price,
			                    'total_amount'  : total_amount,
			                    'pdID'          : pdID,
			                    [CSRFNAME]  	: CSRFHASH,
                			},
                			dataType: "html",
                			success: function(data) {
	                  			var response = jQuery.parseJSON(data);
	                  			console.log(response);
	                  			if(response.confirmation == 'success') {
	                   				swal({
					                    title: "Successfully Update.",
					                    position: 'top-end',
					                    type: 'success',
					                    showConfirmButton: false,
					                    timer: 1600,
					                });
					                setTimeout(function(){ window.location.href = THEMEBASEURL+'sales/view/'+lastID; }, 1800);
				               }
				           }
				       });
					}
				}else{
				    $('#error_payment_amount').html(response.validations['payment_amount']);
				    $('#error_payment_type').html(response.validations['payment_type']);
				}
			}
		}); 
	}else{
	   swal({
		    type: 'error',
		    title: 'Oops...',
		    text: 'Please Select Item',
		})
	}
});



// delete script
$(document).on('click', '.delete', function(e){
    "use strict";
    var id = $(this).attr("id");
 	var count_quantity = $('#count_quantity').html();
  	var sales_subtotal = $("#sales_subtotal").html();
  	var sales_grand_total =  $("#sales_grand_total").html();     


    swal({
        title: 'Are you sure?',
        text: "It will be Deleted From The Server Permanently!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        showLoaderOnConfirm: true,

        preConfirm: function() {
            return new Promise(function(resolve) {
                $.ajax({
                	url: THEMEBASEURL+'sales/delete',
                    type: 'POST',
                    data: {
                        'id'  		: id,
                        [CSRFNAME]  : CSRFHASH,
                    },
                    dataType: 'json'
                })
                .done(function(response){
                    $('#tr-'+id).remove();
                    $('#sales_subtotal').html('response.purchase_subtotal');
                    // table.ajax.reload(null, false); // for reload a page
                    swal('Deleted!', response.message, response.status);
			        $('#count_quantity').html(count_quantity - response.pd_quantity);
			        $("#sales_subtotal").html(sales_subtotal - response.pd_total_amount);
			        $("#sales_grand_total").html(sales_grand_total - response.pd_total_amount);      
                    // setTimeout(function(){ window.location.href = "< ?= base_url('sales')?>";}, 2000);
                })
                .fail(function(){
                    swal('Oops...', 'Something went wrong with You !', 'error');
                });
            });
        },
        allowOutsideClick: false        
    }); 
}); 

