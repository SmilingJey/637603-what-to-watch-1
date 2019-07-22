enum ActionType {
  SET_SELECTED_GENRE = 'SET_SELECTED_GENRE',
}

const ActionCreator = {
  setSelectedGenre: (genre) => ({
    type: ActionType.SET_SELECTED_GENRE,
    payload: genre
  })
};

export {
  ActionType,
  ActionCreator,
};
