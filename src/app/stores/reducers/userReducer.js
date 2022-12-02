import {
  USER_SET_TOKEN,
  USER_LOGOUT
} from "../types/userTypes";

const initialState = {
  userToken: ''
};


export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_SET_TOKEN:
      localStorage.setItem("token", JSON.stringify(payload));
      return {
        ...state,
        userToken: payload
      };
    case USER_LOGOUT:
      localStorage.setItem("token", '');
      return {
        ...state,
        userToken: ''
      };
    default:
      return state;
  }

};
