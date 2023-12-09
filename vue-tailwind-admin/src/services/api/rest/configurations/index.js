import axios from 'axios';
import store from '@/store';

const API_URL = 'http://localhost:3000/configurations/';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + store.getters.getToken,
};

const getConfigurations = () => {
  let config = {
    method: 'get',
    url: API_URL,
    headers
  };

  return axios.request(config)
}

const createConfiguration = (configuration) => {
  let config = {
    method: 'post',
    url: API_URL,
    data: {
      name: configuration.name,
      scheduleUuid: configuration.scheduleUuid,
      notificationUuid: configuration.notificationUuid,
    },
    headers
  };

  return axios.request(config)
}

const updateConfiguration = (configuration, uuid) => {
  let config = {
    method: 'put',
    url: API_URL + uuid,
    data: {
      name: configuration.name,
      scheduleUuid: configuration.scheduleUuid,
      notificationUuid: configuration.notificationUuid,
    },
    headers
  };

  return axios.request(config)
}

const deleteConfiguration = (uuid) => {
  let config = {
    method: 'delete',
    url: API_URL + uuid,
    headers
  };

  return axios.request(config)
}


export default {
  getConfigurations,
  createConfiguration,
  updateConfiguration,
  deleteConfiguration,
}
