import {ActionType} from './actions';

const initialState = {
  selectedGenre: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SELECTED_GENRE:
      return {
        ...state,
        selectedGenre: action.payload
      };
  }

  return state;
};

export {reducer};
