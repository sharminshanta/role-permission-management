<aside class="main-sidebar">
    <section class="sidebar">
        <div class="user-panel">
            <div class="pull-left image">
                <img src="{{asset('/')}}assets/image/default.png" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
                <p>Company Name</p>
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>

        <ul class="sidebar-menu" data-widget="tree">
            <!-- <li class="header"></li> -->
            <li class=" ">
                <a href="{{url('/')}}">
                    <i class="fa fa-dashboard"></i> <span>Dashboard</span>
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
                    <li class=""><a href="{{url('/roles')}}"><i class="fa fa-circle-o"></i>User Role</a></li>
                    <li class=""><a href="{{url('/permissions')}}"><i class="fa fa-circle-o"></i>Permissions</a></li>
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
                    <li class=""><a href="{{url('/settings')}}"><i class="fa fa-circle-o"></i>Company Profile</a></li>
                    <li class=""><a href="{{url('/users')}}"><i class="fa fa-circle-o"></i>Users</a></li>
                </ul>
            </li>
        </ul>
    </section>
</aside>
