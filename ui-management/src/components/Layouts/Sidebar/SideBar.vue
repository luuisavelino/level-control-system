<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">

    <h1>
      <span @click="toggleSidebar">
        <i class="fa-solid fa-bars fa-xs" style="var(--sidebar-item-active);"/>
      </span>
      <span v-if="!collapsed">
        IoTloud
      </span>
    </h1>

    <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
    <SidebarLink to="/dashboard" icon="fas fa-columns">Dashboard</SidebarLink>
    <SidebarLink to="/systems" icon="fa-solid fa-list-ul">Systems</SidebarLink>
    <SidebarLink to="/controls" icon="fa-solid fa-gears">Controls</SidebarLink>
    <SidebarLink to="/schemes" icon="fa-solid fa-shapes">Schemes</SidebarLink>
    <SidebarLink to="/configurations" icon="fa-solid fa-gear">Configurations</SidebarLink>
    <SidebarLink to="/notifications" icon="fa-solid fa-bell">Notifications</SidebarLink>
    <SidebarLink to="/schedules" icon="fa-solid fa-calendar-days">Schedules</SidebarLink>
  
  </div>
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import { collapsed, toggleSidebar, sidebarWidth } from './state'

export default {
  name: 'SideBar',
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  color: #123;
  font-size: 1.8em;

  height: 2.5em;
  margin: 0.5em;
}

</style>
