enum ActionType {
  AUTHORISATION_SUBMIT = 'AUTHORISATION_SUBMIT',
  AUTHORISATION_SUBMIT_SUCCESS = 'AUTHORISATION_SUBMITTING_SUCCESS',
  AUTHORISATION_SUBMIT_ERROR = 'AUTHORISATION_SUBMITTING_ERROR',
  AUTHORISATION_REQUEST = 'AUTHORISATION_REQUEST',
  AUTHORISATION_REQUEST_SUCCESS = 'AUTHORISATION_REQUEST_SUCCESS',
  AUTHORISATION_REQUEST_ERROR = 'AUTHORISATION_REQUEST_ERROR',
  AUTHORISATION_LOGOUT = 'AUTHORISATION_LOGOUT',
  AUTHORISATION_CLEAR_USER_DATA = 'AUTHORISATION_CLEAR_USER_DATA'
}

const ActionCreator = {
  submitAuthorisation: (data) => ({
    type: ActionType.AUTHORISATION_SUBMIT,
    payload: data,
  }),

  submitAuthorisationSuccess: (data) => ({
    type: ActionType.AUTHORISATION_SUBMIT_SUCCESS,
    payload: data,
  }),

  submitAuthorisationError: (error) => ({
    type: ActionType.AUTHORISATION_SUBMIT_ERROR,
    payload: error,
  }),

  requestAuthorisation: () => ({type: ActionType.AUTHORISATION_REQUEST}),

  requestAuthorisationSuccess: (data) => ({
    type: ActionType.AUTHORISATION_REQUEST_SUCCESS,
    payload: data,
  }),

  requestAuthorisationError: (error) => ({
    type: ActionType.AUTHORISATION_REQUEST_ERROR,
    payload: error,
  }),

  authorisationLogout: () => ({type: ActionType.AUTHORISATION_LOGOUT}),

  clearUserData: () => ({type: ActionType.AUTHORISATION_CLEAR_USER_DATA}),
};

export {ActionType, ActionCreator};
