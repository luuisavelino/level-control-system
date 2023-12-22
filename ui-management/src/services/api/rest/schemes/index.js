import axios from 'axios';
import store from '@/store';

const API_URL = 'http://localhost:3000/schemes';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + store.getters.getToken,
};

const getSchemes = () => {
  let config = {
    method: 'get',
    url: API_URL,
    headers
  };

  return axios.request(config)
}

const createScheme = (scheme) => {
  let config = {
    method: 'post',
    url: API_URL,
    data: {
      name: scheme.name,
      description: scheme.description,
      setpoint: parseFloat(scheme.setpoint),
      minLevel: parseFloat(scheme.minLevel),
      maxLevel: parseFloat(scheme.maxLevel),
    },
    headers
  };

  return axios.request(config)
}

const updateScheme = (scheme, uuid) => {
  let config = {
    method: 'put',
    url: `${API_URL}/${uuid}`,
    data: {
      name: scheme.name,
      description: scheme.description,
      setpoint: parseFloat(scheme.setpoint),
      minLevel: parseFloat(scheme.minLevel),
      maxLevel: parseFloat(scheme.maxLevel),
    },
    headers
  };

  return axios.request(config)
}

const deleteScheme = (uuid) => {
  let config = {
    method: 'delete',
    url: `${API_URL}/${uuid}`,
    headers
  };

  return axios.request(config)
}

export default {
  getSchemes,
  createScheme,
  updateScheme,
  deleteScheme,
};
