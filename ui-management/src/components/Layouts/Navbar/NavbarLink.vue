<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'SidebarLink',
  props: {
    to: { type: String, required: true },
  },
  setup(props) {
    const route = useRoute()
    const isActive = computed(() => route.path === props.to)
    return { isActive }
  }
}
</script>

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <span>
      <slot />
    </span>
  </router-link>

</template>

<style scoped>

.link {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-size: 1em;
  font-weight: 400;
  user-select: none;

  margin: 0.1em 1em;
  padding: 0.5em;
  border-radius: 0.25em;
  height: 1.5em;

  color: white;
  text-decoration: none;
}

.link:hover {
  background-color: var(--navbar-item-hover);
}

.link.active {
  background-color: var(--navbar-item-active);
}

</style>