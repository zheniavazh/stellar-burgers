import { TAuthActions } from '../actions/auth';
import { TUser } from '../../utils/types';
import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CONFIRM_PASSWORD,
  CONFIRM_PASSWORD_SUCCESS,
  CONFIRM_PASSWORD_ERROR,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR,
  UPDATE_TOKEN,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_ERROR,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from '../actions/auth';

type TInitialAuthState = {
  currentUser: TUser | null;
  signUpRequest: boolean;
  signUpError: boolean;
  signInRequest: boolean;
  signInError: boolean;
  resetPasswordRequest: boolean;
  resetPasswordError: boolean;
  confirmPasswordRequest: boolean;
  confirmPasswordError: boolean;
  logOutRequest: boolean;
  logOutError: boolean;
  updateTokenRequest: boolean;
  updateTokenError: boolean;
  getUserRequest: boolean;
  getUserError: boolean;
  updateUserRequest: boolean;
  updateUserError: boolean;
};

export const initialAuthState: TInitialAuthState = {
  currentUser: null,
  signUpRequest: false,
  signUpError: false,
  signInRequest: false,
  signInError: false,
  resetPasswordRequest: false,
  resetPasswordError: false,
  confirmPasswordRequest: false,
  confirmPasswordError: false,
  logOutRequest: false,
  logOutError: false,
  updateTokenRequest: false,
  updateTokenError: false,
  getUserRequest: false,
  getUserError: false,
  updateUserRequest: false,
  updateUserError: false,
};

export const authReducer = (state = initialAuthState, action: TAuthActions) => {
  switch (action.type) {
    case SIGN_UP: {
      return {
        ...state,
        signUpRequest: true,
        signUpError: false,
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        currentUser: { ...action.payload },
        signUpRequest: false,
      };
    }
    case SIGN_UP_ERROR: {
      return {
        ...state,
        signUpError: true,
        signUpRequest: false,
      };
    }
    case SIGN_IN: {
      return {
        ...state,
        signInRequest: true,
        signInError: false,
      };
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        currentUser: { ...action.payload },
        signInRequest: false,
      };
    }
    case SIGN_IN_ERROR: {
      return {
        ...state,
        signInError: true,
        signInRequest: false,
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordError: false,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPasswordError: true,
        resetPasswordRequest: false,
      };
    }
    case CONFIRM_PASSWORD: {
      return {
        ...state,
        confirmPasswordRequest: true,
        confirmPasswordError: false,
      };
    }
    case CONFIRM_PASSWORD_SUCCESS: {
      return {
        ...state,
        confirmPasswordRequest: false,
      };
    }
    case CONFIRM_PASSWORD_ERROR: {
      return {
        ...state,
        confirmPasswordError: true,
        confirmPasswordRequest: false,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        logOutRequest: true,
        logOutError: false,
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        currentUser: null,
        logOutRequest: false,
      };
    }
    case LOG_OUT_ERROR: {
      return {
        ...state,
        logOutError: true,
        logOutRequest: false,
      };
    }
    case UPDATE_TOKEN: {
      return {
        ...state,
        updateTokenRequest: true,
        updateTokenError: false,
      };
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenRequest: false,
      };
    }
    case UPDATE_TOKEN_ERROR: {
      return {
        ...state,
        updateTokenError: true,
        updateTokenRequest: false,
      };
    }
    case GET_USER: {
      return {
        ...state,
        getUserRequest: true,
        getUserError: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        currentUser: { ...action.payload },
        getUserRequest: false,
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        getUserError: true,
        getUserRequest: false,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserError: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        currentUser: { ...action.payload },
        updateUserRequest: false,
      };
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        updateUserError: true,
        updateUserRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
