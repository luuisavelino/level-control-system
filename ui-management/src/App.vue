<template>

  <NavBar />
  <SideBar />

  <div :style="{ 'margin-left': sidebarWidth }" />

</template>

<script setup>
import NavBar from '@/components/Layouts/Navbar/NavBar.vue'
import SideBar from '@/components/Layouts/Sidebar/SideBar.vue'
import { sidebarWidth } from '@/components/Layouts/Sidebar/state'
</script>
