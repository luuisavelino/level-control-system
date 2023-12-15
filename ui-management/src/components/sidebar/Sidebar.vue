<template>
    <div class="w-1/2 md:w-1/3 lg:w-48 fixed md:top-0 md:left-0 h-screen lg:block bg-gray-100 border-r z-30" :class="sideBarOpen ? '' : 'hidden'" id="main-nav">

          <div class="w-full h-20 border-b flex px-4 items-center mb-8">
            <router-link to="/">
              <p class="font-semibold text-3xl text-blue-400 pl-4">IoTlout</p>
            </router-link>
          </div>

          <div class="mb-4 px-4">
            <p class="pl-4 text-sm font-semibold mb-1">HOME</p>
            <SidebarLink to="/dashboard/home" icon="" label="Dashboard"/>
          </div>

          <div class="mb-4 px-4">
            <p class="pl-4 text-sm font-semibold mb-1">SYSTEM</p>
            <SidebarLink to="/systems/dashboard" icon="" label="Systems"/>
            <SidebarLink to="/schemes/dashboard" icon="" label="Schemes"/>
            <SidebarLink to="/controls/dashboard" icon="" label="Controls"/>          
          </div>

          <div class="mb-4 px-4">
            <p class="pl-4 text-sm font-semibold mb-1">CONFIGS</p>
            <SidebarLink to="/configurations/dashboard" icon="" label="Configurations"/>
            <SidebarLink to="/schedules/dashboard" icon="" label="Schedules"/>
            <SidebarLink to="/notifications/dashboard" icon="" label="Notifications"/>
          </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import SidebarLink from './SidebarLink'

export default {
    name: 'Sidebar',
    components: {
        SidebarLink
    },
    computed: {
        ...mapState(['sideBarOpen'])
    }
}
</script>