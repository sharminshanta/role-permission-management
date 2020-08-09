<template>
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
</template>
