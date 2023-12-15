<template>
  <div id="home">
          <ModalCreate 
            :modalAction="modalAction"
            :modalActive="modalActive"
            :modalHeader="modalHeader"
            :itemUuid="notificationUuid"
            @create-item="createNotifications"
            @edit-item="editNotifications"
            @close-modal="closeModal">

            <NotificationsModalBody 
              :data="notification" :canEditModal="canEditOrCreateNotification && modalAction !== VIEW" 
            />

          </ModalCreate>

          <ModalDelete 
            :itemName="'Notification'"  
            :modalActive="modalDeleteActive"
            :itemUuid="notificationUuid"
            @close-modal-delete="closeModalDelete"
            @delete-item="deleteNotification"
          />

          <div class="lg:flex justify-between items-center mb-6">
            <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
              <ol class="list-none p-0 inline-flex">
                <li class="flex items-center text-blue-500">
                  <router-link :to="'/dashboard/home'" class="link">
                    <a class="text-gray-600">Home</a>
                  </router-link>
                  <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </li>
                <li class="flex items-center">
                  <router-link :to="'/notifications/dashboard'" class="link">
                    <a class="text-gray-700">Notifications</a>
                  </router-link>
                </li>
              </ol>
            </nav>

            <button v-if="hasPermissionToCreate" @click="showModalCreate()"
              class="bg-green-500 hover:bg-blue-600 focus:outline-none rounded-lg px-4 py-2 text-white font-semibold shadow">
              Create Notification
            </button>
          </div>

          <div class="flex flex-wrap -mx-3">
            <ItemsList 
              :listItemsName="'Notifications'" :items="notifications"
              :viewItem="showModalView" :editItem="hasPermissionToEdit ? showModalEdit : null" 
              :excludeItem="hasPermissionToDelete ? showModalDelete : null" />
          </div>

  </div>
</template>

<script>
import ItemsList from '@/components/listItems/ListItems'
import ModalCreate from '@/components/modal/ModalCreate'
import NotificationsModalBody from './NotificationsModalBody'
import ModalDelete from '../../components/modal/ModalDelete.vue'
import notificationService from '@/services/api/rest/notifications/index'
import { notifyError } from '@/services/notify/errors'

export default {
  name: 'NotificationsDashboard',
  components: {
    ItemsList,
    ModalCreate,
    NotificationsModalBody,
    ModalDelete
},
  data() {
    return {
      notification: {}, 
      notifications: [],
      showOptionsIndex: null,
      modalActive: false,
      modalDeleteActive: false,
      modalAction: '',
      canEditOrCreateNotification: true,
      VIEW: 'View',
      EDIT: 'Edit',
      CREATE: 'Create'
      }
  },
  beforeMount() {
    this.getNotifications();
  },
  computed: {
    notificationUuid() {
      return this.notification?.uuid || ''
    },
    modalHeader() {
      return `${this.modalAction} Notification ${this.notification?.name || ''}`
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
    showModalView(index) {
      this.modalAction = this.VIEW
      this.populateNotification(index)
      this.modalActive = true;
    },
    populateNotification(index) {
      this.notification = {
        uuid: this.notifications[index].uuid,
        name: this.notifications[index].name,
        enabled: this.notifications[index].enabled,
        level: this.notifications[index].level,
        method: this.notifications[index].method,
      }
    },
    closeModal() {
      this.modalActive = false;
    },
    getNotifications() {
      notificationService.getNotifications()
        .then(response => {
          this.notifications = response.data
        })
        .catch(error => notifyError(this.$vs, error));
    },
    showModalCreate() {
      this.notification = {
        enabled: true,
        level: 'INFO',
      }
      this.modalAction = this.CREATE
      this.modalActive = true;
    },
    createNotifications() {
      notificationService.createNotification(this.notification)
        .catch(error => notifyError(this.$vs, error));
    },
    showModalEdit(index) {
      this.modalAction = this.EDIT
      this.populateNotification(index)
      this.modalActive = true;
    },
    editNotifications(uuid) {
      notificationService.updateNotification(this.notification, uuid)
        .catch(error => notifyError(this.$vs, error));
    },
    showModalDelete(index) {
      this.notification = {
        uuid: this.notifications[index].uuid,
      }
      this.modalDeleteActive = true;
    },
    closeModalDelete() {
      this.modalDeleteActive = false;
    },
    deleteNotification(uuid) {
      notificationService.deleteNotification(uuid)
        .catch(error => notifyError(this.$vs, error))
        .finally(() => {
          this.modalDeleteActive = false;
          this.getNotifications();
        });
    },
  },
}
</script>

<style>
.modal-checkbox{
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
  align-content: center;
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
