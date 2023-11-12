<template>


          <div class="w-full bg-white border rounded-lg p-4">

            <div v-if="!items.length" class="text-center text-gray-500 py-4">
              <p>No {{ listItemsName }}</p>
            </div>

            <div v-else>
              <div v-for="(item, index) in items" :key="index"
                class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4"
                @mouseover="showOptions(index)" @mouseleave="hideOptions(index)">
                <div>
                  <p class="font-semibold text-xl">{{ item.name }}</p>
                  <p>{{ item.description }}</p>
                </div>
                
                <div v-if="showOptionsIndex === index" class="flex space-x-2">
                  <button @click="viewItem(index)" class="text-green-500">View</button>
                  <button @click="editItem(index)" class="text-blue-500">Edit</button>
                  <button @click="excludeItem(index)" class="text-red-500">Exclude</button>
                </div>
                <div v-else>
                  <span class="text-green-500 font-semibold text-lg">{{ item.value }}</span>
                </div>
              </div>
            </div>

          </div>
  

</template>

<script>

export default {
  name: 'ItemsList',
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
    viewItem(index) {
      console.log('View item at index:', index);
    },
    editItem(index) {
      console.log('Edit item at index:', index);
    },
    excludeItem(index) {
      console.log('Exclude item at index:', index);
    },
  },
}
</script>
