<template>
  <div id="home">
          <ModalCreate 
            :modalAction="modalAction"
            :modalActive="modalActive"
            :modalHeader="modalHeader"
            :itemUuid="schmeUuid"
            @create-item="createSchemes"
            @edit-item="editSchemes"
            @close-modal="closeModal">

            <SchemesModalBody :data="scheme" :canEditModal="canEditOrCreateScheme && modalAction !== VIEW" />

          </ModalCreate>

          <ModalDelete 
            :itemName="'Scheme'"  
            :modalActive="modalDeleteActive"
            :itemUuid="schmeUuid"
            @close-modal-delete="closeModalDelete"
            @delete-item="deleteScheme"
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
                  <router-link :to="'/schemes/dashboard'" class="link">
                    <a class="text-gray-600">Schemes</a>
                  </router-link>
                </li>
              </ol>
            </nav>

            <button v-if="hasPermissionToCreate" @click="showModalCreate()"
              class="bg-green-500 hover:bg-blue-600 focus:outline-none rounded-lg px-4 py-2 text-white font-semibold shadow">
              Create Scheme
            </button>
          </div>

          <div class="flex flex-wrap -mx-3">
            <ItemsList 
              :listItemsName="'Schemes'" :items="schemes"
              :viewItem="showModalView" :editItem="hasPermissionToEdit ? showModalEdit : null" 
              :excludeItem="hasPermissionToDelete ? showModalDelete : null" />
          </div>

  </div>
</template>

<script>
import ItemsList from '@/components/listItems/ListItems'
import ModalCreate from '@/components/modal/ModalCreate'
import SchemesModalBody from './SchemesModalBody'
import ModalDelete from '../../components/modal/ModalDelete.vue'

import axios from 'axios'

export default {
  name: 'DashboardSchemes',
  components: {
    ItemsList,
    ModalCreate,
    SchemesModalBody,
    ModalDelete
},
  data() {
    return {
      schemes: [],
      showOptionsIndex: null,
      modalActive: false,
      modalDeleteActive: false,
      scheme: {},
      modalAction: '',
      canEditOrCreateScheme: true,
      VIEW: 'View',
      EDIT: 'Edit',
      CREATE: 'Create'
      }
  },
  beforeMount() {
    this.getSchemes();
  },
  computed: {
    schmeUuid() {
      return this.scheme?.uuid || ''
    },
    modalHeader() {
      return `${this.modalAction} Scheme ${this.scheme?.name || ''}`
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
      this.populateScheme(index)
      this.modalActive = true;
    },
    populateScheme(index) {
      this.scheme = {
        uuid: this.schemes[index].uuid,
        name: this.schemes[index].name,
        description: this.schemes[index].description,
        setpoint: this.schemes[index].setpoint,
        minLevel: this.schemes[index].minLevel,
        maxLevel: this.schemes[index].maxLevel,
      }
    },
    closeModal() {
      this.modalActive = false;
    },
    getSchemes() {
      let config = {
        method: 'get',
        url: 'http://localhost:3000/schemes',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
      };
      
      axios.request(config)
        .then(response => {
          this.schemes = response.data
        })
        .catch(error => {
          let errMsg = ''

          if (error.response?.data?.message instanceof Array) {
            errMsg = error?.response?.data?.message[0]
          } else {
            errMsg = error?.response?.data?.message
          }

          this.$vs.notify({
            title: 'Error',
            text: errMsg,
            color: 'danger',
            position: 'top-right'
          })
        });
    },
    showModalCreate() {
      this.scheme = {}
      this.modalAction = this.CREATE
      this.modalActive = true;
    },
    createSchemes() {
      let config = {
        method: 'post',
        url: 'http://localhost:3000/schemes',
        data: {
          name: this.scheme.name,
          description: this.scheme.description,
          setpoint: parseFloat(this.scheme.setpoint),
          minLevel: parseFloat(this.scheme.minLevel),
          maxLevel: parseFloat(this.scheme.maxLevel),
        },
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
      };

      axios.request(config)
        .catch(error => {
          let errMsg = ''

          if (error.response?.data?.message instanceof Array) {
            errMsg = error?.response?.data?.message[0]
          } else {
            errMsg = error?.response?.data?.message
          }

          this.$vs.notify({
            title: 'Error',
            text: errMsg,
            color: 'danger',
            position: 'top-right'
          })
        });
    },
    showModalEdit(index) {
      this.modalAction = this.EDIT
      this.populateScheme(index)
      this.modalActive = true;
    },
    editSchemes(uuid) {
      let config = {
        method: 'put',
        url: `http://localhost:3000/schemes/${uuid}`,
        data: {
          name: this.scheme.name,
          description: this.scheme.description,
          setpoint: parseFloat(this.scheme.setpoint),
          minLevel: parseFloat(this.scheme.minLevel),
          maxLevel: parseFloat(this.scheme.maxLevel),
        },
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
      };

      axios.request(config)
        .catch(error => {
          let errMsg = ''

          if (error.response?.data?.message instanceof Array) {
            errMsg = error?.response?.data?.message[0]
          } else {
            errMsg = error?.response?.data?.message
          }

          this.$vs.notify({
            title: 'Error',
            text: errMsg,
            color: 'danger',
            position: 'top-right'
          })
        });
    },
    showModalDelete(index) {
      this.scheme = {
        uuid: this.schemes[index].uuid,
      }
      this.modalDeleteActive = true;
    },
    closeModalDelete() {
      this.modalDeleteActive = false;
    },
    deleteScheme(uuid) {
      let config = {
        method: 'delete',
        url: `http://localhost:3000/schemes/${uuid}`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
      };

      axios.request(config)
        .catch(error => {
          let errMsg = ''

          if (error.response?.data?.message instanceof Array) {
            errMsg = error?.response?.data?.message[0]
          } else {
            errMsg = error?.response?.data?.message
          }

          this.$vs.notify({
            title: 'Error',
            text: errMsg,
            color: 'danger',
            position: 'top-right'
          })
        })
        .finally(() => {
          this.modalDeleteActive = false;
          this.getSchemes();                  
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