import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Route, Switch, Router, Redirect} from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import history from './components/History'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Navigation from './components/Navigation'
import App from './components/App';
import Signup from './components/Signup'
import Profile from './components/Profile'
import reducers from './reducers';
import RequireAuth from './components/auth/require_auth';
import { AUTH_USER } from './actions/types';

injectTapEventPlugin();
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history} >
        <div>
          <Navigation history={history} />
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={RequireAuth(Profile)} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('#container'));
