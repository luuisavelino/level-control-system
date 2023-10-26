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

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>S</div>
        <div>C</div>
      </span>
      <span v-else>System Control</span>
    </h1>

    <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
    <SidebarLink to="/dashboard" icon="fas fa-columns">Dashboard</SidebarLink>
    <SidebarLink to="/systems" icon="fas fa-chart-bar">Systems</SidebarLink>
    <SidebarLink to="/controls" icon="fas fa-chart-bar">Controls</SidebarLink>
    <SidebarLink to="/schemes" icon="fas fa-chart-bar">Schemes</SidebarLink>
    <SidebarLink to="/configurations" icon="fas fa-chart-bar">Configurations</SidebarLink>
    <SidebarLink to="/notifications" icon="fas fa-chart-bar">Notifications</SidebarLink>
    <SidebarLink to="/schedules" icon="fas fa-chart-bar">Schedules</SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar">
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

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
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
