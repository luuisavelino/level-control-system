import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import DashboardHome from '@/views/DashboardHome'
import DashboardSystems from '@/views/systems/DashboardSystems'

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
        component: DashboardHome 
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
        component: DashboardSystems
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
        component: null
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
        component: null
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
        component: null
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
        component: null
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
        component: null
      }
    ]
  },
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
