<template>
    <div class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-gray-100 border-r z-30" :class="sideBarOpen ? '' : 'hidden'" id="main-nav">

          <div class="w-full h-20 border-b flex px-4 items-center mb-8">
            <p class="font-semibold text-3xl text-blue-400 pl-4">IoTlout</p>
          </div>

          <div class="mb-4 px-4">
            <p class="pl-4 text-sm font-semibold mb-1">MAIN</p>
            <SidebarLink to="/" icon="" label="Dashboard"/>
            <SidebarLink to="/systems" icon="" label="System"/>
            <SidebarLink to="/systems" icon="" label="System"/>
          </div>

          <div class="mb-4 px-4">
            <p class="pl-4 text-sm font-semibold mb-1">PRODUCTS</p>
            <SidebarLink to="/systems" icon="" label="System"/>
            <SidebarLink to="/systems" icon="" label="System"/>
            <SidebarLink to="/systems" icon="" label="System"/>          
          </div>

          <div class="mb-4 px-4">
            <i class="bi-alarm"></i>
            <i class="bi-alarm"></i>
            <i class="bi-alarm"></i>
            <i class="bi-alarm"></i>


            <p class="pl-4 text-sm font-semibold mb-1">MISC</p>
            <SidebarLink to="/systems" icon="" label="System"/>
            <SidebarLink to="/systems" icon="" label="System"/>
            <SidebarLink to="/systems" icon="" label="System"/>
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