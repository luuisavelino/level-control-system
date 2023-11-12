<template>
  <div id="home">

          <div class="lg:flex justify-between items-center mb-6">
            <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
              <ol class="list-none p-0 inline-flex">
                <li class="flex items-center text-blue-500">
                  <router-link :to="'/dashboard/home'" class="link">
                    <a class="text-gray-700">Home</a>
                  </router-link>
                  <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </li>
                <li class="flex items-center">
                  <router-link :to="'/systems/dashboard'" class="link">
                    <a class="text-gray-600">Systems</a>
                  </router-link>
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

            <ItemsList :listItemsName="'Systems'" :items="systems"></ItemsList>


          </div>

  </div>
</template>

<script>
import ItemsList from '@/components/listItems/ListItems'

export default {
  name: 'DashboardSchemes',
  components: {
    ItemsList,
  },
  data() {
    return {
      systems: [],
      showOptionsIndex: null,
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
    },
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
    },
  },
}
</script>
