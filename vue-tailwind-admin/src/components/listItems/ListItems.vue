<template>

  <div class="w-full xl px-3">
          <div class="lg:flex justify-between items-center mb-6">
            <p class="text-xl font-semibold mb-4">{{ listItemsName }}</p>
            <PaginationField />
          </div>

          <div class="w-full bg-white border rounded-lg p-4">

            <div v-if="!items.length" class="text-center text-gray-500 py-4">
              <p>No {{ listItemsName }}</p>
            </div>

            <div v-else>
              <div v-for="(system, index) in items" :key="index"
                class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4"
                @mouseover="showOptions(index)" @mouseleave="hideOptions(index)">
                <div>
                  <p class="font-semibold text-xl">{{ system.name }}</p>
                  <p>{{ system.description }}</p>
                </div>
                
                <div v-if="showOptionsIndex === index" class="flex space-x-2">
                  <button @click="editSystem(index)" class="text-blue-500">Edit</button>
                  <button @click="excludeSystem(index)" class="text-red-500">Exclude</button>
                </div>
                <div v-else>
                  <span class="text-green-500 font-semibold text-lg">{{ system.value }}</span>
                </div>
              </div>
            </div>

          </div>
  </div>

</template>

<script>

import PaginationField from '@/components/pagination/PaginationField.vue';

export default {
  name: 'ItemsList',
  components: {
    PaginationField,
  },
  props: {
    listItemsName: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      showOptionsIndex: null,
    }
  },
  methods: {
    showOptions(index) {
      this.showOptionsIndex = index;
    },
    hideOptions() {
      this.showOptionsIndex = null;
    },
    editSystem(index) {
      console.log('Edit system at index:', index);
    },
    excludeSystem(index) {
      console.log('Exclude system at index:', index);
    },
  },
}
</script>
