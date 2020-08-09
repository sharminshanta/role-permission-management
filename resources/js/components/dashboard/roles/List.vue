<template>
    <div>
        <app-header></app-header>
        <app-sidebar></app-sidebar>
        <div class="content-wrapper">
            <!-- Breadcrumb -->
            <section class="content-header">
                <h1>User Role</h1>
                <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-laptop"></i></a></li>
                    <li>User Role</li>
                </ol>
            </section>
            <!-- Main Content -->
            <section class="content">
                <div class="box box-solid">
                    <div class="box-header header-custom">
                        <h5 class="box-title"><i class="fa fa-list"></i> List</h5>
                        <div class="box-tools pull-right">
                            <button @click="addRoleModal" title='Add User Role' class='btn btn-inline btn-custom btn-md'>
                                <i class='fa fa-plus'></i>&nbsp;Add User Role
                            </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div id="hide-table">
                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="role in roles" :key="role.id">
                                    <td>{{ role.uuid }}</td>
                                    <td>{{ role.name }}</td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <a @click="updateRoleModal" title='Update User Role'>
                                                <i class="fa fa-edit"></i>
                                            </a>
                                            <!--<router-link :to="'/role/edit/'+ role.slug" class="text-primary"><i class="fa fa-edit"></i></router-link>-->
                                            <a href="" @click.prevent="deleteRole(role.id)" class="text-danger"><i class="fa fa-trash"></i></a>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <div class="modal fade" id="addUserRole" tabindex="-1">
                <div class="modal-dialog modal-sm">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title"><span><i class="fa fa-user-plus"></i></span>&nbsp;Add</h4>
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
            <div class="modal fade" id="updateUserRole" tabindex="-1">
                <div class="modal-dialog modal-sm">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title"><span><i class="fa fa-edit"></i></span>&nbsp;Update</h4>
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
        </div>
    </div>
</template>
<script>
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
export default {
    components:{
        'app-header': Header,
        'app-sidebar': Sidebar
    },
    mounted() {
        console.log('Component mounted.')
    },

    data() {
        return {
            roles: []
        }
    },
    created() {
        this.axios
            .get('http://localhost:8000/api/roles')
            .then(response => {
                this.roles = response.data;
            });
    },
    methods: {
        addRoleModal() {
            $('#addUserRole').modal('show');
        },
        updateRoleModal() {
            $('#updateUserRole').modal('show');
        },
        deleteRole(id) {
            this.axios
                .delete(`http://localhost:8000/api/roles/delete/${id}`)
                .then(response => {
                    let i = this.roles.map(item => item.id).indexOf(id); // find index of your object
                    this.roles.splice(i, 1)
                });
        }
    }
}
</script>

