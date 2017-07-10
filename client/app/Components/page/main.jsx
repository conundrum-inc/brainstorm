import React from 'react';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';
import { withRouter } from 'react-router';

import Main from '../Main.jsx';

const MainPage = (props) => {
  return (
    <div>
      <Main history={props.history} />
    </div>
  )
}

MainPage.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(MainPage);
