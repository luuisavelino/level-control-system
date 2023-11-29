import axios from 'axios';
import store from '@/store';

const API_URL = 'http://localhost:3000/systems/';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + store.getters.getToken,
};

const getSystems = () => {
  let config = {
    method: 'get',
    url: API_URL,
    headers
  };

  return axios.request(config)
}

export default {
  getSystems,
}
