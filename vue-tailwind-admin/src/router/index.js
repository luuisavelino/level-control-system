import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: {
        name: "DashboardHome",
      },
    },
    {
      path: "/login",
      component: () => import("@/views/auth/LoginPage"),
    },
    {
      path: "/users",
      component: Dashboard,
      children: [
        {
          path: "/",
          redirect: {
            name: "DashboardUsers",
          },
        },
        {
          path: "dashboard",
          name: "DashboardUsers",
          component: null,
        },
      ],
    },
    {
      path: "preferences",
      component: Dashboard,
      children: [
        {
          path: "/",
          redirect: {
            name: "DashboardPreferences",
          },
        },
        {
          path: "dashboard",
          name: "DashboardPreferences",
          component: null,
        },
      ],
    },
    {
      path: "/dashboard",
      component: Dashboard,
      children: [
        {
          path: "/",
          redirect: {
            name: "DashboardHome",
          },
        },
        {
          path: "home",
          name: "DashboardHome",
          component: () => import("@/views/home/DashboardHome"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/systems",
      component: Dashboard,
      children: [
        {
          path: "/",
          redirect: {
            name: "DashboardSystems",
          },
        },
        {
          path: "dashboard",
          name: "DashboardSystems",
          component: () => import("@/views/systems/DashboardSystems"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/controls",
      component: Dashboard,
      children: [
        {
          path: "/",
          redirect: {
            name: "DashboardControls",
          },
        },
        {
          path: "dashboard",
          name: "DashboardControls",
          component: () => import("@/views/controls/DashboardControls"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/schemes",
      component: Dashboard,
      children: [
        {
          path: "/",
          redirect: {
            name: "DashboardSchemes",
          },
        },
        {
          path: "dashboard",
          name: "DashboardSchemes",
          component: () => import("@/views/schemes/DashboardSchemes"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/configurations",
      component: Dashboard,
      children: [
        {
          path: "/",
          redirect: {
            name: "DashboardConfigurations",
          },
        },
        {
          path: "dashboard",
          name: "DashboardConfigurations",
          component: () =>
            import("@/views/configurations/DashboardConfigurations"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/notifications",
      component: Dashboard,
      children: [
        {
          path: "/",
          redirect: {
            name: "DashboardNotifications",
          },
        },
        {
          path: "dashboard",
          name: "DashboardNotifications",
          component: () =>
            import("@/views/notifications/DashboardNotifications"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/schedules",
      component: Dashboard,
      children: [
        {
          path: "/",
          redirect: {
            name: "DashboardSchedules",
          },
        },
        {
          path: "dashboard",
          name: "DashboardSchedules",
          component: () => import("@/views/schedules/DashboardSchedules"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log('to', to);
  
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      next();
    } else {
      // next('/login');
      next();
    }
  } else {
    next();
  }
});


export default router
