import React from 'react';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';
import { withRouter } from 'react-router';

import Login from '../Login.jsx';

const LoginPage = (props) => {
  return (
    <div>
      <Login history={props.history} />
    </div>
  )
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(LoginPage);
