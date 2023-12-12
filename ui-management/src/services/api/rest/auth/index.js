import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/signin/';
const headers =  { 
  'Content-Type': 'application/json'
}

const signin = (data) => {
  let config = {
    method: 'post',
    url: API_URL,
    headers,
    data: data,
  };

  return axios.request(config)
}

export default {
  signin,
}
