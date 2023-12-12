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
              <label for="level" class="modal-label">Notification Schedules</label>
              <select id="level" class="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="data.scheduleUuid">
                <option 
                  v-for="(item, index) in schedules" :key="index"
                  class="mr-4" :value="index">
                  {{ item }}
                </option>
              </select>
            </div>

            <div class="col-span-2 m-1">
              <label for="notification" class="modal-label">Select Notification</label>
              <select id="notification" class="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
              focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="data.notificationUuid">
                <option 
                  v-for="(item, index) in notifications" :key="index"
                  class="mr-4" :value="index">
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
    notifications: {
      type: Object,
      default: null,
    },
    schedules: {
      type: Object,
      default: null,
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
    }
  },
}
</script>
