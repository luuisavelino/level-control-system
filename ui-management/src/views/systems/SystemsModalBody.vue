<template>
  <div class="grid gap-4 mb-4 grid-cols-2">

            <div class="col-span-2">
              <label for="name" class="modal-label">System Name</label>
              <input 
                :disabled="!canEditModal"
                type="text" name="name" id="name" required=""
                class="modal-input" placeholder="Type system name" v-model="data.name">
            </div>

            <div class="col-span-2">
              <label for="path" class="modal-label">System Path</label>
              <input 
                :disabled="!canEditModal"
                type="text" name="path" id="path" required=""
                class="modal-input" placeholder="Type system path" v-model="data.path">
            </div>

            <div class="col-span-2" >
              <label for="enabled" class="modal-label">Notification Enabled</label>
              <ToogleSwitch id="enabled" :disabled="!canEditModal" :checked="data.enabled" @toggle-button="toggleEnabled"/>
            </div>

            <div class="col-span-2">
              <label for="control" class="modal-label">Select Control</label>
              <select id="control" :disabled="!canEditModal" v-model="data.controlUuid"
              class="px-2 bg-gray-20 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option 
                  v-for="(item, index) in controls" :key="index"
                  class="mr-4" :value="index">
                  {{ item }}
                </option>
              </select>
            </div>

            <div class="col-span-2">
              <label for="scheme" class="modal-label">Select Scheme</label>
              <select id="scheme" :disabled="!canEditModal" v-model="data.schemeUuid"
              class="px-2 bg-gray-20 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option 
                  v-for="(item, index) in schemes" :key="index"
                  class="mr-4" :value="index">
                  {{ item }}
                </option>
              </select>
            </div>

            <div class="col-span-2">
              <label for="configuration" class="modal-label">Select Configuration</label>
              <select id="configuration" :disabled="!canEditModal" v-model="data.configurationUuid"
              class="px-2 bg-gray-20 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option 
                  v-for="(item, index) in configurations" :key="index"
                  class="mr-4" :value="index">
                  {{ item }}
                </option>
              </select>
            </div>

            <div class="col-span-2">
              <label for="description" class="modal-label">System Description</label>
              <textarea 
                :disabled="!canEditModal" v-model="data.description"
                id="description" rows="4" class="modal-input" 
                placeholder="Write scheme description here">
              </textarea>                    
            </div>
  </div>
</template>

<script>
import ToogleSwitch from '@/components/others/ToogleSwitch.vue'

export default {
  name: 'SystemsModalBody',
  components: {
    ToogleSwitch
  },
  props: {
    canEditModal: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Object,
      default: null,
    },
    schemes: {
      type: Object,
      default: null,
    },
    configurations: {
      type: Object,
      default: null,
    },
    data: {
      type: Object,
      name: {
        type: String,
        default: ''
      },
      path: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      enabled: {
        type: Boolean,
        default: false
      },
      controlUuid: {
        type: String,
        default: ''
      },
      schemeUuid: {
        type: String,
        default: ''
      },
      configurationUuid: {
        type: String,
        default: ''
      },
    },

  },
  methods: {
    toggleEnabled(value) {
      this.data.enabled = value
    },
  }
}
</script>
