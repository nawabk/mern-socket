import {
  AUTH_LOADING,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  NO_AUTH
} from './types';
import axios from '../../auth-axios';
import authAxios from '../../axios-with-header';
import { setAlert } from './alertActions';
export const onLogin = (email, password) => async dispatch => {
  dispatch({
    type: AUTH_LOADING
  });

  try {
    const res = await axios.post('/login', {
      email,
      password
    });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    dispatch({
      type: AUTH_SUCCESS,
      data: res.data
    });
  } catch (err) {
    console.log(err.response);
    dispatch(
      setAlert({
        type: 'danger',
        message: 'There is some problem logging in.'
      })
    );
    dispatch({
      type: AUTH_FAIL,
      err: err
    });
  }
};

export const onSignup = userDetails => async dispatch => {
  dispatch({
    type: AUTH_LOADING
  });

  try {
    const res = await axios.post('/signup', userDetails);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    dispatch({
      type: AUTH_SUCCESS,
      data: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch(
      setAlert({
        type: 'danger',
        message: err.response.data.message
      })
    );
    dispatch({
      type: AUTH_FAIL,
      err: err.response
    });
  }
};

export const checkStatus = () => async dispatch => {
  if (localStorage.getItem('token')) {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      await authAxios.get('/users/isTokenValid');
      const data = {
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user'))
      };
      dispatch({
        type: AUTH_SUCCESS,
        data
      });
    } catch (err) {
      dispatch({
        type: AUTH_FAIL,
        err: err.response
      });
    }
  } else {
    dispatch({
      type: NO_AUTH
    });
  }
};

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {
    type: AUTH_LOGOUT
  };
};
