import React from 'react';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';
import { withRouter } from 'react-router';

import Profile from '../Profile.jsx';
import MySessions from '../MySessions.jsx';

const ProfilePage = (props) => {
  return (
    <div>
      <Profile history={props.history} />
      <MySessions />
    </div>
  )
}

ProfilePage.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(ProfilePage);
