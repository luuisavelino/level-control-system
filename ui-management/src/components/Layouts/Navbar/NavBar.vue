<template>
  <nav class="navbar">

    <div class="navbar-left">
      <h1>
        IoTloud
      </h1>
    </div>

    <div class="navbar-center">
      <NavbarLink to="/">Home</NavbarLink>
      <NavbarLink to="/dashboard">Dashboard</NavbarLink>
      <NavbarLink to="/systems">Systems</NavbarLink>
    </div>

    <div class="navbar-right">
      <span class="user-icon">
        <i class="fa-solid fa-user"></i>
      </span>
    </div>

</nav>
</template>

<script>
import NavbarLink from './NavbarLink.vue'
import { toggleSidebar } from '../Sidebar/state'

export default {
  name: 'NavBar',
  components: {
    NavbarLink
  },
  setup() {
    return { toggleSidebar }
  },
  data () {
    return {}
  }
}
</script>

<style>
:root {
  --navbar-bg-color: #2f855a;
  --navbar-item-hover: #38a169;
  --navbar-item-active: #276749;
}
</style>

<style>

.navbar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: top;
  position: absolute;
  z-index: 1;
  height: 2.5em;
  top: 0px;
  left: 55px;
  right: 0px;
  padding: 0.5em;

  display: flex;
  align-items: center;
  /* flex-direction: row; */
  justify-content: center;
}

.navbar-left {
  flex: 1;
}

.navbar-center {
  flex: 2;
  display: flex;
  justify-content: center;
}

.navbar-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 10em;
}

.navbar h1 {
  color: #123;
  font-size: 1.8em;
}

.user-icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  background-color: var(--navbar-item-hover);
}

</style>
