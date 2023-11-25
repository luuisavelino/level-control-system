<template>
  <div v-if="modalActive" id="crud-modal" class="crud-modal">

            <div class="relative w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg">

                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ modalHeader }}
                  </h3>
                  <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="$emit('close-modal')">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>

                <!-- Modal body -->
                <form action="" class="p-4 md:p-5">
                  <slot />

                  <div class="flex border-t dark:border-gray-600" v-if="modalAction !== VIEW">
                    <button v-if="modalAction === CREATE" type="submit" class="modal-button" @click="$emit('create-item')">
                      {{ modalAction }}
                    </button>
                    <button v-if="modalAction === EDIT" type="submit" class="modal-button" @click="$emit('edit-item', itemUuid)">
                      {{ modalAction }}
                    </button>
                  </div>

                </form>
              </div>
            </div>

  </div>
</template>

<script>
export default{
  name: 'ModalCreate',
  data() {
    return {
      VIEW: 'View',
      EDIT: 'Edit',
      CREATE: 'Create'
    }
  },
  props: {
    modalAction: {
      type: String,
      default: ''
    },
    modalActive: {
      type: Boolean,
      default: false
    },
    modalHeader: {
      type: String,
      default: ''
    },
    itemUuid: {
      type: String,
      default: ''
    },
  },
}
</script>

<style>

.crud-modal {
  display: flex;
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  max-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

</style>