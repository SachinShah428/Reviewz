import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:{
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return state;
    }
    case actionType.LOGOUT:
      localStorage.clear();
      return state;
    default:
      return state;
  }
};

export default authReducer;
