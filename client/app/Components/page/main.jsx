import React from 'react';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';
import { withRouter } from 'react-router';
import Main from '../Main.jsx';

const MainPage = (props) => {
  // props.thunkAddComment('123', '456', '789', 'title', 'this is text');
  return (
    <div>
      <Main />
    </div>
  )
}

MainPage.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(MainPage);
