<template>
  <div class="grid gap-4 mb-4 grid-cols-2">

            <div class="col-span-2">
              <label for="name" class="modal-label">Control Name</label>
              <input 
                :disabled="!canEditModal"
                type="text" name="name" id="name" required=""
                class="modal-input" placeholder="Type control name" v-model="data.name">
            </div>

            <div class="col-span-2 m-1">
              <label for="controlType" class="modal-label">Control Type</label>
              <select id="controlType" :disabled="!canEditModal" v-model="data.controlType"
              class="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option 
                  v-for="(item, index) in typesOptions" :key="index"
                  class="mr-4" :value="item.key">
                  {{ item.value }}
                </option>
              </select>
            </div>

            <div class="col-span-2 sm:col-span-1">
              <label for="kp" class="modal-label">KP Gain</label>
              <input
                :disabled="!canEditModal"
                type="number" name="kp" id="kp" required=""
                class="modal-input" placeholder="5 (cm)" v-model="data.kp">
            </div>

            <div class="col-span-2 sm:col-span-1">
              <label for="ki" class="modal-label">KI Gain</label>
              <input
                :disabled="!canEditModal"
                type="number" name="ki" id="ki" required=""
                class="modal-input" placeholder="30 (cm)" v-model="data.ki">
            </div>

            <div class="col-span-2">
              <label for="kd" class="modal-label">Kd Gain</label>
              <input
                :disabled="!canEditModal" 
                type="number" name="kd" id="kd" required="" 
                class="modal-input" placeholder="20 (cm)" v-model="data.kd">
            </div>

            <div class="col-span-2">
              <label for="description" class="modal-label">Control Description</label>
              <textarea 
                :disabled="!canEditModal"
                id="description" rows="4" class="modal-input" 
                placeholder="Write control description here" v-model="data.description">
              </textarea>                    
            </div>

  </div>
</template>

<script>

export default {
  name: 'ControlsModalBody',
  data() {
    return {
      typesOptions: [
        { key: 'PI', value: 'PI' },
        { key: 'PD', value: 'PD' },
        { key: 'PID', value: 'PID' },
      ],
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
        default: '',
      },
      description: {
        type: String,
        default: ''
      },
      controlType: {
        type: String,
        default: ''
      },
      kp: {
        type: Number,
        default: 0
      },
      ki: {
        type: Number,
        default: 0
      },
      kd: {
        type: Number,
        default: 0
      },
    }
  },
}
</script>
