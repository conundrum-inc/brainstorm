import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'

// import Main from './Components/Main';

import {
  LOGIN_PAGE_ROUTE,
  MAIN_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  SESSIONS_PAGE_ROUTE
} from './routes';

import LoginPage from './Components/page/login.jsx';
import MainPage from './Components/page/main.jsx';
import ProfilePage from './Components/page/profile.jsx';

window.store = store;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path={ LOGIN_PAGE_ROUTE } render={() => <LoginPage />} />
            <Route exact path={ MAIN_PAGE_ROUTE } render={() => <MainPage />} />
            <Route exact path={ PROFILE_PAGE_ROUTE } render={() => <ProfilePage />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

render(<App/>, document.getElementById('app'));

//add react router here
