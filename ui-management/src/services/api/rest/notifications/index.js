import axios from 'axios';
import store from '@/store';

const API_URL = 'http://localhost:3000/notifications/';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + store.getters.getToken,
};

const getNotifications = () => {
  let config = {
    method: 'get',
    url: API_URL,
    headers
  };

  return axios.request(config)
}

const createNotification = (notification) => {
  let config = {
    method: 'post',
    url: API_URL,
    data: {
      name: notification.name,
      enabled: notification.enabled,
      level: notification.level,
      type: notification.type,
      method: notification.method,
    },
    headers
  };

  return axios.request(config)
}

const updateNotification = (notification, uuid) => {
  let config = {
    method: 'put',
    url: API_URL + uuid,
    data: {
      name: notification.name,
      enabled: notification.enabled,
      level: notification.level,
      type: notification.type,
      method: notification.method,
    },
    headers
  };

  return axios.request(config)
}

const deleteNotification = (uuid) => {
  let config = {
    method: 'delete',
    url: API_URL + uuid,
    headers
  };

  return axios.request(config)
}

export default {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
}
