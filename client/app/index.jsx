import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './store'
import { authenticate } from './axiosCalls'

// import Main from './Components/Main';

import {
  LOGIN_PAGE_ROUTE,
  MAIN_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  SESSIONS_PAGE_ROUTE,
  LOGOUT_PAGE_ROUTE,
  AUTH_PAGE_ROUTE
} from './routes';

import LoginPage from './Components/page/login.jsx';
import MainPage from './Components/page/main.jsx';
import ProfilePage from './Components/page/profile.jsx';

window.store = store;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    authenticate().then((status) => {
      this.setState({
        isLoggedIn: status === 200 ? true : false
      })
    })
  }

  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path={ LOGIN_PAGE_ROUTE } render={() => <LoginPage />} />
            <Route exact path={ AUTH_PAGE_ROUTE }  render={() => {
              return this.state.isLoggedIn ? <MainPage /> : <a href='/login'>If page does not refresh, click here</a>
            }} />
            <Route exact path={ MAIN_PAGE_ROUTE }  render={() => {
              return this.state.isLoggedIn ? <MainPage /> : <a href='/login'>If page does not refresh, click here</a>
            }} />
            <Route exact path={ PROFILE_PAGE_ROUTE } render={ () => {
              return this.state.isLoggedIn ? <ProfilePage /> : <a href='/login'>If page does not refresh, click here</a>
            }} />
            <Route exact path={ LOGOUT_PAGE_ROUTE } render={() => <LoginPage />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

render(<App/>, document.getElementById('app'));

//add react router here
