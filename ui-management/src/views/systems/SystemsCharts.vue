<template>
  <div>

    <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center text-blue-500">
          <router-link :to="'/dashboard/home'" class="link">
            <a class="text-gray-600">Home</a>
          </router-link>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
          </svg>
        </li>
        <li class="flex items-center text-blue-500">
          <router-link :to="'/systems/dashboard'" class="link">
            <a class="text-gray-600">Systems</a>
          </router-link>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
          </svg>
        </li>
        <li class="flex items-center">
          <router-link :to="'/systems/charts'" class="link">
            <a class="text-gray-700">Charts</a>
          </router-link>
        </li>
      </ol>
    </nav>

    <div class="flex flex-wrap -mx-3">

      <div class="w-full xl:w-3/4 px-2">
        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <div class="lg:flex justify-between items-start mb-6">
            <label class="text-xl font-semibold mb-4">System A</label>
            <select id="interval"
              class="px-2 bg-gray-20 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500      focus:border-blue-500 block m-2 w-full xl:w-1/6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option v-for="(item, index) in intervals" :key="index" class="mr-4" :value="index">
                {{ item }}
              </option>
            </select>
          </div>

          <canvas id="buyers-chart" width="1280" height="720"></canvas>

        </div>

      </div>

      <div class="w-full xl:w-1/4 px-2">
        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0 grid gap-4 mb-4 grid-cols-2">
          <p class="text-xl font-semibold mb-4 ">Options</p>

          <div class="flex justify-between items-center col-span-2 border border-gray-300 rounded-lg">
            <label for="setpoint" class="modal-label m-2 ml-2">System Enabled</label>
            <ToogleSwitch class="mr-2" id="enabled" :checked="systemEnabled" @toggle-button="toggleEnabled"/>
          </div>

          <div class="col-span-2 border border-gray-300 rounded-lg">
            <label for="setpoint" class="modal-label m-2">Setpoint</label>
            <input type="number" name="setpoint" id="setpoint" required="" class="modal-input m-2 w-full xl:w-3/4"
              placeholder="20 (cm)" v-model="setpoint">
            <input type="checkbox" class="ml-2 mt-2 mr-2" v-model="editGroup.scheme">
            <label class="text-gray-700 text-sm"
              title="If selected, when saving, you will edit this group, affecting other systems that also use it. If not selected, you will create a new group for this item, which only this system will be using.">
              Edit group
            </label>
          </div>

          <div class="col-span-2 border border-gray-300 rounded-lg">
            <label for="controlType" class="modal-label m-2">Control Type</label>
            <select id="controlType"
              class="px-2 m-2 mb-4 bg-gray-20 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500      focus:border-blue-500 block w-full xl:w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="controlType">
              <option v-for="(item, index) in controlTypesOptions" :key="index" class="mr-4" :value="item.key">
                {{ item.value }}
              </option>
            </select>

            <div>
              <label for="controlType" class="modal-label ml-2">Proportional gain</label>
              <input type="number" name="setpoint" id="setpoint" required="" class="modal-input ml-2 w-full xl:w-3/4"
                placeholder="1.123" v-model="gain.proportional">
            </div>

            <div v-if="controlType !== 'PD'">
              <label for="controlType" class="modal-label ml-2 mt-2">Integrative gain</label>
              <input type="number" name="setpoint" id="setpoint" required="" class="modal-input ml-2 w-full xl:w-3/4"
                placeholder="0.345" v-model="gain.integrative">
            </div>

            <div v-if="controlType !== 'PI'">
              <label for="controlType" class="modal-label ml-2 mt-2">Derivative gain</label>
              <input type="number" name="setpoint" id="setpoint" required="" class="modal-input m-2 w-full xl:w-3/4"
                placeholder="3.123" v-model="gain.derivative">
            </div>

            <input type="checkbox" class="ml-2 mt-2 mr-2" v-model="editGroup.control">
            <label class="text-gray-700 text-sm"
              title="If selected, when saving, you will edit this group, affecting other systems that also use it. If not selected, you will create a new group for this item, which only this system will be using.">
              Edit group
            </label>

          </div>

          <button @click="editSystem()"
            class="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg px-2 py-1 text-white font-semibold shadow">
            Edit System
          </button>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Chart from 'chart.js'
import ToogleSwitch from '@/components/others/ToogleSwitch.vue'
import systemService from '@/services/api/rest/systems/index'
import { notifyError, notifySuccess } from '@/services/notify/errors'
import io from 'socket.io-client'

export default {
  name: 'SystemsCharts',
  components: {
    ToogleSwitch
  },
  data() {
    return {
      socket: null,
      systemEnabled: true,
      setpoint: null,
      editGroup: {
        scheme: true,
        control: true,
      },
      controlType: null,
      gain: { 
        proportional: 0,
        integrative: 0,
        derivative: 0,
      },
      intervals: {
        '1m': '1 minute',
        '5m': '5 minutes',
        '10m': '10 minutes',
        '15m': '15 minutes',
        '30m': '30 minutes',
        '1h': '1 hour',
      },
      controlTypesOptions: [
        { key: 'PI', value: 'PI' },
        { key: 'PD', value: 'PD' },
        { key: 'PID', value: 'PID' },
      ],
      buyersData: {
        type: 'line',
        data: {
          labels: Array.from(Array(100).keys()),
          datasets: [{
            backgroundColor: "rgba(99,179,237,0.4)",
            strokeColor: "#63b3ed",
            pointColor: "#fff",
            pointStrokeColor: "#63b3ed",
            // randon 100 data to populate the chart
            data: [86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1]
          },
          {
            backgroundColor: "rgba(198,198,198,0.4)",
            strokeColor: "#f7fafc",
            pointColor: "#fff",
            pointStrokeColor: "#f7fafc",
            data: [86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1, 86, 97, 144, 114, 94, 108, 1]
          }]
        },
        options: {
          legend: {
            display: true
          },
          elements: {
            point: {
              radius: 0
            }
          },
          scales: {
            yAxes: [{
              gridLines: {
                display: true
              },
              ticks: {
                display: true
              }
            }],
            xAxes: [{
              gridLines: {
                display: true
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 15
              }
            }]
          }
        }
      },
    }
  },
  mounted() {
    const chart = new Chart(document.getElementById('buyers-chart'), this.buyersData)
    this.populateOptionsData()
    this.socket = new io('ws://localhost:3000');

    this.socket.on('events', (data) => {
      chart.data.datasets[0].data.shift();
      chart.data.datasets[0].data.push(data * 100);

      chart.update();
    });
  },
  beforeDestroy() {
    this.socket.close();
  },
  methods: {
    editSystem() {
      const data = {
        systemEnabled: this.systemEnabled,
        setpoint: this.setpoint,
        controlType: this.controlType,
        gain: this.gain,
        editGroup: this.editGroup
      }

      systemService.fastEdit(this.$route.params.uuid, data)
        .then(() => {
          notifySuccess(this.$vs, 'System edited successfully')
        })
        .catch(error => notifyError(this.$vs, error));
    },
    toggleEnabled(value) {
      this.systemEnabled = value
    },
    populateOptionsData() {
      systemService.getSystemDetailed(this.$route.params.uuid)
        .then((response) => {
          this.systemEnabled = response.data.enabled
          this.setpoint = response.data.Scheme.setpoint
          this.controlType = response.data.Control.type
          this.gain = {
            proportional: response.data.Control.kp,
            integrative: response.data.Control.ki,
            derivative: response.data.Control.kd,
          }
        })
        .catch(error => notifyError(this.$vs, error));
    }
  }
}

</script>

<style>
.modal-checkbox {
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #1a202c;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
  margin-left: 0.5rem;

}

.modal-label {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #1a202c;
  display: block;
  box-sizing: border-box;
  border-style: solid;
  border-color: #e2e8f0;
  font-size: font-medium;
  margin-bottom: 0.5rem;
}

.modal-input {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #1a202c;
  display: block;

  box-sizing: border-box;
  font-size: font-medium;

  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  background-color: #fff;
  border-width: 1px;
  border-color: #e2e8f0;
  border-style: solid;
  border-radius: 0.7rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition: all 0.2s ease-in-out;
}

.modal-button {
  color: #fff;
  font-size: 0.875rem;
  text-align: center;
  padding: 0.5rem 1.25rem 0.5rem 1.25rem;
  font-weight: 500;
  align-items: margin-left;
  display: inline-flex;
  margin-top: 1rem;

  background-color: #2b6cb0;
  font-family: inherit;
  cursor: pointer;
  overflow: visible;
  border-radius: 0.5rem;
}
</style>