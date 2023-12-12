<template>
  <div class="grid gap-4 mb-4 grid-cols-2">

            <div class="col-span-2">
              <label for="name" class="modal-label">Schedule Name</label>
              <input 
                :disabled="!canEditModal"
                type="text" name="name" id="name" required=""
                class="modal-input" placeholder="Type schedule name" :v-model="data.name">
            </div>

            <div class="col-span-2">
              <label for="startTime" class="modal-label">Start Time</label>
              <input
                :disabled="!canEditModal"
                type="datetime-local" name="startTime" id="startTime" required=""
                class="modal-input" :v-model="data.startTime">
            </div>

            <div class="col-span-2">
              <label for="endTime" class="modal-label">End Time</label>
              <input
                :disabled="!canEditModal"
                type="datetime-local" name="endTime" id="endTime" required=""
                class="modal-input"
                :v-model="dataaaa">
            
            </div>

  </div>
</template>

<script>

export default {
  name: 'SchedulesModalBody',
  computed: {
    dataaaa() {
      return this.data.endTime
    } 
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
      startTime: {
        type: Date,
        default: ''
      },
      endTime: {
        type: Date,
        default: () => Date.now()
      },
    }
  },
}
</script>