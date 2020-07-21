
<!DOCTYPE html>

<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{env('COMPANY_NAME') ?: "Company Name"}} | @yield('title')</title>
    <link rel="shortcut icon" href="{{asset('/')}}assets/image/company.jpeg"/>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
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
    @yield('cssBottom')
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
    <!--Header content goes here-->
    @include('elements.common.header')
    <!--Sidebar content goes here-->
    @include('elements.common.sidebar')
    <div class="content-wrapper">
        <!--Main content goes here-->
        @yield('content')
    </div>
</div>

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
@yield('jsBottom')

</body>
</html>
