<template>
  <div class="grid gap-4 mb-4 grid-cols-2">

            <div class="col-span-2">
              <label for="name" class="modal-label">Scheme Name</label>
              <input 
                type="text" name="name" id="name" required=""
                class="modal-input" placeholder="Type scheme name" v-model="data.name">
            </div>

            <div class="col-span-2 sm:col-span-1">
              <label for="minLevel" class="modal-label">Min Level</label>
              <input 
                type="number" name="minLevel" id="minLevel" required=""
                class="modal-input" placeholder="5 (cm)" v-model="data.minLevel">
            </div>

            <div class="col-span-2 sm:col-span-1">
              <label for="maxLevel" class="modal-label">Max Level</label>
              <input 
                type="number" name="maxLevel" id="maxLevel" required=""
                class="modal-input" placeholder="30 (cm)" v-model="data.maxLevel">
            </div>

            <div class="col-span-2">
              <label for="setpoint" class="modal-label">Setpoint</label>
              <input 
                type="number" name="setpoint" id="setpoint" required="" 
                class="modal-input" placeholder="20 (cm)" v-model="data.setpoint">
            </div>

            <div class="col-span-2">
              <label for="description" class="modal-label">Scheme Description</label>
              <textarea 
                id="description" rows="4" class="modal-input" 
                placeholder="Write scheme description here" v-model="data.description">
              </textarea>                    
            </div>

  </div>
</template>

<script>

export default {
  name: 'SchemesModalBody',
  props: {
    data: {
      name: {
        type: String,
        default: ''
      },
      minLevel: {
        type: String,
        default: ''
      },
      maxLevel: {
        type: String,
        default: ''
      },
      setpoint: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
    }
  }
}
</script>