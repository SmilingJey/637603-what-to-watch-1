import NameSpace from '../name-spaces';

export const getSending = (state, movieId): boolean => {
  return state[NameSpace.POST_COMMENT][movieId] &&
    state[NameSpace.POST_COMMENT][movieId].sending;
};

export const getSendingSuccess = (state, movieId): boolean => {
  return  state[NameSpace.POST_COMMENT][movieId] &&
    state[NameSpace.POST_COMMENT][movieId].success;
};

export const getSendingError = (state, movieId): boolean => {
  return  state[NameSpace.POST_COMMENT][movieId] &&
    state[NameSpace.POST_COMMENT][movieId].error;
};
