import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Navigation from './components/Navigation'
import App from './components/App';
import Signup from './components/Signup'
import reducers from './reducers';
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter history={history} >
      <div>
        <Navigation history={history} />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#container'));
