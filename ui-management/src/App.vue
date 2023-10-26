<template>
  <!-- <AppHeader /> -->

  <SideBar />
  <div :style="{ 'margin-left': sidebarWidth }">

  </div>
  <!-- <RouterView /> -->
  
  <!-- <AppFooter /> -->
</template>

<script setup>
// import { RouterView } from 'vue-router'
// import AppHeader from '@/components/AppLayouts/AppHeader.vue'
// import AppFooter from '@/components/AppLayouts/AppFooter.vue'
import SideBar from '@/components/AppLayouts/SideBar/SideBar.vue'
import { sidebarWidth } from '@/components/AppLayouts/SideBar/state'

</script>