export const getAuthHeader = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  };
};

export const BASE_URL = `${process.env.REACT_APP_API}/api`;

export const SOCKET = `${process.env.REACT_APP_API}`;
