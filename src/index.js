import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import {Route, Router, Switch} from 'react-router-dom'
import Navigation from './components/Navigation'
import App from './components/App';
import Signup from './components/Signup'
import Profile from './components/Profile'
import reducers from './reducers';
import history from './components/History'


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={history} >
      <div>
        <Navigation history={history} />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.querySelector('#container'));
