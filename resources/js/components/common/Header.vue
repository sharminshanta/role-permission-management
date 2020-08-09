<template>
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
</template>
