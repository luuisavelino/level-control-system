import axios from "axios";
import store from "@/store";

const API_URL = "http://localhost:3000/systems";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + store.getters.getToken,
};

const getSystems = () => {
  let config = {
    method: "get",
    url: API_URL,
    headers,
  };

  return axios.request(config);
};

const createSystem = (system) => {
  let config = {
    method: "post",
    url: API_URL,
    data: {
      name: system.name,
      path: system.path,
      description: system.description,
      enabled: system.enabled,
      controlUuid: system.controlUuid,
      schemeUuid: system.schemeUuid,
      configurationUuid: system.configurationUuid,
    },
    headers,
  };

  return axios.request(config);
};

const updateSystem = (system, uuid) => {
  let config = {
    method: "put",
    url: API_URL + uuid,
    data: {
      name: system.name,
      path: system.path,
      description: system.description,
      enabled: system.enabled,
      controlUuid: system.controlUuid,
      schemeUuid: system.schemeUuid,
      configurationUuid: system.configurationUuid,
    },
    headers,
  };

  return axios.request(config);
};

const deleteSystem = (uuid) => {
  let config = {
    method: "delete",
    url: API_URL + uuid,
    headers,
  };

  return axios.request(config);
};

export default {
  getSystems,
  createSystem,
  updateSystem,
  deleteSystem,
};
