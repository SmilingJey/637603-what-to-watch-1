import {ActionType} from './actions';

const initialState = {
  submitting: false,
  userData: null,
  authorizationError: null,
  authorisationRequest: false,
  authorisationError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHORISATION_SUBMIT:
      return {
        ...state,
        submitting: true
      };

    case ActionType.AUTHORISATION_SUBMIT_SUCCESS:
      return {
        ...state,
        submitting: false,
        userData: action.payload
      };

    case ActionType.AUTHORISATION_SUBMIT_ERROR:
      return {
        ...state,
        submitting: false,
        authorizationError: action.payload
      };

    case ActionType.AUTHORISATION_REQUEST:
      return {
        ...state,
        authorisationRequest: true,
      };

    case ActionType.AUTHORISATION_REQUEST_SUCCESS:
      return {
        ...state,
        authorisationRequest: false,
        userData: action.payload,
        authorisationError: null
      };

    case ActionType.AUTHORISATION_REQUEST_ERROR:
      return {
        ...state,
        authorisationRequest: false,
        authorisationError: action.payload
      };

    case ActionType.AUTHORISATION_LOGOUT:
      return {
        ...state,
        userData: null,
      };

    case ActionType.AUTHORISATION_CLEAR_USER_DATA:
      return {
        ...state,
        userData: null,
      };
  }
  return state;
};

export {reducer};
