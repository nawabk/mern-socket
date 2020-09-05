import { GET_NOTIFICATIONS, NOTIFICATION_ERROR } from '../actions/types';
const initialState = {
  notifications: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    case NOTIFICATION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
