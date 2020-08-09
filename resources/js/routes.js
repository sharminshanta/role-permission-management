import DashboardView from './components/dashboard/Home';
import RoleManage from './components/dashboard/roles/List';
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
        name: 'AllRoles',
        path: '/roles',
        component: RoleManage,
    },
];
