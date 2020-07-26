<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" value="{{ csrf_token() }}"/>
    <title>Company Name | @yield('title')</title>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    {{--<link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet"/>--}}
    <link rel="stylesheet" href="{{asset('/')}}assets/bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{asset('/')}}assets/bower_components/Ionicons/css/ionicons.min.css">
    <link rel="stylesheet" href="{{asset('/')}}assets/dist/css/AdminLTE.min.css">
    <link rel="stylesheet" href="{{asset('/')}}assets/dist/css/skins/_all-skins.min.css">
    <link rel="stylesheet" href="{{asset('/')}}assets/sweetalert/sweetalert2.min.css" >
    <link rel="stylesheet" href="{{asset('/')}}assets/icofont/icofont.css" type="text/css">
    <link rel="stylesheet" href="{{asset('/')}}assets/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="{{asset('/')}}assets/custom/css/hidetable.css">
    <link rel="stylesheet" href="{{asset('/')}}assets/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
    <script src="{{asset('/')}}assets/bower_components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript">const THEMEBASEURL = 'http://company_name.com/'; const CSRFNAME = 'csrf_test_name'; const CSRFHASH = 'd00c4eb7cab0279756bc54fc2ef932cb'; </script>
    <script src="{{asset('/')}}assets/bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="{{asset('/')}}assets/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
    <script src="{{asset('/')}}assets/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
    <script src="{{asset('/')}}assets/pages_js/usertype.js"></script>
    <link rel="stylesheet" href="{{asset('/')}}assets/custom/css/style.css">
    <link rel="stylesheet" href="{{asset('/')}}assets/plugins/toastr/toastr.min.css">
    <link href="https://fonts.googleapis.com/css?family=Play:400,700&subset=cyrillic,cyrillic-ext,greek,latin-ext" rel="stylesheet">
    <style>
        .bg-light {
            background-color: #eae9e9 !important;
        }
    </style>
</head>
<body>
<div id="app" class="wrapper">
</div>
<script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
<script src="{{asset('/')}}assets/bower_components/jquery-ui/jquery-ui.min.js"></script>
<script>
    $.widget.bridge('uibutton', $.ui.button);
</script>

<!-- Bootstrap 3.3.7 -->
<script src="{{asset('/')}}assets/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="{{asset('/')}}assets/bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<script src="{{asset('/')}}assets/bower_components/fastclick/lib/fastclick.js"></script>
<script src="{{asset('/')}}assets/plugins/toastr/toastr.min.js"></script>
<script src="{{asset('/')}}assets/dist/js/adminlte.min.js"></script>
<script type='text/javascript' src="{{asset('/')}}assets/sweetalert/sweetalert2.min.js"></script>
</body>
</html>
