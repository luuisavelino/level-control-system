import axios from 'axios';
import store from '@/store';

const API_URL = 'http://localhost:3000/schedules/';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + store.getters.getToken,
};

const getSchedules = () => {
  let config = {
    method: 'get',
    url: API_URL,
    headers
  };

  return axios.request(config)
}

const createSchedule = (scheme) => {
  let config = {
    method: 'post',
    url: API_URL,
    data: {
      name: scheme.name,
      startTime: new Date(scheme.startTime).toISOString(),
      endTime: new Date(scheme.endTime).toISOString(),
    },
    headers
  };

  return axios.request(config)
}

const updateSchedule = (scheme, uuid) => {
  let config = {
    method: 'put',
    url: API_URL + uuid,
    data: {
      name: scheme.name,
      startTime: scheme.startTime,
      endTime: scheme.endTime,
    },
    headers
  };

  return axios.request(config)
}

const deleteSchedule = (uuid) => {
  let config = {
    method: 'delete',
    url: API_URL + uuid,
    headers
  };

  return axios.request(config)
}


export default {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
}
