import DashboardView from './components/dashboard/Home';
import RoleManage from './components/dashboard/roles/List';
import AddRole from './components/dashboard/roles/Add';
import LoginView from './components/LoginTemplate';

export const routes = [
    {
        /**
         * Landing Page Portion
         */
        name: 'login',
        path: '/',
        component: LoginView
    },
    {
        /**
         * Landing Page Portion
         */
        name: 'login',
        path: '/login',
        component: LoginView
    },
    {
        /**
         * Landing Page Portion
         */
        name: 'dashboard',
        path: '/dashboard',
        component: DashboardView,
    },
    {
        /**
         * Roles
         */
        name: 'role-home',
        path: '/roles',
        component: RoleManage,
    },
    {
        name: 'role-add',
        path: '/role/add',
        component: AddRole
    },
];
