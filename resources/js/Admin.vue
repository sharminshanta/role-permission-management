<template>
    <div>
        <header class="main-header">
            <!--style="background-color: #3c8dbc"-->
            <div class="logo">
                <span class="logo-mini"><img class="img-responsive" :src="'assets/image/company.jpeg'"></span>
                <span class="logo-lg"><b><router-link to="/dashboard">Company Name</router-link></b></span>
                <!--style="color: white"-->
            </div>
            <nav class="navbar navbar-static-top">
                <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                    <span class="sr-only">Toggle navigation</span>
                </a>

                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img :src="'assets/image/default.png'" class="user-image" alt="Image">
                                <span class="hidden-xs">Hi, Username</span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="user-header">
                                    <img :src="'assets/image/default.png'" class="img-circle" alt="Image">
                                    <p>
                                        Company - Admin <small> Member since Jan. 2020</small>
                                    </p>
                                </li>
                                <li class="user-footer">
                                    <div class="pull-left">
                                        <a href="#" class="btn btn-default btn-flat">Profile</a>
                                    </div>
                                    <div class="pull-right">
                                        <a href="#" class="btn btn-default btn-flat">Sign out</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <aside class="main-sidebar"> <!--style="background-color: #1F2D29;"-->
            <section class="sidebar">
                <div class="user-panel">
                    <div class="pull-left image">
                        <img :src="'assets/image/default.png'" class="img-circle" alt="User Image">
                    </div>
                    <div class="pull-left info">
                        <p>Company Name</p>
                        <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                    </div>
                </div>

                <ul class="sidebar-menu" data-widget="tree">
                    <!-- <li class="header"></li> -->
                    <li class=" ">
                        <a href="#">
                            <i class="fa fa-dashboard"></i> <router-link to="/dashboard">Dashboard</router-link>
                        </a>
                    </li>
                    <li class="treeview ">
                        <a href="#">
                            <i class="fa fa-paw"></i> <span>Permissions</span>
                            <span class="pull-right-container">
                              <i class="fa fa-angle-left pull-right"></i>
                          </span>
                        </a>
                        <ul class="treeview-menu" style="display: none">
                            <li class=""><a href="#"><i class="fa fa-circle-o"></i><router-link to="/roles">User Role</router-link></a></li>
                            <li class=""><a href="#"><i class="fa fa-circle-o"></i>Permissions</a></li>
                        </ul>
                    </li>
                    <li class="treeview ">
                        <a href="#">
                            <i class="fa fa-cog"></i> <span>Settings</span>
                            <span class="pull-right-container">
                              <i class="fa fa-angle-left pull-right"></i>
                          </span>
                        </a>
                        <ul class="treeview-menu" style="display: none">
                            <li class=""><a href="#"><i class="fa fa-circle-o"></i>Company Profile</a></li>
                            <li class=""><a href="#"><i class="fa fa-circle-o"></i>Users</a></li>
                        </ul>
                    </li>
                </ul>
            </section>
        </aside>
        <div class="content-wrapper">
            <router-view></router-view>
        </div>
        <footer class="main-footer">
            <strong>Powered by <a target="_blank" href="#">Company Name</a>.</strong>
        </footer>
        <div class="control-sidebar-bg"></div>
    </div>
</template>
<script>
export default {}
</script>
