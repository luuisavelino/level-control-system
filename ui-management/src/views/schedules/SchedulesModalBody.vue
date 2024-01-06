<template>
  <div class="grid gap-4 mb-4 grid-cols-2">

            <div class="col-span-2">
              <label for="name" class="modal-label">Schedule Name</label>
              <input 
                :disabled="!canEditModal"
                type="text" name="name" id="name" required=""
                class="modal-input" placeholder="Type schedule name" v-model="data.name">
            </div>

            <div class="col-span-2">
              <label for="startTime" class="modal-label">Start Time</label>
              <input
                :disabled="!canEditModal"
                type="datetime-local" name="startTime" id="startTime" :required="false"
                class="modal-input" v-model="nulla">
              <input :disabled="!canEditModal" type="checkbox" class="mr-2">
              <label class="py-1 align-center">Enable start time</label>
            </div>

            <div class="col-span-2">
              <label for="endTime" class="modal-label">End Time</label>
              <input
                :disabled="!canEditModal"
                type="datetime-local" name="endTime" id="endTime" :required="false"
                class="modal-input" v-model="data.endTime">
                <div id="method" class="modal-checkbox">
              <input :disabled="!canEditModal" type="checkbox" class="mr-2">
              <label class="py-1 align-center">Enable stop time</label>
              </div>
            </div>
  </div>
</template>

<script>

export default {
  name: 'SchedulesModalBody',
  computated: {
    nulla() {
      return null
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
