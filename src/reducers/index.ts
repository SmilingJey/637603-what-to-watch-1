import {combineReducers} from 'redux';
import {reducer as moviesReducer} from './movies/reducer';
import {reducer as selectedGenreReducer} from './selected-genre/reducer';
import {reducer as userReducer} from './user/reducer';
import {reducer as commentsReducer} from './comments/reducer';
import {reducer as postCommentsReducer} from './post-comment/reducer';
import {reducer as favoritesReducer} from './favorites/reducer';
import NameSpace from './name-spaces';

export default combineReducers({
  [NameSpace.MOVIES]: moviesReducer,
  [NameSpace.SELECTED_GENRE]: selectedGenreReducer,
  [NameSpace.USER]: userReducer,
  [NameSpace.COMMENTS]: commentsReducer,
  [NameSpace.POST_COMMENT]: postCommentsReducer,
  [NameSpace.FAVORITES]: favoritesReducer,
});
