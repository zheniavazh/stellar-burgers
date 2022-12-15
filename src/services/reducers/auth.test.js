import { authReducer, initialAuthState } from './auth';
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

describe('Auth reducer', () => {
  it('Should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialAuthState);
  });

  it('Should handle SIGN_UP', () => {
    expect(
      authReducer(initialAuthState, {
        type: SIGN_UP,
      })
    ).toEqual(
      {
        ...initialAuthState,
        signUpRequest: true,
      },
      initialAuthState
    );
  });

  it('Should handle SIGN_UP_SUCCESS', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          signUpRequest: true,
        },
        {
          type: SIGN_UP_SUCCESS,
          payload: { _id: 'User' },
        }
      )
    ).toEqual(
      { ...initialAuthState, currentUser: { _id: 'User' } },
      {
        ...initialAuthState,
        signUpRequest: true,
      }
    );
  });

  it('Should handle SIGN_UP_ERROR', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          signUpRequest: true,
        },
        {
          type: SIGN_UP_ERROR,
        }
      )
    ).toEqual(
      {
        ...initialAuthState,
        signUpError: true,
      },
      {
        ...initialAuthState,
        signUpRequest: true,
      }
    );
  });

  it('Should handle SIGN_IN', () => {
    expect(
      authReducer(initialAuthState, {
        type: SIGN_IN,
      })
    ).toEqual(
      {
        ...initialAuthState,
        signInRequest: true,
      },
      initialAuthState
    );
  });

  it('Should handle SIGN_IN_SUCCESS', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          signInRequest: true,
        },
        {
          type: SIGN_IN_SUCCESS,
          payload: { _id: 'User' },
        }
      )
    ).toEqual(
      { ...initialAuthState, currentUser: { _id: 'User' } },
      {
        ...initialAuthState,
      }
    );
  });

  it('Should handle SIGN_IN_ERROR', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          signInRequest: true,
        },
        {
          type: SIGN_IN_ERROR,
        }
      )
    ).toEqual(
      {
        ...initialAuthState,
        signInError: true,
      },
      {
        ...initialAuthState,
        signInRequest: true,
      }
    );
  });

  it('Should handle RESET_PASSWORD', () => {
    expect(
      authReducer(initialAuthState, {
        type: RESET_PASSWORD,
      })
    ).toEqual(
      {
        ...initialAuthState,
        resetPasswordRequest: true,
      },
      initialAuthState
    );
  });

  it('Should handle RESET_PASSWORD_SUCCESS', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          resetPasswordRequest: true,
        },
        {
          type: RESET_PASSWORD_SUCCESS,
        }
      )
    ).toEqual(initialAuthState, {
      ...initialAuthState,
      resetPasswordRequest: true,
    });
  });

  it('Should handle RESET_PASSWORD_ERROR', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          resetPasswordRequest: true,
        },
        {
          type: RESET_PASSWORD_ERROR,
        }
      )
    ).toEqual(
      {
        ...initialAuthState,
        resetPasswordError: true,
      },
      {
        ...initialAuthState,
        resetPasswordRequest: true,
      }
    );
  });

  it('Should handle CONFIRM_PASSWORD', () => {
    expect(
      authReducer(initialAuthState, {
        type: CONFIRM_PASSWORD,
      })
    ).toEqual(
      {
        ...initialAuthState,
        confirmPasswordRequest: true,
      },
      initialAuthState
    );
  });

  it('Should handle CONFIRM_PASSWORD_SUCCESS', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          confirmPasswordRequest: true,
        },
        {
          type: CONFIRM_PASSWORD_SUCCESS,
        }
      )
    ).toEqual(initialAuthState, {
      ...initialAuthState,
      confirmPasswordRequest: true,
    });
  });

  it('Should handle CONFIRM_PASSWORD_ERROR', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          confirmPasswordRequest: true,
        },
        {
          type: CONFIRM_PASSWORD_ERROR,
        }
      )
    ).toEqual(
      {
        ...initialAuthState,
        confirmPasswordError: true,
      },
      {
        ...initialAuthState,
        confirmPasswordRequest: true,
      }
    );
  });

  it('Should handle LOG_OUT', () => {
    expect(
      authReducer(initialAuthState, {
        type: LOG_OUT,
      })
    ).toEqual(
      {
        ...initialAuthState,
        logOutRequest: true,
      },
      initialAuthState
    );
  });

  it('Should handle LOG_OUT_SUCCESS', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          currentUser: { _id: 'User' },
          logOutRequest: true,
        },
        {
          type: LOG_OUT_SUCCESS,
        }
      )
    ).toEqual(initialAuthState, {
      ...initialAuthState,
      currentUser: { _id: 'User' },
      logOutRequest: true,
    });
  });

  it('Should handle LOG_OUT_ERROR', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          logOutRequest: true,
        },
        {
          type: LOG_OUT_ERROR,
        }
      )
    ).toEqual(
      {
        ...initialAuthState,
        logOutError: true,
      },
      {
        ...initialAuthState,
        logOutRequest: true,
      }
    );
  });

  it('Should handle UPDATE_TOKEN', () => {
    expect(
      authReducer(initialAuthState, {
        type: UPDATE_TOKEN,
      })
    ).toEqual(
      {
        ...initialAuthState,
        updateTokenRequest: true,
      },
      initialAuthState
    );
  });

  it('Should handle UPDATE_TOKEN_SUCCESS', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          updateTokenRequest: true,
        },
        {
          type: UPDATE_TOKEN_SUCCESS,
        }
      )
    ).toEqual(initialAuthState, {
      ...initialAuthState,
      updateTokenRequest: true,
    });
  });

  it('Should handle UPDATE_TOKEN_ERROR', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          updateTokenRequest: true,
        },
        {
          type: UPDATE_TOKEN_ERROR,
        }
      )
    ).toEqual(
      {
        ...initialAuthState,
        updateTokenError: true,
      },
      {
        ...initialAuthState,
        updateTokenRequest: true,
      }
    );
  });

  it('Should handle GET_USER', () => {
    expect(
      authReducer(initialAuthState, {
        type: GET_USER,
      })
    ).toEqual(
      {
        ...initialAuthState,
        getUserRequest: true,
      },
      initialAuthState
    );
  });

  it('Should handle GET_USER_SUCCESS', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          getUserRequest: true,
        },
        {
          type: GET_USER_SUCCESS,
          payload: { _id: 'User' },
        }
      )
    ).toEqual(
      { ...initialAuthState, currentUser: { _id: 'User' } },
      {
        ...initialAuthState,
        getUserRequest: true,
      }
    );
  });

  it('Should handle GET_USER_ERROR', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          getUserRequest: true,
        },
        {
          type: GET_USER_ERROR,
        }
      )
    ).toEqual(
      {
        ...initialAuthState,
        getUserError: true,
      },
      {
        ...initialAuthState,
        getUserRequest: true,
      }
    );
  });

  it('Should handle UPDATE_USER', () => {
    expect(
      authReducer(initialAuthState, {
        type: UPDATE_USER,
      })
    ).toEqual(
      {
        ...initialAuthState,
        updateUserRequest: true,
      },
      initialAuthState
    );
  });

  it('Should handle UPDATE_USER_SUCCESS', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          updateUserRequest: true,
        },
        {
          type: UPDATE_USER_SUCCESS,
          payload: { _id: 'User' },
        }
      )
    ).toEqual(
      { ...initialAuthState, currentUser: { _id: 'User' } },
      {
        ...initialAuthState,
        updateUserRequest: true,
      }
    );
  });

  it('Should handle UPDATE_USER_ERROR', () => {
    expect(
      authReducer(
        {
          ...initialAuthState,
          updateUserRequest: true,
        },
        {
          type: UPDATE_USER_ERROR,
        }
      )
    ).toEqual(
      {
        ...initialAuthState,
        updateUserError: true,
      },
      {
        ...initialAuthState,
        updateUserRequest: true,
      }
    );
  });
});
