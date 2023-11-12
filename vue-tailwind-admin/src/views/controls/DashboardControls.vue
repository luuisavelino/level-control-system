<template>
  <div id="home">
          <ModalCreate :modalActive="modalCreateActive" @close-modal="closeModalCreate()"/>

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
                  <router-link :to="'/controls/dashboard'" class="link">
                    <a class="text-gray-600">Controls</a>
                  </router-link>
                </li>
              </ol>
            </nav>

            <button @click="showModalCreate()"
              class="bg-green-500 hover:bg-blue-600 focus:outline-none rounded-lg px-4 py-2 text-white font-semibold shadow">
              Create Control
            </button>
          </div>

   
          <div class="flex flex-wrap -mx-3">
            <ItemsList :listItemsName="'Controls'" :items="controls"></ItemsList>
          </div>

  </div>
</template>

<script>
import ItemsList from '@/components/listItems/ListItems'
import ModalCreate from '@/components/modal/ModalCreate'

export default {
  name: 'DashboardControls',
  components: {
    ItemsList,
    ModalCreate,
  },
  data() {
    return {
      controls: [],
      showOptionsIndex: null,
      modalCreateActive: false,
    }
  },
  beforeMount() {
    this.getControls();
  },
  methods: {
    showModalCreate() {
      this.modalCreateActive = true;
    },
    closeModalCreate() {
      this.modalCreateActive = false;
    },
    getControls() {
      this.controls = [{
        name: 'Control 1',
        description: 'Control 1 description',
        value: 1,
        status: 'success',
      },
      {
        name: 'Control 2',
        description: 'Control 2 description',
        value: 2,
        status: 'warning',
      },
      {
        name: 'Control 3',
        description: 'Control 3 description',
        value: 3,
        status: 'error',
      }]
    },
  },
}
</script>
