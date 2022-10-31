import { API } from '../../constants';
import { request } from '../../utils/request';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export const CONFIRM_PASSWORD = 'CONFIRM_PASSWORD';
export const CONFIRM_PASSWORD_SUCCESS = 'CONFIRM_PASSWORD_SUCCESS';
export const CONFIRM_PASSWORD_ERROR = 'CONFIRM_PASSWORD_ERROR';
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_ERROR = 'LOG_OUT_ERROR';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_ERROR = 'UPDATE_TOKEN_ERROR';
export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export function signUp(payload) {
  return function (dispatch) {
    dispatch({
      type: SIGN_UP,
    });
    request(API + 'auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((result) => {
        const { user, accessToken, refreshToken } = result;
        window.localStorage.setItem('token', accessToken.split('Bearer ')[1]);
        window.localStorage.setItem('refresh', refreshToken);
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: SIGN_UP_ERROR,
        });
        console.log(error.message);
      });
  };
}

export function signIn(payload) {
  return function (dispatch) {
    dispatch({
      type: SIGN_IN,
    });
    request(API + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((result) => {
        const { user, accessToken, refreshToken } = result;
        window.localStorage.setItem('token', accessToken.split('Bearer ')[1]);
        window.localStorage.setItem('refresh', refreshToken);
        window.localStorage.setItem('expires_in', Date.now());
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: SIGN_IN_ERROR,
        });
        console.log(error.message);
      });
  };
}

export function resetPassword(payload) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD,
    });
    request(API + 'password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((result) => {
        const { message } = result;
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
        console.log(message);
      })
      .catch((error) => {
        dispatch({
          type: RESET_PASSWORD_ERROR,
        });
        console.log(error.message);
      });
  };
}

export function confirmPassword(payload) {
  return function (dispatch) {
    dispatch({
      type: CONFIRM_PASSWORD,
    });
    request(API + 'password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((result) => {
        const { message } = result;
        dispatch({
          type: CONFIRM_PASSWORD_SUCCESS,
        });
        console.log(message);
      })
      .catch((error) => {
        dispatch({
          type: CONFIRM_PASSWORD_ERROR,
        });
        console.log(error.message);
      });
  };
}

export function logOut() {
  return function (dispatch) {
    dispatch({
      type: LOG_OUT,
    });
    request(API + 'auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: window.localStorage.getItem('refresh') }),
    })
      .then((result) => {
        const { message } = result;
        dispatch({
          type: LOG_OUT_SUCCESS,
        });
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('refresh');
        window.localStorage.removeItem('expires_in');
        console.log(message);
      })
      .catch((error) => {
        dispatch({
          type: LOG_OUT_ERROR,
        });
        console.log(error.message);
      });
  };
}

export function updateToken() {
  return function (dispatch) {
    dispatch({
      type: UPDATE_TOKEN,
    });
    request(API + 'auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: window.localStorage.getItem('refresh') }),
    })
      .then((result) => {
        const { accessToken, refreshToken } = result;
        window.localStorage.setItem('token', accessToken.split('Bearer ')[1]);
        window.localStorage.setItem('refresh', refreshToken);
        window.localStorage.setItem('expires_in', Date.now());
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_TOKEN_ERROR,
        });
        console.log(error.message);
      });
  };
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER,
    });
    request(API + 'auth/user', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    })
      .then((result) => {
        const { user } = result;
        dispatch({
          type: GET_USER_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_ERROR,
        });
        console.log(error.message);
      });
  };
}

export function updateUser(payload) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER,
    });
    request(API + 'auth/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      body: JSON.stringify(payload),
    })
      .then((result) => {
        const { user } = result;
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_USER_ERROR,
        });
        console.log(error.message);
      });
  };
}
