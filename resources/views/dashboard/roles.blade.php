@extends('layouts.application')
@section('title')User Role @endsection
@section('content')
    <section class="content-header">
        <h1>User Role</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-laptop"></i></a></li>
            <li>User Role</li>
        </ol>
    </section>
    <section class="content">
        <div class="box box-solid">
            <div class="box-header header-custom">
                <h5 class="box-title"><i class="fa fa-list"></i> List</h5>
                <div class="box-tools pull-right">
                    <button id='Add User Role' data-toggle='modal' data-target='#insert' title='Insert' class='btn btn-inline btn-custom btn-md'><i class='fa fa-plus'></i>&nbsp;Add User Role</button>        </div>
            </div>
            <div class="box-body">
                <div id="hide-table">
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>User Role</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody >
                        <tr>
                            <td data-title="#">1</td>
                            <td data-title="User Role">Sales</td>
                            <td data-title="Action">
                                <button id='16' data-toggle='modal' data-target='#update' title='Update' class='btn btn-info btn-xs update'><i class='fa fa-edit'></i></button>&nbsp;
                                <button id='16' class='btn btn-danger btn-xs delete'>&nbsp;<i class='fa fa-trash'></i></button>                </td>
                        </tr>
                        <tr>
                            <td data-title="#">2</td>
                            <td data-title="User Role">Bill</td>
                            <td data-title="Action">
                                <button id='24' data-toggle='modal' data-target='#update' title='Update' class='btn btn-info btn-xs update'><i class='fa fa-edit'></i></button>&nbsp;
                                <button id='24' class='btn btn-danger btn-xs delete'>&nbsp;<i class='fa fa-trash'></i></button>                </td>
                        </tr>
                        <tr>
                            <td data-title="#">3</td>
                            <td data-title="User Role">Ekhtiar Hassan</td>
                            <td data-title="Action">
                                <button id='26' data-toggle='modal' data-target='#update' title='Update' class='btn btn-info btn-xs update'><i class='fa fa-edit'></i></button>&nbsp;
                                <button id='26' class='btn btn-danger btn-xs delete'>&nbsp;<i class='fa fa-trash'></i></button>                </td>
                        </tr>
                        <tr>
                            <td data-title="#">4</td>
                            <td data-title="User Role">Test</td>
                            <td data-title="Action">
                                <button id='27' data-toggle='modal' data-target='#update' title='Update' class='btn btn-info btn-xs update'><i class='fa fa-edit'></i></button>&nbsp;
                                <button id='27' class='btn btn-danger btn-xs delete'>&nbsp;<i class='fa fa-trash'></i></button>                </td>
                        </tr>
                        <tr>
                            <td data-title="#">5</td>
                            <td data-title="User Role">Gopi Lk</td>
                            <td data-title="Action">
                                <button id='28' data-toggle='modal' data-target='#update' title='Update' class='btn btn-info btn-xs update'><i class='fa fa-edit'></i></button>&nbsp;
                                <button id='28' class='btn btn-danger btn-xs delete'>&nbsp;<i class='fa fa-trash'></i></button>                </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <div class="modal fade" id="insert" tabindex="-1">
        <div class="modal-dialog modal-sm">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"><i class="fa fa-user-plus"></i></span>&nbsp;Add</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group error-name">
                        <label>Name <span class='text-danger'>*</span></label>
                        <input type="text" class="form-control" name="usertype" id="usertype" placeholder="Name"/>
                        <span class="text-red" id="error_usertype_name"></span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-default insert">Save</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="update" tabindex="-1">
        <div class="modal-dialog modal-sm">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"><i class="fa fa-edit"></i></span>&nbsp;Update</h4>
                </div>
                <div class="modal-body">
                    <div class="">
                        <input type="hidden" class="form-control" name="usertypeID" id="usertypeID" readonly/>
                        <div class="form-group error-name-up">
                            <label>Name <span class='text-danger'>*</span></label>
                            <input type="text" class="form-control" name="usertype_up" id="usertype_up" placeholder="Name"/>
                            <span class="text-red" id="error_usertype_up"></span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-info updated">Update</button>
                </div>
            </div>
        </div>
    </div>
@endsection
