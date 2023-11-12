import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'

const routes = [
  { 
    path: '/',
    redirect: { 
      name: 'DashboardHome' 
    } 
  },
  {
    path: '/users',
    component: Dashboard,
    children: [
      {
        path: '/',
        redirect: {
          name: 'DashboardUsers'
        }
      },
      {
        path: 'dashboard',
        name: 'DashboardUsers',
        component: null
      }
    ]
  },
  {
    path: 'preferences',
    component: Dashboard,
    children: [
      {
        path: '/',
        redirect: {
          name: 'DashboardPreferences'
        }
      },
      {
        path: 'dashboard',
        name: 'DashboardPreferences',
        component: null
      }
    ]
  },
  { 
    path: '/dashboard', 
    component: Dashboard, 
    children: [
      { 
        path: '/', 
        redirect: { 
          name: 'DashboardHome' 
        }
      },
      { 
        path: 'home', 
        name: 'DashboardHome', 
        component: () => import('@/views/DashboardHome') 
      }
    ]
  },
  {
    path: '/systems',
    component: Dashboard,
    children: [
      {
        path: '/',
        redirect: {
          name: 'DashboardSystems'
        }
      },
      {
        path: 'dashboard',
        name: 'DashboardSystems',
        component: () => import('@/views/systems/DashboardSystems')
      }
    ]
  },
  {
    path: '/controls',
    component: Dashboard,
    children: [
      {
        path: '/',
        redirect: {
          name: 'DashboardControls'
        }
      },
      {
        path: 'dashboard',
        name: 'DashboardControls',
        component: () => import('@/views/controls/DashboardControls')
      }
    ]
  },
  {
    path: '/schemes',
    component: Dashboard,
    children: [
      {
        path: '/',
        redirect: {
          name: 'DashboardSchemes'
        }
      },
      {
        path: 'dashboard',
        name: 'DashboardSchemes',
        component: () => import('@/views/schemes/DashboardSchemes')
      }
    ]
  
  },
  {
    path: '/configurations',
    component: Dashboard,
    children: [
      {
        path: '/',
        redirect: {
          name: 'DashboardConfigurations'
        }
      },
      {
        path: 'dashboard',
        name: 'DashboardConfigurations',
        component: () => import('@/views/configurations/DashboardConfigurations')
      }
    ]
  },
  {
    path: '/notifications',
    component: Dashboard,
    children: [
      {
        path: '/',
        redirect: {
          name: 'DashboardNotifications'
        }
      },
      {
        path: 'dashboard',
        name: 'DashboardNotifications',
        component: () => import('@/views/notifications/DashboardNotifications')
      }
    ]
  },
  {
    path: '/schedules',
    component: Dashboard,
    children: [
      {
        path: '/',
        redirect: {
          name: 'DashboardSchedules'
        }
      },
      {
        path: 'dashboard',
        name: 'DashboardSchedules',
        component: () => import('@/views/schedules/DashboardSchedules')
      }
    ]
  },
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
