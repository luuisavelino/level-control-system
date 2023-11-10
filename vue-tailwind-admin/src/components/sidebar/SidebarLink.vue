<script>
export default {
  name: 'SidebarLink',
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
    label: { type: String, required: true }
  },
}
</script>

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">

            <div class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
              <i :class="icon" class="text-xl"></i>
              <span class="text-gray-700">{{ label }}</span>
            </div>

  </router-link>
</template>
