<template>
  <div>
    <label class="switch">
      <input type="checkbox" :disabled="disabled" :checked="isChecked" @change="toggleChecked">
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'ToogleSwitch',
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isChecked() {
      return this.checked;
    },
  },
  methods: {
    toggleChecked() {
      this.$emit('toggle-button', !this.checked);
    },
  },
};
</script>


<style>
.switch {
  position: relative;
  display: inline-block;
  width: 2.8rem;
  height: 1.7rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.2rem;
  width: 1.2rem;
  left: 4px;
  right: 10px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(1.2rem);
  -ms-transform: translateX(1.2rem);
  transform: translateX(1.2rem);
}

.slider.round {
  border-radius: 1.6rem;
}

.slider.round:before {
  border-radius: 50%;
}
</style>