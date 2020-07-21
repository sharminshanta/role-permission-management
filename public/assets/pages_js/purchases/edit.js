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
            url: THEMEBASEURL+'purchases/search',
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
            url: THEMEBASEURL+'purchases/retrive',
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
                    $('#purchases_price').val(response.items_price);
                    $('#item_quantity').val('1');
                    $('#purchases_tax').val(response.tax).trigger('change');
                }
            }
        });
    }
});

$(document).ready(function(){
    function price_calculation(){
        var price = parseFloat($("#purchases_price").val()) || 0;
        var tax = parseFloat($('option:selected', "#purchases_tax").attr('data-tax')) || 0;
        var quantity = parseFloat($("#item_quantity").val()) || 0;
        var total_amount = parseFloat($("#total_amount").val()) || 0;
        var unit_cost = parseFloat($("#unit_cost").val()) || 0;
        $("#tax_amount").val(((price*tax)/parseFloat(100)).toFixed(2));
        $("#unit_cost").val(((price + (price*tax)/parseFloat(100)).toFixed(2)));
        $("#total_amount").val((quantity*(price + (price*tax)/parseFloat(100))).toFixed(2));
        // selling_price();
    }
    $("#purchases_price").keyup(function(event) {
        price_calculation();
    });
    $("#purchases_tax").change(function(event) {
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
        var subtotal = parseFloat($("#purchases_subtotal").html()) || 0;

        //  charge
        if (tax_type >0){
            var purchases_other_charge = $("#purchases_other_charge").html((subtotal*other_charge)/parseFloat(100).toFixed(2));
        }else{
            var purchases_other_charge = $("#purchases_other_charge").html(other_charge);
        }
        // discount
        if (discount_type > 0){
            var purchases_overall_discount = $("#purchases_overall_discount").html((subtotal*overall_discount)/parseFloat(100).toFixed(2));
        }else{
            var purchases_overall_discount = $("#purchases_overall_discount").html(overall_discount);
        }

        // grand total
        var total_other_charge = parseFloat($("#purchases_other_charge").html()) || 0;
        var total_discount = parseFloat($("#purchases_overall_discount").html()) || 0;
        var cal = ((subtotal + total_other_charge) - total_discount) || 0;

        $("#purchases_grand_total").html(Math.round(cal));

        // var round_off = Math.round(cal) - cal;
        // $("#purchases_round_off").html(parseFloat(round_off).toFixed(2));
    }
    $("#purchases_subtotal").keyup(function(event){
        calculation();
    });
    $("#purchases_other_charge").keyup(function(event) {
        calculation();
    });
    $("#purchases_overall_discount").keyup(function(event) {
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
    var purchases_price = $("#purchases_price").val();
    var purchases_tax = $("#purchases_tax").val();
    var purchases_taxname = $('option:selected', "#purchases_tax").attr('data-val') || 0;
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
        } else {

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
            tr += purchases_price;
            tr += "</td>";

            tr += "<td hidden id='" + trId + 6 + "'>";
            tr += purchases_tax;
            tr += "</td>";

            tr += "<td id='" + trId + 7 + "'>";
            tr += purchases_taxname;
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

            tr += "<div id='" + trId + "' class='delete_row'><button class='btn btn-xs btn-danger' data-placement='bottom' data-original-title='Delete This Item' data-toggle='tooltip'>&nbsp;&nbsp;<i class='fa fa-trash'></i>&nbsp;&nbsp;</button></div>";
            tr += "</td>";
            tr += "</tr>";

            $("#order_item_table").append(tr);

            // add calculation
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
            $("#purchases_subtotal").html(Math.round(theTotal));
            // $("#purchases_grand_total").html(Math.round(theTotal));
            $("#purchases_grand_total").html(Math.round(theTotal));
            // calculations part
            var other_charge = parseFloat($("#other_charge").val()) || 0;
            var tax_type = parseFloat($("#tax_type").val()) || 0;
            var overall_discount = parseFloat($("#overall_discount").val()) || 0;
            var discount_type = parseFloat($("#discount_type").val()) || 0;
            var subtotal = parseFloat($("#purchases_subtotal").html()) || 0;
            //  charge
            if (tax_type >0){
                var purchases_other_charge = $("#purchases_other_charge").html((subtotal*other_charge)/parseFloat(100).toFixed(2));
            }else{
                var purchases_other_charge = $("#purchases_other_charge").html(other_charge);
            }
            // discount
            if (discount_type > 0){
                var purchases_overall_discount = $("#purchases_overall_discount").html((subtotal*overall_discount)/parseFloat(100).toFixed(2));
            }else{
                var purchases_overall_discount = $("#purchases_overall_discount").html(overall_discount);
            }

            // grand total
            var total_other_charge = parseFloat($("#purchases_other_charge").html()) || 0;
            var total_discount = parseFloat($("#purchases_overall_discount").html()) || 0;
            var cal = ((subtotal + total_other_charge) - total_discount) || 0;

            $("#purchases_grand_total").html(Math.round(cal));
            // close calculations part
            // close calculation
            trId++;
            $("#itemID").val('');
            $("#item_name").val('');
            $("#item_quantity").val('');
            $("#purchases_price").val('');
            $("#purchases_tax").val('0').trigger('change');
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
                        // alert(quantity_count);
                        var get_quantity_count = parseFloat($(".count_quantity").html()) || 0;
                        var new_quantity = parseFloat($(".count_quantity").html(get_quantity_count-quantity_count)) || 0;

                        var get_subtotal = parseFloat($("#purchases_subtotal").html()) || 0;
                        var get_total_price = parseFloat($("#purchases_grand_total").html()) || 0;
                        var new_subtotal =  parseFloat($("#purchases_subtotal").html(Math.round(get_subtotal - total_price))) || 0;
                        var grand_total = Math.round(get_total_price - total_price);

                        var new_grand_total =  parseFloat($("#purchases_grand_total").html(grand_total)) || 0;
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
    var purchase_code     = $("#purchase_code").val();
    var date              = $("#date").val();
    var suppliers         = $("#suppliers").val();
    var status            = $("#status").val();
    var reference         = $("#reference").val();

    var payment_amount = $("#payment_amount").val();
    var payment_type   = $("#payment_type").val();
    var payment_note   = $("#payment_note").val();

    var count_quantity             = $("#count_quantity").html();
    var purchases_note             = $("#purchases_note").val();
    var purchases_subtotal         = $("#purchases_subtotal").html();
    var purchases_other_charge     = $("#purchases_other_charge").html();
    var purchases_overall_discount = $("#purchases_overall_discount").html();
    var purchases_grand_total      = $("#purchases_grand_total").html();

    var other_charge      = $("#other_charge").val();
    var tax_type          = $("#tax_type").val();
    var overall_discount  = $("#overall_discount").val();
    var discount_type     = $("#discount_type").val();

    if(count_quantity > '0'){
        if(suppliers > '0'){
            $.ajax({
                dataType: "json",
                url: window.location.href,
                type: "POST",
                data: {
                    'purchase_code' :purchase_code,
                    'date'          :date,
                    'suppliers'     : suppliers,
                    'status'        : status,
                    'reference'     : reference,

                    'payment_amount'  : payment_amount,
                    'payment_type'    : payment_type,
                    'payment_note'    : payment_note,

                    'count_quantity'            :count_quantity,
                    'purchases_note'            :purchases_note,
                    'purchases_subtotal'        : purchases_subtotal,
                    'purchases_other_charge'    : purchases_other_charge,
                    'purchases_overall_discount': purchases_overall_discount,
                    // 'purchases_round_off'       : purchases_round_off,
                    'purchases_grand_total'     : purchases_grand_total,

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
                            var purchases_price  = $("#order_item_table").find("tr").eq(i).find("td").eq(4).text();
                            var purchases_tax    = $("#order_item_table").find("tr").eq(i).find("td").eq(5).text();
                            var tax_amount       = $("#order_item_table").find("tr").eq(i).find("td").eq(7).text();
                            var unit_price       = $("#order_item_table").find("tr").eq(i).find("td").eq(8).text();
                            var total_amount     = $("#order_item_table").find("tr").eq(i).find("td").eq(9).text();
                            var pdID             = $("#order_item_table").find("tr").eq(i).find("td").eq(10).text();
                            $.ajax({
                                type: 'POST',
                                dataType: "json",
                                url: THEMEBASEURL+'purchases/insert',
                                data: {
                                    'purchase_code'     :purchase_code,
                                    'itemID'            : itemID,
                                    'item_quantity'     : item_quantity,
                                    'purchases_price'   : purchases_price,
                                    'purchases_tax'     : purchases_tax,
                                    'tax_amount'        : tax_amount,
                                    'unit_price'        : unit_price,
                                    'total_amount'      : total_amount,
                                    'pdID'              : pdID,
                                    [CSRFNAME]  		: CSRFHASH,
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
                                        setTimeout(function(){ window.location.href = THEMEBASEURL+'purchases/view/'+lastID; }, 1800);
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
                text: 'Please Select Supplier',
            })
        }
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
    var purchases_subtotal = $("#purchases_subtotal").html();
    var purchases_grand_total =  $("#purchases_grand_total").html();


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
                    url: THEMEBASEURL+'purchases/delete',
                    type: 'POST',
                    data: {
                        'id'  		: id,
                        [CSRFNAME]  : CSRFHASH,
                    },
                    dataType: 'json'
                })
                    .done(function(response){
                        $('#tr-'+id).remove();
                        $('#purchases_subtotal').html('response.purchase_subtotal');
                        // table.ajax.reload(null, false); // for reload a page
                        swal('Deleted!', response.message, response.status);
                        $('#count_quantity').html(count_quantity - response.pd_quantity);
                        $("#purchases_subtotal").html(purchases_subtotal - response.pd_total_amount);
                        $("#purchases_grand_total").html(purchases_grand_total - response.pd_total_amount);
                        // setTimeout(function(){ window.location.href = "< ?= base_url('purchases')?>";}, 2000);
                    })
                    .fail(function(){
                        swal('Oops...', 'Something went wrong with You !', 'error');
                    });
            });
        },
        allowOutsideClick: false
    });
});
