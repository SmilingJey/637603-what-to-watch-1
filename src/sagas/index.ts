import {all} from 'redux-saga/effects';

import {watchLoadMovies, watchLoadPromo} from './movies/movies';
import {watchAuthorisationSubmit, watchAuthorisationRequst, watchAuthorisationLogout} from './user/user';
import {watchLoadComments} from './comments/comments';
import {watchPostComment} from './post-comment/post-comment';
import {watchLoadFavorites, watchChangeFavorites} from './favorites/favorites';

function* rootSaga() {
  yield all([
    watchLoadPromo(),
    watchLoadMovies(),
    watchAuthorisationSubmit(),
    watchAuthorisationRequst(),
    watchAuthorisationLogout(),
    watchLoadComments(),
    watchPostComment(),
    watchLoadFavorites(),
    watchChangeFavorites(),
  ]);
}

export default rootSaga;
