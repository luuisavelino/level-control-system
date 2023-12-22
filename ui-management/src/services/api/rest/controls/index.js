import axios from 'axios';
import store from '@/store';

const API_URL = 'http://localhost:3000/controls';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + store.getters.getToken,
};

const getControls = () => {
  let config = {
    method: 'get',
    url: API_URL,
    headers
  };

  return axios.request(config)
}

const createControl = (control) => {
  let config = {
    method: 'post',
    url: API_URL,
    data: {
      name: control.name,
      description: control.description,
      type: control.controlType,
      kp: parseFloat(control.kp),
      ki: parseFloat(control.ki),
      kd: parseFloat(control.kd),
    },
    headers
  };

  return axios.request(config)
}

const updateControl = (control, uuid) => {
  let config = {
    method: 'put',
    url: `${API_URL}/${uuid}`,
    data: {
      name: control.name,
      description: control.description,
      type: control.controlType,
      kp: parseFloat(control.kp),
      ki: parseFloat(control.ki),
      kd: parseFloat(control.kd),
    },
    headers
  };

  return axios.request(config)
}

const deleteControl = (uuid) => {
  let config = {
    method: 'delete',
    url: `${API_URL}/${uuid}`,
    headers
  };

  return axios.request(config)
}


export default {
  getControls,
  createControl,
  updateControl,
  deleteControl,
}
