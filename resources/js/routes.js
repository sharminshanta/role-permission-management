import DashboardView from './components/dashboard/Home';
import RoleManage from './components/dashboard/roles/List';

export const routes = [
    {
        /**
         * Landing Page Portion
         */
        name: 'login',
        path: '/',
        component: DashboardView
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
