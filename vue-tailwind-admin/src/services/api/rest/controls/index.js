import axios from 'axios';
import store from '@/store';

const API_URL = 'http://localhost:3000/controls/';
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

export default {
  getControls,
}
