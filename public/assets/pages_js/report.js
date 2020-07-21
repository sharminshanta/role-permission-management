$(document).ready(function(){
    $('.select2').select2();
});

// for print 
$(document).on('click', '.prints', function(e){
    var divElements = document.getElementById('print_areas').innerHTML;
    var oldPage = document.body.innerHTML;
    document.body.innerHTML = 
    "<html>"+
    "<head>"+
    "<title>Invoice</title><style type='text/css'>.img-height{height: 100px; width: 100px; float: left; margin-right: 10px;}</style>"+
    "</head>"+
    "<body>" + 
    divElements + "</body>";
    window.print();
    document.body.innerHTML = oldPage;
});