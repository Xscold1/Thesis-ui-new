import {
  USER_SET_TOKEN,
  USER_LOGOUT
} from "../types/userTypes";

// Get User Token
export function setUserToken(token) {
  return {
    type: USER_SET_TOKEN,
    payload: token
  }
}

// Get User Token
export function userLogout() {
  return {
    type: USER_LOGOUT
  }
}

