import * as React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {history} from './helpers/history';

import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import MainPage from './pages/main-page/main-page';
import SignInPage from './pages/sign-in-page/sign-in-page';
import MoviePage from './pages/movie-page/movie-page';
import AddCommentPage from './pages/add-comment-page/add-comment-page';
import MyListPage from './pages/my-list-page/my-list-page';

const App = () => {

  return <Router history={history}>
    <ScrollToTop>
      <Switch>
        <Route path="/" exact component={MainPage}/>
        <Route path="/login" component={SignInPage}/>
        <Route path="/film/:id/review" component={AddCommentPage} />
        <Route path="/film/:id" component={MoviePage} />
        <Route path="/mylist" component={MyListPage} />
      </Switch>
    </ScrollToTop>
  </Router>;
};

export default App;
