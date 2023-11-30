<template>
  <div class="grid gap-4 mb-4 grid-cols-2">

            <div class="col-span-2 m-1">
              <label for="name" class="modal-label">Notification Name</label>
              <input 
                :disabled="!canEditModal"
                type="text" name="name" id="name" required=""
                class="modal-input" placeholder="Type notification name" v-model="data.name">
            </div>

            <div class="col-span-2 m-1" >
              <label for="name" class="modal-label">Notification Enabled</label>
              <ToogleSwitch :checked="data.enabled" @toggle-button="toggleEnabled"/>
            </div>

            <div class="col-span-2 m-1">
              <label for="name" class="modal-label">Notification Level</label>
              <select id="level" class="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option 
                  v-for="(item, index) in levelsOptions" :key="index" :value="data.level"
                  :selected="item.key === data.level" class="mr-4">
                  {{ item.value }}
                </option>
              </select>
            </div>

            <div class="col-span-2 m-1">
              <label for="name" class="modal-label">Notification Method</label>

              <div class="modal-checkbox">
                <div v-for="(item, index) in methodsOptions" :key="index" :value="item.key">
                  <input type="checkbox" :id="item.key" class="mr-2" :checked="checked(item.key)">
                  <label class="label">{{ item.value }}</label>
                </div>
              </div>
            </div>

  </div>
</template>

<script>
import ToogleSwitch from '@/components/others/ToogleSwitch.vue'

export default {
  name: 'NotificationsModalBody',
  components: {
    ToogleSwitch
  },
  props: {
    canEditModal: {
      type: Boolean,
      default: false
    },
    data: {
      name: {
        type: String,
        default: ''
      },
      enabled: {
        type: Boolean,
        default: true,
      },
      level: {
        type: String,
        default: 'CRITICAL'
      },
      method: {
        type: Array,
        default: []
      }
    }
  },
  data() {
    return {
      levelsOptions: [
        { key: 'INFO', value: 'Info' },
        { key: 'WARNING', value: 'Warning' },
        { key: 'CRITICAL', value: 'Critical' },
      ],
      methodsOptions: [
        { key: 'EMAIL', value: 'Email' },
        { key: 'SLACK', value: 'Slack' },
        { key: 'DISCORD', value: 'Discord' },
        { key: 'TELEGRAM', value: 'Telegram' },
      ],
    }
  },
  methods: {
    checked(item) {
      return this.data.method.includes(item)
    },
    toggleEnabled(value) {
      this.data.enabled = value
      console.log(this.data.enabled)
    },
  }
}
</script>
