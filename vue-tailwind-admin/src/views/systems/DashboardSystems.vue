<template>
  <div id="home">

          <div class="lg:flex justify-between items-center mb-6">
            <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
              <ol class="list-none p-0 inline-flex">
                <li class="flex items-center text-blue-500">
                  <a href="/dashboard" class="text-gray-700">Home</a>
                  <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </li>
                <li class="flex items-center">
                  <a href="/systems/dashboard" class="text-gray-600">Systems</a>
                </li>
              </ol>
            </nav>

            <button 
              class="bg-green-500 hover:bg-blue-600 focus:outline-none rounded-lg px-4 py-2 text-white font-semibold shadow">
              Create System
            </button>
          </div>

          <div class="flex flex-wrap -mx-3 mb-10">

            <div class="w-1/2 xl:w-1/4 px-3">
              <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-4 mb-6 xl:mb-0">
                <!-- TODO: icon -->

                <div class="text-gray-700">
                  <p class="font-semibold text-3xl">{{ systemsTotal }}</p>
                  <p>Total Systems</p>
                </div>

              </div>
            </div>

            <div class="w-1/2 xl:w-1/4 px-3">
              <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-4 mb-6 xl:mb-0">
                <!-- TODO: icon -->

                <div class="text-gray-700">
                  <p class="font-semibold text-3xl">{{ systemsSuccess }}</p>
                  <p>Systems Success</p>
                </div>
              </div>
            </div>

            <div class="w-1/2 xl:w-1/4 px-3">
              <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-4">
                <!-- TODO: icon -->

                <div class="text-gray-700">
                  <p class="font-semibold text-3xl">{{ systemsWarning }}</p>
                  <p>Systems Warning</p>
                </div>
              </div>
            </div>

            <div class="w-1/2 xl:w-1/4 px-3">
              <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-4">
                <!-- TODO: icon -->

                <div class="text-gray-700">
                  <p class="font-semibold text-3xl">{{ systemsError }}</p>
                  <p>Systems Error</p>
                </div>

              </div>
            </div>

          </div>


          <div class="flex flex-wrap -mx-3">
            <div class="w-full xl px-3">

              <p class="text-xl font-semibold mb-6">Systems</p>
              <div class="w-full bg-white border rounded-lg p-4">
                <div v-if="!systems.length" class="text-center text-gray-500 py-4">
                  <p>No systems</p>
                </div>

                <div v-else>
                  <div v-for="(system, index) in systems" :key="index" class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                    <div>
                      <p class="font-semibold text-xl">{{ system.name }}</p>
                      <p>{{ system.description }}</p>
                    </div>
                    <span class="text-green-500 font-semibold text-lg">{{ system.value }}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

  </div>
</template>

<script>

export default {
  name: 'DashboardSystems',
  data() {
    return {
      systems: [],
    }
  },
  beforeMount() {
    this.getSystems();
  },
  computed: {
    systemsTotal() {
      return this.systems.length;
    },
    systemsSuccess() {
      return this.systems.filter(system => system.status === 'success').length;
    },
    systemsWarning() {
      return this.systems.filter(system => system.status === 'warning').length;
    },
    systemsError() {
      return this.systems.filter(system => system.status === 'error').length;
    }
  },
  methods: {
    getSystems() {
      this.systems = [{
        name: 'System 1',
        description: 'System 1 description',
        value: 1,
        status: 'success',
      },
      {
        name: 'System 2',
        description: 'System 2 description',
        value: 2,
        status: 'warning',
      },
      {
        name: 'System 3',
        description: 'System 3 description',
        value: 3,
        status: 'error',
      }]
    }
  }
}
</script>
