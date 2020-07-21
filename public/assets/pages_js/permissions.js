  $(function () {
    $('.example1').DataTable({
      'ordering': false
    });
  });

  $(document).on('each', '.mainmodule', function(e){
    "use strict";
    var mainid  = $(this).attr('id');
    var idsplit = mainid.split('_');

    var mainmodule = idsplit[0];
    var usertypeID = idsplit[1];

    var mainidadd    = mainmodule+"_add_"+usertypeID;
    var mainidedit   = mainmodule+"_edit_"+usertypeID;
    var mainiddelete = mainmodule+"_delete_"+usertypeID;
    var mainidview   = mainmodule+"_view_"+usertypeID;

    if (!$('#'+mainid).is(':checked')) {
        $('#'+mainidadd).prop('disabled', true);
        $('#'+mainidadd).prop('checked', false);
    
        $('#'+mainidedit).prop('disabled', true);
        $('#'+mainidedit).prop('checked', false);
    
        $('#'+mainiddelete).prop('disabled', true);
        $('#'+mainiddelete).prop('checked', false);
    
        $('#'+mainidview).prop('disabled', true);
        $('#'+mainidview).prop('checked', false);
      }
  });

  function processCheck(event) {
    var mainid  = $(event).attr('id');
    var idsplit = mainid.split('_');

    var mainmodule = idsplit[0];
    var usertypeID = idsplit[1];

    var mainidadd    = mainmodule+"_add_"+usertypeID;
    var mainidedit   = mainmodule+"_edit_"+usertypeID;
    var mainiddelete = mainmodule+"_delete_"+usertypeID;
    var mainidview   = mainmodule+"_view_"+usertypeID;

      if ($('#'+mainid).is(':checked')) {

        $('#'+mainidadd).prop('disabled', false);
        $('#'+mainidadd).prop('checked', true);

        $('#'+mainidedit).prop('disabled', false);
        $('#'+mainidedit).prop('checked', true);

        $('#'+mainiddelete).prop('disabled', false);
        $('#'+mainiddelete).prop('checked', true);

        $('#'+mainidview).prop('disabled', false);
        $('#'+mainidview).prop('checked', true);

      } else {
          
        $('#'+mainidadd).prop('disabled', true);
        $('#'+mainidadd).prop('checked', false);
    
        $('#'+mainidedit).prop('disabled', true);
        $('#'+mainidedit).prop('checked', false);
    
        $('#'+mainiddelete).prop('disabled', true);
        $('#'+mainiddelete).prop('checked', false);
    
        $('#'+mainidview).prop('disabled', true);
        $('#'+mainidview).prop('checked', false);
      }
  };