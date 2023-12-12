<template>
  <div class="grid gap-4 mb-4 grid-cols-2">

            <div class="col-span-2">
              <label for="name" class="modal-label">Configuration Name</label>
              <input 
                :disabled="!canEditModal"
                type="text" name="name" id="name" required=""
                class="modal-input" placeholder="Type configuration name" v-model="data.name">
            </div>

            <div class="col-span-2 m-1">
              <label for="level" class="modal-label">Select Schedules</label>
              <select id="level" class="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              @change="setSchedule(data.scheduleUuid)">
                <option 
                  v-for="(item, index) in data.schedules" :key="index"
                  :selected="index === data.scheduleUuid" class="mr-4">
                  {{ item }}
                </option>
              </select>
            </div>

            <div class="col-span-2 m-1">
              <label for="notification" class="modal-label">Select Notification</label>
              <select id="notification" class="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              @change="setNotification('aaaaa' + index)">
                <option 
                  v-for="(item, index) in data.notifications" :key="index"
                  :selected="index === data.notificationUuid" class="mr-4">
                  {{ item }}
                </option>
              </select>
            </div>
  </div>
</template>

<script>

export default {
  name: 'ConfigurationsModalBody',
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
      notificationUuid: {
        type: String,
        default: ''
      },
      scheduleUuid: {
        type: String,
        default: ''
      },
      notifications: {
        type: Object,
        default: {}
      },
      schedules: {
        type: Object,
        default: {}
      }
    }
  },
  methods: {
    setNotification(notificationUuid) {
      console.log(notificationUuid)
    },
    setSchedule(schedulesUuid) {
      console.log(schedulesUuid)
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>