import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {compose} from 'recompose';
import App from './app';
import store from './reducers/store';
import {ActionCreator as UserActionCreator} from './reducers/user/actions';

const init = () => {
  store.dispatch(UserActionCreator.requestAuthorisation());
  ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
