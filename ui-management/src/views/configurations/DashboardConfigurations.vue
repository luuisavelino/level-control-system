<template>
  <div id="home">
          <ModalCreate 
            :modalAction="modalAction"
            :modalActive="modalActive"
            :modalHeader="modalHeader"
            :itemUuid="schmeUuid"
            @create-item="createConfigurations"
            @edit-item="editConfigurations"
            @close-modal="closeModal">

            <ConfigurationsModalBody :data="configuration" :canEditModal="canEditOrCreateConfiguration && modalAction !== VIEW" />

          </ModalCreate>

          <ModalDelete 
            :itemName="'Configuration'"  
            :modalActive="modalDeleteActive"
            :itemUuid="schmeUuid"
            @close-modal-delete="closeModalDelete"
            @delete-item="deleteConfiguration"
          />

          <div class="lg:flex justify-between items-center mb-6">
            <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
              <ol class="list-none p-0 inline-flex">
                <li class="flex items-center text-blue-500">
                  <router-link :to="'/dashboard/home'" class="link">
                    <a class="text-gray-700">Home</a>
                  </router-link>
                  <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </li>
                <li class="flex items-center">
                  <router-link :to="'/configurations/dashboard'" class="link">
                    <a class="text-gray-600">Configurations</a>
                  </router-link>
                </li>
              </ol>
            </nav>

            <button v-if="hasPermissionToCreate" @click="showModalCreate()"
              class="bg-green-500 hover:bg-blue-600 focus:outline-none rounded-lg px-4 py-2 text-white font-semibold shadow">
              Create Configuration
            </button>
          </div>

          <div class="flex flex-wrap -mx-3">
            <ItemsList 
              :listItemsName="'Configurations'" :items="configurations"
              :viewItem="showModalView" :editItem="hasPermissionToEdit ? showModalEdit : null" 
              :excludeItem="hasPermissionToDelete ? showModalDelete : null" />
          </div>

  </div>
</template>

<script>
import ItemsList from '@/components/listItems/ListItems'
import ModalCreate from '@/components/modal/ModalCreate'
import ConfigurationsModalBody from './ConfigurationsModalBody'
import ModalDelete from '../../components/modal/ModalDelete.vue'
import configurationService from '@/services/api/rest/configurations/index'
import notificationService from '@/services/api/rest/notifications/index'
import scheduleService from '@/services/api/rest/schedules/index'
import { notifyError } from '@/services/notify/errors'

export default {
  name: 'DashboardConfigurations',
  components: {
    ItemsList,
    ModalCreate,
    ConfigurationsModalBody,
    ModalDelete
},
  data() {
    return {
      configuration: {},
      configurations: [],
      showOptionsIndex: null,
      modalActive: false,
      modalDeleteActive: false,
      modalAction: '',
      canEditOrCreateConfiguration: true,
      VIEW: 'View',
      EDIT: 'Edit',
      CREATE: 'Create',
      notifications: {},
      schedules: {},
    }
  },
  beforeMount() {
    this.getConfigurations();
    this.getNotifications();
    this.getSchedules();
  },
  computed: {
    schmeUuid() {
      return this.configuration?.uuid || ''
    },
    modalHeader() {
      return `${this.modalAction} Configuration ${this.configuration?.name || ''}`
    },
    hasPermissionToCreate() {
      return true
    },
    hasPermissionToEdit() {
      return true
    },
    hasPermissionToDelete() {
      return true
    },
  },
  methods: {
    getNotifications() {
      notificationService.getNotifications()
        .then(response => {
          response.data.forEach(notification => {
            this.notifications[notification.uuid] = notification.name
          })
        })
        .catch(error => notifyError(this.$vs, error));
    },
    getSchedules() {
      scheduleService.getSchedules()
        .then(response => {
          response.data.forEach(schedule => {
            this.schedules[schedule.uuid] = schedule.name
          })
        })
        .catch(error => notifyError(this.$vs, error));
    },
    showModalView(index) {
      this.modalAction = this.VIEW
      this.populateConfiguration(index)
      this.modalActive = true;
    },
    populateConfiguration(index) {
      this.configuration = {
        uuid: this.configurations[index].uuid,
        name: this.configurations[index].name,
        notificationUuid: this.configurations[index].notificationUuid,
        scheduleUuid: this.configurations[index].scheduleUuid,
        notifications: this.notifications,
        schedules: this.schedules,
      }
    },
    closeModal() {
      this.modalActive = false;
    },
    getConfigurations() {
      configurationService.getConfigurations()
        .then(response => {
          this.configurations = response.data
        })
        .catch(error => notifyError(this.$vs, error));
    },
    showModalCreate() {
      this.configuration = {
        notifications: this.notifications,
        schedules: this.schedules,
      }
      this.modalAction = this.CREATE
      this.modalActive = true;
    },
    createConfigurations() {
      configurationService.createConfiguration(this.configuration)
      .catch(error => notifyError(this.$vs, error));
    },
    showModalEdit(index) {
      this.modalAction = this.EDIT
      this.populateConfiguration(index)
      this.modalActive = true;
    },
    editConfigurations(uuid) {
      console.log(this.configuration)
      configurationService.updateConfiguration(this.configuration, uuid)
        .catch(error => notifyError(this.$vs, error));
    },
    showModalDelete(index) {
      this.configuration = {
        uuid: this.configurations[index].uuid,
      }
      this.modalDeleteActive = true;
    },
    closeModalDelete() {
      this.modalDeleteActive = false;
    },
    deleteConfiguration(uuid) {
      configurationService.deleteConfiguration(uuid)
        .catch(error => notifyError(this.$vs, error))
        .finally(() => {
          this.modalDeleteActive = false;
          this.getConfigurations();
        });
    },
  },
}
</script>

<style>

.modal-label{
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

.modal-input{
  width: 100%;
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

.modal-button{
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
