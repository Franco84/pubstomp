import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import {Route, BrowserRouter, History} from 'react-router-dom'

import Navigation from './components/nav'
import App from './components/App';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Navigation />
        <Route path="/" component={App} />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#container'));
