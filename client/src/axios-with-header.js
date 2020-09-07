import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API}/api/`,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
});

export default instance;
