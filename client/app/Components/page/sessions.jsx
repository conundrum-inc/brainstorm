import React from 'react';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';
import { withRouter } from 'react-router';

import MySessions from '../MySessions.jsx';

const SessionsPage = (props) => {
  return (
    <div>
      <MySessions history={props.history} />
    </div>
  )
}

SessionsPage.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(SessionsPage);