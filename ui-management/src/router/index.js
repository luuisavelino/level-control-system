import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: {
        name: "HomeDashboard",
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
            name: "UsersDashboard",
          },
        },
        {
          path: "dashboard",
          name: "UsersDashboard",
          component: () => import("@/views/users/UsersDashboard"),
          meta: {
            requiresAuth: true,
          },
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
            name: "PreferencesDashboard",
          },
        },
        {
          path: "dashboard",
          name: "PreferencesDashboard",
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
            name: "HomeDashboard",
          },
        },
        {
          path: "home",
          name: "HomeDashboard",
          component: () => import("@/views/home/HomeDashboard"),
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
            name: "SystemsDashboard",
          },
        },
        {
          path: "dashboard",
          name: "SystemsDashboard",
          component: () => import("@/views/systems/SystemsDashboard"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "charts",
          name: "SystemsCharts",
          component: () => import("@/views/systems/SystemsCharts"),
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
            name: "ControlsDashboard",
          },
        },
        {
          path: "dashboard",
          name: "ControlsDashboard",
          component: () => import("@/views/controls/ControlsDashboard"),
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
            name: "SchemesDashboard",
          },
        },
        {
          path: "dashboard",
          name: "SchemesDashboard",
          component: () => import("@/views/schemes/SchemesDashboard"),
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
            name: "ConfigurationsDashboard",
          },
        },
        {
          path: "dashboard",
          name: "ConfigurationsDashboard",
          component: () =>
            import("@/views/configurations/ConfigurationsDashboard"),
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
            name: "NotificationsDashboard",
          },
        },
        {
          path: "dashboard",
          name: "NotificationsDashboard",
          component: () =>
            import("@/views/notifications/NotificationsDashboard"),
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
            name: "SchedulesDashboard",
          },
        },
        {
          path: "dashboard",
          name: "SchedulesDashboard",
          component: () => import("@/views/schedules/SchedulesDashboard"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});


export default router
