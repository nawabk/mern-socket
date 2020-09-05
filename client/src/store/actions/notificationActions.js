import { GET_NOTIFICATIONS, NOTIFICATION_ERROR } from './types';

import axios from 'axios';
import { BASE_URL, getAuthHeader } from '../../utils/shared';

export const getNotifications = () => async dispatch => {
  try {
    const res = await axios.get(`${BASE_URL}/notifications`, getAuthHeader());
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: err
    });
  }
};
